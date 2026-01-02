# Nastavení formuláře

## Environment proměnné

Nastavte tyto proměnné na serveru (např. Railway/Heroku Config Vars):

```bash
# Povinné
SLACK_WEBHOOK_URL=<váš-slack-webhook-url>
THANK_YOU_URL=https://skolniweby.cz/podekovani
RECAPTCHA_SECRET_KEY=6Lc6Wz4sAAAAAFWmCBmzP-op4ujnaSuL7-ZBZbvS

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

1. **Secret Key** je již nastaven v environment proměnných: `RECAPTCHA_SECRET_KEY=6Lc6Wz4sAAAAAFWmCBmzP-op4ujnaSuL7-ZBZbvS`
2. **Site Key** pro frontend: `6Lc6Wz4sAAAAAKBGcYL-AIK-WKSJz1JzpED9QXH0`
3. **Site Key** použít na frontendu při implementaci reCAPTCHA

### Implementace na frontendu

Pro reCAPTCHA v3:

```html
<script src="https://www.google.com/recaptcha/api.js?render=6Lc6Wz4sAAAAAKBGcYL-AIK-WKSJz1JzpED9QXH0" async defer></script>

<form id="contactForm" action="https://your-backend-url/api/contact" method="POST">
  <!-- Formulářová pole -->
  <input type="hidden" id="recaptcha_token" name="recaptcha_token">
  <button type="submit">Odeslat</button>
</form>

<script>
  const SITE_KEY = '6Lc6Wz4sAAAAAKBGcYL-AIK-WKSJz1JzpED9QXH0';
  
  document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    grecaptcha.ready(function() {
      grecaptcha.execute(SITE_KEY, {action: 'submit'}).then(function(token) {
        document.getElementById('recaptcha_token').value = token;
        document.getElementById('contactForm').submit();
      });
    });
  });
</script>
```

Backend podporuje tokeny v polích: `g-recaptcha-response`, `recaptcha_token`, nebo `recaptchaToken`.

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
