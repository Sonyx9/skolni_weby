import os
import smtplib
import ssl
from email.message import EmailMessage
from typing import Dict

import requests
from flask import Flask, jsonify, redirect, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["https://skolniweby.cz", "https://www.skolniweby.cz"]}})


class Config:
    smtp_host = os.environ.get("SMTP_HOST", "")
    smtp_port = int(os.environ.get("SMTP_PORT", "587"))
    smtp_user = os.environ.get("SMTP_USER", "")
    smtp_pass = os.environ.get("SMTP_PASS", "")
    smtp_from = os.environ.get("SMTP_FROM", "")
    smtp_to = os.environ.get("SMTP_TO", "info@broken-mouse.cz")
    smtp_cc = os.environ.get("SMTP_CC", "wp-weby@broken-mouse.cz")
    slack_webhook = os.environ.get("SLACK_WEBHOOK_URL", "")
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


def validate_form(form: Dict[str, str]) -> Dict[str, str]:
    required = ["name", "email", "phone"]
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
        data = validate_form(request.form)
        payload = build_message(data)
        send_slack(payload)
    except ValueError as exc:
        return jsonify({"status": "error", "message": str(exc)}), 400
    except Exception as exc:  # noqa: BLE001
        app.logger.exception("Contact processing failed")
        return jsonify({"status": "error", "message": "Server error"}), 500

    # Redirect for classic form POST; clients using fetch/XHR will receive 303 + location
    return redirect(Config.thank_you_url, code=303)


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    app.run(host="0.0.0.0", port=port)
