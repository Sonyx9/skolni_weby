# Nastavení formuláře

## Environment proměnné

Nastavte tyto proměnné na serveru (např. Railway/Heroku Config Vars):

```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=vas-email@gmail.com
SMTP_PASS=heslo-nebo-app-password
SMTP_FROM=vas-email@gmail.com
SMTP_TO=info@broken-mouse.cz
SMTP_CC=wp-weby@broken-mouse.cz
SLACK_WEBHOOK_URL=<váš-slack-webhook-url>
THANK_YOU_URL=https://skolniweby.cz/podekovani
```

## Povinná pole formuláře

- **Jméno a příjmení** - required
- **Email** - required  
- **Telefon** - required

## Nepovinná pole

- Název školy
- Zpráva

## Formát notifikace

Email na `info@broken-mouse.cz` s kopií na `wp-weby@broken-mouse.cz` a Slack zpráva:

```
Nový formulář ze stránky Školní weby

Jméno školy: [název]
Kontaktní osoba: [jméno]
Email: [email]
Telefon: [telefon]
Zpráva: [text zprávy]
```
