# Nastavení formuláře

## Environment proměnné

Nastavte tyto proměnné na serveru (např. Railway/Heroku Config Vars):

```bash
# Povinné
SLACK_WEBHOOK_URL=<váš-slack-webhook-url>
THANK_YOU_URL=https://skolniweby.cz/podekovani
RECAPTCHA_PROJECT_ID=<váš-google-cloud-project-id>
RECAPTCHA_SITE_KEY=<váš-recaptcha-site-key>

# Nepovinné
RECAPTCHA_ACTION=submit  # Default action pro reCAPTCHA (default: submit)

# Nepovinné (email notifikace vypnuty)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=vas-email@gmail.com
# SMTP_PASS=heslo-nebo-app-password
# SMTP_FROM=vas-email@gmail.com
# SMTP_TO=info@broken-mouse.cz
# SMTP_CC=wp-weby@broken-mouse.cz
```

## Povinná pole formuláře

- **Jméno a příjmení** - required
- **Email** - required  
- **Telefon** - required
- **Zpráva** - required

## Nepovinná pole

- Název školy

## reCAPTCHA Enterprise

Formulář je chráněn pomocí Google reCAPTCHA Enterprise v3 (neviditelná verze) pomocí oficiální Google Cloud API. Pro správné fungování je potřeba:

1. Vytvořit Google Cloud Project a povolit reCAPTCHA Enterprise API
2. Zaregistrovat se na [Google reCAPTCHA Enterprise](https://cloud.google.com/recaptcha-enterprise)
3. Vytvořit nový web a zvolit reCAPTCHA Enterprise v3
4. Přidat domény, na kterých bude formulář fungovat
5. Nastavit `RECAPTCHA_PROJECT_ID` (ID vašeho Google Cloud projektu)
6. Nastavit `RECAPTCHA_SITE_KEY` (Site Key z reCAPTCHA konzole)
7. **Site Key** použít na frontendu při implementaci reCAPTCHA
8. Nastavit Google Cloud credentials (service account key) jako environment proměnnou `GOOGLE_APPLICATION_CREDENTIALS` nebo použít default credentials

### Implementace na frontendu

Pro reCAPTCHA Enterprise v3:

```html
<script src="https://www.google.com/recaptcha/enterprise.js?render=YOUR_SITE_KEY" async defer></script>

<form id="contactForm" action="https://your-backend-url/api/contact" method="POST">
  <!-- Formulářová pole -->
  <input type="hidden" id="recaptcha_token" name="recaptcha_token">
  <button type="submit">Odeslat</button>
</form>

<script>
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    grecaptcha.enterprise.ready(function() {
      grecaptcha.enterprise.execute('YOUR_SITE_KEY', {action: 'submit'}).then(function(token) {
        document.getElementById('recaptcha_token').value = token;
        document.getElementById('contactForm').submit();
      });
    });
  });
</script>
```

Backend podporuje tokeny v polích: `g-recaptcha-response`, `recaptcha_token`, nebo `recaptchaToken`.

**Poznámka:** Pokud `RECAPTCHA_PROJECT_ID` nebo `RECAPTCHA_SITE_KEY` nejsou nastaveny, validace se přeskočí (užitečné pro vývoj).

**Google Cloud Credentials:** Backend potřebuje přístup k Google Cloud API. Nastavte buď:
- `GOOGLE_APPLICATION_CREDENTIALS` s cestou k service account JSON souboru, nebo
- Použijte default credentials (např. na Google Cloud Run, App Engine, nebo s `gcloud auth application-default login`)

## Formát notifikace

Slack zpráva:

```
Nový formulář ze stránky Školní weby

Jméno školy: [název]
Kontaktní osoba: [jméno]
Email: [email]
Telefon: [telefon]
Zpráva: [text zprávy]
```
