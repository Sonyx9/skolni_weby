export interface Reference {
  id: string;
  title: string;
  type: 'ms' | 'zs' | 'ss' | 'zus';
  city: string;
  image: string;
  url?: string;
  description?: string;
}

export interface PricingTier {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  priceNote?: string;
  features: string[];
  recommended?: boolean;
  cta: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

// Helper pro správné cesty s base path
const getImagePath = (path: string) => {
  const base = import.meta.env.BASE_URL;
  return path.startsWith('/') ? `${base}${path.slice(1)}` : `${base}${path}`;
};

export const references: Reference[] = [
  {
    id: 'spstjbc',
    title: 'Střední průmyslová škola technická',
    type: 'ss',
    city: 'Jablonec nad Nisou',
    image: 'https://www.broken-mouse.cz/wp-content/uploads/2025/12/screencapture-spstjbc-cz-2025-12-29-09_40_53-scaled.webp',
    url: 'https://spstjbc.cz/',
  },
  {
    id: 'gymjbc',
    title: 'Gymnázium U Balvanu',
    type: 'ss',
    city: 'Jablonec nad Nisou',
    image: 'https://www.broken-mouse.cz/wp-content/uploads/2025/12/screencapture-gymjbc-cz-2025-12-29-09_40_21-scaled.webp',
    url: 'https://www.gymjbc.cz/',
  },
  {
    id: 'zssumava',
    title: 'ZŠ Šumava',
    type: 'zs',
    city: 'Jablonec nad Nisou',
    image: 'https://www.broken-mouse.cz/wp-content/uploads/2025/12/screencapture-zssumava-cz-2025-12-29-09_41_16-scaled.webp',
    url: 'https://www.zssumava.cz/',
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: 'start',
    name: 'Start',
    subtitle: 'Ideální pro MŠ',
    price: 'od 45 000 Kč',
    features: [
      'Moderní responzivní design',
      'Až 10 sekcí',
      'Galerie a aktuality',
      'Kontaktní formulář',
      'Základní SEO optimalizace',
      'Školení správce (2h)',
      'Přenos obsahu z původního webu',
      '1 rok podpory',
    ],
    cta: 'Chci nabídku',
  },
  {
    id: 'standard',
    name: 'Standard',
    subtitle: 'Ideální pro ZŠ',
    price: 'od 75 000 Kč',
    recommended: true,
    features: [
      'Vše z balíčku Start',
      'Až 20 sekcí',
      'Rozšířená galerie',
      'Kalendář akcí',
      'Jídelníček integrace',
      'Vyhledávání',
      'Rozšířené SEO',
      'Školení správce (4h)',
      '2 roky podpory',
    ],
    cta: 'Chci nabídku',
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'Ideální pro SŠ a větší školy',
    price: 'od 120 000 Kč',
    features: [
      'Vše z balíčku Standard',
      'Neomezené sekce',
      'E-learning integrace',
      'Portál pro rodiče',
      'Rozšířené formuláře',
      'API integrace',
      'Pokročilé SEO',
      'Školení správce (8h)',
      '3 roky podpory',
      'Prioritní servis',
    ],
    cta: 'Chci nabídku',
  },
];

export const faq: FAQ[] = [
  {
    question: 'Kolik to trvá?',
    answer: 'Celý proces od prvního kontaktu po spuštění webu trvá obvykle 3–6 týdnů, v závislosti na složitosti projektu a rychlosti dodání obsahu ze strany školy.',
  },
  {
    question: 'Umíte převést starý web?',
    answer: 'Ano, součástí našich služeb je přenos obsahu z původního webu. Pomůžeme vám s migrací textů, obrázků a dokumentů do nového systému.',
  },
  {
    question: 'Kdo bude web spravovat?',
    answer: 'Web je navržen tak, aby ho mohl spravovat kdokoliv ze školy bez technických znalostí. Provedeme vás školením a poskytneme podporu při správě obsahu.',
  },
  {
    question: 'Jak řešíte přístupnost?',
    answer: 'Všechny naše weby splňují standardy WCAG 2.1 úrovně AA. Zajišťujeme správnou strukturu, kontrast barev, klávesnicovou navigaci a kompatibilitu se čtečkami obrazovek.',
  },
  {
    question: 'Co servis?',
    answer: 'Každý balíček obsahuje servis a podporu na 1–3 roky. Pomůžeme s aktualizacemi, řešením problémů a poskytneme technickou podporu. Měsíční servisní balíčky jsou k dispozici po skončení záruční doby.',
  },
  {
    question: 'Jak probíhá spolupráce?',
    answer: 'Začínáme úvodním hovorem, kde zjistíme vaše potřeby. Následně připravíme návrh struktury, po schválení vytvoříme design. Po naplnění obsahem web spustíme a proškolíme správce.',
  },
  {
    question: 'Co od nás potřebujete?',
    answer: 'Potřebujeme přístupy k současnému webu (pokud existuje), obsahové materiály (texty, obrázky, dokumenty) a kontakt na osobu, která bude web spravovat. Zbytek zařídíme my.',
  },
  {
    question: 'Můžeme si vybrat design?',
    answer: 'Ano, připravíme návrh designu na základě vašich preferencí a požadavků. Design je vždy přizpůsoben identitě školy a jejím potřebám.',
  },
];

export const processSteps = [
  { title: 'Krátký call', description: 'Zjištění potřeb a požadavků školy' },
  { title: 'Návrh struktury', description: 'Příprava struktury webu a sekcí' },
  { title: 'Design', description: 'Vytvoření moderního designu' },
  { title: 'Naplnění', description: 'Přenos a úprava obsahu' },
  { title: 'Spuštění', description: 'Finální testy a spuštění webu' },
  { title: 'Servis', description: 'Školení a dlouhodobá podpora' },
];

