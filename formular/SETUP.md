# Nastavení formuláře

## Environment proměnné

Nastavte tyto proměnné na serveru (např. Railway/Heroku Config Vars):

```bash
# Povinné
SLACK_WEBHOOK_URL=<váš-slack-webhook-url>
THANK_YOU_URL=https://skolniweby.cz/podekovani
RECAPTCHA_SECRET_KEY=<váš-recaptcha-secret-key>

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

## reCAPTCHA

Formulář je chráněn pomocí Google reCAPTCHA v3 (neviditelná verze). Pro správné fungování je potřeba:

1. Zaregistrovat se na [Google reCAPTCHA](https://www.google.com/recaptcha/admin)
2. Vytvořit nový web a zvolit reCAPTCHA v3
3. Přidat domény, na kterých bude formulář fungovat
4. Zkopírovat **Secret Key** a nastavit jako `RECAPTCHA_SECRET_KEY` v environment proměnných
5. **Site Key** použít na frontendu při implementaci reCAPTCHA

**Poznámka:** Pokud `RECAPTCHA_SECRET_KEY` není nastaven, validace se přeskočí (užitečné pro vývoj).

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
