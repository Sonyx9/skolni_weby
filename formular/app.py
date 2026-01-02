import os
import smtplib
import ssl
from email.message import EmailMessage
from typing import Dict

import requests
from flask import Flask, jsonify, redirect, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


class Config:
    smtp_host = os.environ.get("SMTP_HOST", "")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASS", "")
    smtp_from = os.environ.get("SMTP_FROM", "")
    smtp_to = os.environ.get("SMTP_TO", "info@broken-mouse.cz")
    smtp_cc = os.environ.get("SMTP_CC", "wp-weby@broken-mouse.cz")
    slack_webhook = os.environ.get("SLACK_WEBHOOK_URL", "")
    recaptcha_secret_key = os.environ.get("RECAPTCHA_SECRET_KEY", "6Lc6Wz4sAAAAAFWmCBmzP-op4ujnaSuL7-ZBZbvS")
    thank_you_url = os.environ.get(
        "THANK_YOU_URL",
        "https://skolniweby.cz/podekovani",
    )


def build_message(data: Dict[str, str]) -> str:
    lines = [
        "Nový formulář ze stránky Školní weby",
        "",
        f"Jméno školy: {data.get('school', '')}",
        f"Kontaktní osoba: {data.get('name', '')}",
        f"Email: {data.get('email', '')}",
        f"Telefon: {data.get('phone', '')}",
        f"Zpráva: {data.get('message', '')}",
    ]
    return "\n".join(lines)


def send_email(payload: str) -> None:
    if not (Config.smtp_host and Config.smtp_user and Config.smtp_pass and Config.smtp_from and Config.smtp_to):
        app.logger.warning("SMTP not configured; skipping email send")
        return

    msg = EmailMessage()
    msg["Subject"] = "ŠkolníWeby – nový kontakt"
    msg["From"] = Config.smtp_from
    msg["To"] = Config.smtp_to
    if Config.smtp_cc:
        msg["Cc"] = Config.smtp_cc
    msg.set_content(payload)

    context = ssl.create_default_context()
    with smtplib.SMTP(Config.smtp_host, Config.smtp_port) as server:
        server.starttls(context=context)
        server.login(Config.smtp_user, Config.smtp_pass)
        server.send_message(msg)


def send_slack(payload: str) -> None:
    if not Config.slack_webhook:
        app.logger.warning("Slack webhook not set; skipping Slack send")
        return

    resp = requests.post(
        Config.slack_webhook,
        json={"text": payload},
        timeout=10,
    )
    resp.raise_for_status()


def verify_recaptcha(token: str, remote_ip: str | None = None) -> bool:
    """Ověří reCAPTCHA token pomocí Google REST API (podporuje v2, v3 i Enterprise)."""
    if not Config.recaptcha_secret_key:
        app.logger.warning("reCAPTCHA secret not configured; skipping verification")
        return True  # Pokud není nastaveno, povolíme odeslání (pro vývoj)

    if not token:
        return False

    try:
        data = {
            "secret": Config.recaptcha_secret_key,
            "response": token,
        }
        if remote_ip:
            data["remoteip"] = remote_ip

        # Endpoint funguje pro standardní i Enterprise verzi
        resp = requests.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data=data,
            timeout=10,
        )
        resp.raise_for_status()
        result = resp.json()

        # reCAPTCHA v3/Enterprise vrací score (0.0-1.0), v2 vrací success (bool)
        if "score" in result:
            # v3/Enterprise: score >= 0.5 je obvykle považováno za legitimní
            return result.get("success", False) and result.get("score", 0) >= 0.5
        else:
            # v2: pouze success
            return result.get("success", False)
    except Exception as exc:
        app.logger.exception(f"reCAPTCHA verification failed: {exc}")
        return False


def validate_form(form: Dict[str, str]) -> Dict[str, str]:
    required = ["name", "email", "phone", "message"]
    for field in required:
        if not form.get(field):
            raise ValueError(f"Missing field: {field}")

    return {
        "name": form.get("name", "").strip(),
        "email": form.get("email", "").strip(),
        "phone": form.get("phone", "").strip(),
        "school": form.get("school", "").strip(),
        "message": form.get("message", "").strip(),
    }


@app.get("/health")
def health() -> str:
    return "ok"


@app.post("/api/contact")
def contact():
    try:
        # Podpora pro JSON i form-data
        if request.is_json:
            form_data = request.json or {}
        else:
            form_data = request.form

        # Ověření reCAPTCHA tokenu (podporuje různé názvy polí)
        recaptcha_token = (
            form_data.get("g-recaptcha-response")
            or form_data.get("recaptcha_token")
            or form_data.get("recaptchaToken")
        )
        remote_ip = request.environ.get("REMOTE_ADDR")
        
        if not verify_recaptcha(recaptcha_token, remote_ip):
            return jsonify({"status": "error", "message": "reCAPTCHA verification failed"}), 400

        data = validate_form(form_data)
        payload = build_message(data)
        send_slack(payload)
        
        return jsonify({"status": "success", "message": "Formulář byl úspěšně odeslán", "redirect": Config.thank_you_url}), 200
    except ValueError as exc:
        return jsonify({"status": "error", "message": str(exc)}), 400
    except Exception as exc:  # noqa: BLE001
        app.logger.exception("Contact processing failed")
        return jsonify({"status": "error", "message": "Server error"}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
