import os
import smtplib
import ssl
from email.message import EmailMessage
from typing import Dict

import requests
from flask import Flask, jsonify, redirect, request
from flask_cors import CORS
from google.cloud import recaptchaenterprise_v1
from google.cloud.recaptchaenterprise_v1 import Assessment

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
    recaptcha_project_id = os.environ.get("RECAPTCHA_PROJECT_ID", "")
    recaptcha_site_key = os.environ.get("RECAPTCHA_SITE_KEY", "")
    recaptcha_action = os.environ.get("RECAPTCHA_ACTION", "submit")
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


def verify_recaptcha(token: str, action: str | None = None) -> bool:
    """Ověří reCAPTCHA Enterprise token pomocí Google Cloud API."""
    if not Config.recaptcha_project_id or not Config.recaptcha_site_key:
        app.logger.warning("reCAPTCHA not configured; skipping verification")
        return True  # Pokud není nastaveno, povolíme odeslání (pro vývoj)

    if not token:
        return False

    try:
        # Použijeme action z parametru nebo z konfigurace
        recaptcha_action = action or Config.recaptcha_action

        # Vytvoření klienta
        client = recaptchaenterprise_v1.RecaptchaEnterpriseServiceClient()

        # Nastavení vlastností eventu
        event = recaptchaenterprise_v1.Event()
        event.site_key = Config.recaptcha_site_key
        event.token = token

        # Vytvoření assessmentu
        assessment = recaptchaenterprise_v1.Assessment()
        assessment.event = event

        project_name = f"projects/{Config.recaptcha_project_id}"

        # Sestavení requestu
        request_obj = recaptchaenterprise_v1.CreateAssessmentRequest()
        request_obj.assessment = assessment
        request_obj.parent = project_name

        # Zavolání API
        response = client.create_assessment(request_obj)

        # Kontrola validity tokenu
        if not response.token_properties.valid:
            app.logger.warning(
                f"reCAPTCHA token invalid: {response.token_properties.invalid_reason}"
            )
            return False

        # Kontrola očekávané akce
        if response.token_properties.action != recaptcha_action:
            app.logger.warning(
                f"reCAPTCHA action mismatch: expected {recaptcha_action}, "
                f"got {response.token_properties.action}"
            )
            return False

        # Získání risk score (0.0 = bot, 1.0 = legit)
        score = response.risk_analysis.score
        app.logger.info(f"reCAPTCHA score: {score}")

        # Score >= 0.5 je obvykle považováno za legitimní
        return score >= 0.5

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
        recaptcha_action = form_data.get("recaptcha_action") or Config.recaptcha_action
        
        if not verify_recaptcha(recaptcha_token, recaptcha_action):
            return jsonify({"status": "error", "message": "reCAPTCHA verification failed"}), 400

        data = validate_form(form_data)
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
