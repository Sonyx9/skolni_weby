# ŠkolníWeby - Multi-page web pro službu tvorby školních webů

Moderní, rychlý a SEO-friendly web vytvořený s Astro a Tailwind CSS.

## 🚀 Rychlý start

### Předpoklady

- Node.js 18+ 
- npm nebo yarn

### Instalace

```bash
# Instalace závislostí
npm install

# Spuštění vývojového serveru
npm run dev

# Build pro produkci
npm run build

# Preview produkční build
npm run preview
```

## 📁 Struktura projektu

```
/
├── public/                 # Statické soubory (robots.txt, favicon, obrázky)
│   ├── images/            # Obrázky (placeholder obrázky)
│   ├── robots.txt
│   └── favicon.svg
├── src/
│   ├── components/        # Astro komponenty
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── Card.astro
│   │   ├── PricingCard.astro
│   │   ├── FAQAccordion.astro
│   │   ├── ReferenceCard.astro
│   │   ├── CTABanner.astro
│   │   ├── FAQSchema.astro
│   │   └── ServiceSchema.astro
│   ├── data/              # Data soubory
│   │   └── content.ts     # FAQ, pricing, references
│   ├── layouts/           # Layout komponenty
│   │   └── BaseLayout.astro
│   ├── pages/             # Stránky (routing)
│   │   ├── index.astro    # Homepage
│   │   ├── ukazky.astro   # Ukázky/reference
│   │   ├── cenik.astro    # Ceník
│   │   ├── jak-to-probiha.astro  # Proces + FAQ
│   │   └── kontakt.astro  # Kontakt
│   └── styles/
│       └── global.css     # Globální styly
├── astro.config.mjs       # Astro konfigurace
├── tailwind.config.mjs    # Tailwind konfigurace
└── package.json
```

## 📝 Úprava obsahu

### FAQ (Často kladené otázky)

Upravte v `src/data/content.ts` v poli `faq`:

```typescript
export const faq: FAQ[] = [
  {
    question: 'Vaše otázka?',
    answer: 'Vaše odpověď...',
  },
  // ...
];
```

### Ceník (Pricing)

Upravte v `src/data/content.ts` v poli `pricingTiers`:

```typescript
export const pricingTiers: PricingTier[] = [
  {
    id: 'start',
    name: 'Start',
    subtitle: 'Ideální pro MŠ',
    price: 'od 45 000 Kč',
    features: [
      'Feature 1',
      'Feature 2',
      // ...
    ],
    cta: 'Chci nabídku',
  },
  // ...
];
```

### Reference/Ukázky

Upravte v `src/data/content.ts` v poli `references`:

```typescript
export const references: Reference[] = [
  {
    id: '1',
    title: 'Název školy',
    type: 'ms', // 'ms' | 'zs' | 'ss' | 'zus'
    city: 'Město',
    image: '/images/placeholder-ref-01.webp',
  },
  // ...
];
```

### Proces (Process Steps)

Upravte v `src/data/content.ts` v poli `processSteps`:

```typescript
export const processSteps = [
  { title: 'Krok 1', description: 'Popis...' },
  // ...
];
```

## 🎨 Design systém

### Barvy

- Primary: `#2563eb` (modrá)
- Gray scale: standardní Tailwind gray
- Barvy jsou definované v `tailwind.config.mjs`

### Typografie

- Font: Inter (Google Fonts)
- H1: 44-56px (desktop)
- Max šířka textu: ~680-760px

### Komponenty

Všechny komponenty jsou v `src/components/` a používají Tailwind CSS utility třídy.

## 🔍 SEO

### Metadata

Každá stránka má:
- Unikátní `<title>` a meta description
- OG tags (Open Graph)
- Twitter cards
- Canonical URL

### Structured Data (Schema.org)

- Organization schema (globální v BaseLayout)
- Service schema (homepage)
- FAQPage schema (stránky s FAQ)

### Sitemap a Robots

- `sitemap.xml` se generuje automaticky pomocí `@astrojs/sitemap`
- `robots.txt` je v `public/robots.txt`

## 🖼️ Obrázky

Placeholder obrázky by měly být v `public/images/`:

- `placeholder-hero.webp` - Hero obrázek na homepage
- `placeholder-ref-01.webp` až `placeholder-ref-12.webp` - Reference obrázky
- `og-image.webp` - OG image pro sociální sítě

**Poznámka:** Obrázky nejsou součástí repozitáře - je třeba je přidat ručně.

## 🚀 Deployment

### Cloudflare Pages

1. Připojte GitHub repozitář
2. Build command: `npm run build`
3. Output directory: `dist`
4. Node version: 18 nebo vyšší

### Vercel

1. Připojte GitHub repozitář
2. Framework preset: Astro
3. Build command: `npm run build`
4. Output directory: `dist`

### GitHub Pages

1. Nastavte `site` v `astro.config.mjs` na vaši GitHub Pages URL
2. Build command: `npm run build`
3. Deploy `dist` složku pomocí GitHub Actions

## 📊 Performance

Projekt je optimalizovaný pro Core Web Vitals:

- Statické HTML (SSG)
- Minimal JavaScript
- Lazy loading obrázků
- Optimalizované fonty (preconnect)
- WebP/AVIF formáty (doporučeno)

## 🎭 Animace

Animace jsou implementované pomocí:
- CSS transitions
- IntersectionObserver pro scroll reveal
- Respektují `prefers-reduced-motion`

## 📱 Responzivita

- Mobile-first přístup
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Hamburger menu na mobilu

## 🔧 Technologie

- **Astro** - SSG framework
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type safety
- **@astrojs/sitemap** - Automatická sitemap

## 📝 Poznámky

- Formulář na `/kontakt` je placeholder - připravený pro budoucí integraci (Formspree/Make webhook)
- Všechny kontaktní údaje jsou placeholder - je třeba je upravit
- OG image URL je třeba upravit v `astro.config.mjs` (site property)

## 📄 Licence

Všechna práva vyhrazena.

