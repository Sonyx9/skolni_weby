# SkolniWeby – Flask contact backend

Processes contact form submissions: accepts POST, sends email, posts a Slack webhook, then redirects to a thank-you page.

## Files
- `app.py` – Flask app with `/` (health) and `/api/contact` (POST)
- `requirements.txt` – dependencies
- `.env.example` – config sample

## Local run
1) `python -m venv .venv && .venv/Scripts/activate` (Windows) or `source .venv/bin/activate`
2) `pip install -r requirements.txt`
3) Copy `.env.example` to `.env` and fill SMTP + Slack webhook.
4) `python app.py` then open `http://localhost:8000`.

## Env vars
- `PORT` – default 8000
- `THANK_YOU_URL` – redirect target on success (e.g. `https://skolniweby.cz/podekovani`)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, `SMTP_TO` – email
- `SLACK_WEBHOOK_URL` – incoming Slack webhook

## Railway deploy
1) Create a Railway project, set **Root Directory** to `formular`.
2) Build command: `pip install -r requirements.txt`
3) Start command: `gunicorn app:app --bind 0.0.0.0:${PORT}`
4) In **Variables**, set the envs above (PORT is provided by Railway).
5) Deploy; Railway will assign a URL, e.g. `https://skolniweby-formular.up.railway.app`.

## Frontend wiring
- In Astro `src/pages/kontakt.astro`, set `<form action="https://…railway.app/api/contact" method="post">` and remove `disabled` + `pointer-events-none`/opacity.
- The backend returns a 303 redirect to `THANK_YOU_URL`, so `/podekovani` shows after submit.
- Add a `/podekovani` page in Astro (simple thank-you + CTA).

## Notes
- If SMTP or Slack are not configured, the backend logs and skips those sends.
- It validates `name`, `email`, `message`; missing fields return 400 JSON.
