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
    description: 'Web střední školy s důrazem na přehlednost, studijní obory a informace pro uchazeče.',
  },
  {
    id: 'gymjbc',
    title: 'Gymnázium U Balvanu',
    type: 'ss',
    city: 'Jablonec nad Nisou',
    image: 'https://www.broken-mouse.cz/wp-content/uploads/2025/12/screencapture-gymjbc-cz-2025-12-29-09_40_21-scaled.webp',
    url: 'https://www.gymjbc.cz/',
    description: 'Reprezentativní školní web s jasnou strukturou pro studenty, rodiče i veřejnost.',
  },
  {
    id: 'zssumava',
    title: 'ZŠ Šumava',
    type: 'zs',
    city: 'Jablonec nad Nisou',
    image: 'https://www.broken-mouse.cz/wp-content/uploads/2025/12/screencapture-zssumava-cz-2025-12-29-09_41_16-scaled.webp',
    url: 'https://www.zssumava.cz/',
    description: 'Přehledný web základní školy zaměřený na každodenní komunikaci s rodiči.',
  },
];

export const pricingTiers: PricingTier[] = [
  {
    id: 'start',
    name: 'Start',
    subtitle: 'Jednoduchý, přehledný a legislativně správný web pro menší školy.',
    price: 'od 38 500 Kč',
    features: [
      'Moderní responzivní design',
      'Až 10 sekcí',
      'Galerie a aktuality',
      'Kontaktní formulář',
      'Základní SEO optimalizace',
      'Školení správce (2h)',
      'Přenos obsahu z původního webu',
      '6 měsíců podpory',
    ],
    cta: 'Chci nabídku',
  },
  {
    id: 'standard',
    name: 'Standard',
    subtitle: 'Ideální řešení pro základní a menší střední školy. Vyviválené řešení pro školy s větším množstvím informací a dokumentů.',
    price: 'od 55 000 Kč',
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
      '12 měsíců podpory',
    ],
    cta: 'Chci nabídku',
  },
  {
    id: 'pro',
    name: 'Pro',
    subtitle: 'Ideální pro větší střední školy a učiliště. Komplexní webové řešení pro školy s vyššími nároky na funkce a provoz.',
    price: 'Individuální',
    features: [
      'Vše z balíčku Standard',
      'Neomezené sekce',
      'E-learning integrace',
      'Portál pro rodiče',
      'Rozšířené formuláře',
      'API integrace',
      'Pokročilé SEO',
      'Školení správce (8h)',
      '12 měsíců podpory',
      'Prioritní servis',
    ],
    cta: 'Chci nabídku',
  },
];

export const faq: FAQ[] = [
  {
    question: 'Jak dlouho trvá vytvoření webových stránek pro školu?',
    answer: 'Přibližně 8 týdnů od prvního kontaktu. U menších škol (např. MŠ) může být web hotový i rychleji, u komplexnějších projektů to může trvat déle – podle rozsahu webu a rychlosti schvalování podkladů.',
  },
  {
    question: 'Umíte převést obsah ze starého webu školy?',
    answer: 'Ano. Postaráme se o kompletní přenos obsahu – stránky, dokumenty, aktuality i fotogalerie. Zároveň obsah projdeme a pomůžeme ho zpřehlednit a aktualizovat.',
  },
  {
    question: 'Kdo bude web školy spravovat po spuštění?',
    answer: 'Web může spravovat vedení školy, sekretariát nebo pověřený učitel. Redakční systém je jednoduchý a součástí dodávky je školení správců. Zároveň zajišťujeme dlouhodobý servis.',
  },
  {
    question: 'Splňuje web zákonné požadavky a přístupnost?',
    answer: 'Ano. Weby navrhujeme tak, aby splňovaly přístupnost dle WCAG 2.1, požadavky na povinně zveřejňované informace školy a základní pravidla GDPR. Pomáháme tak školám být připravené na případnou kontrolu.',
  },
  {
    question: 'Co je součástí servisu a technické podpory?',
    answer: 'Součástí servisu je technická podpora, aktualizace systému, řešení technických problémů a pomoc se správou webu. Rozsah podpory závisí na zvoleném balíčku, vždy je ale jasně daný bez skrytých poplatků.',
  },
  {
    question: 'Kolik stojí webové stránky pro školu?',
    answer: 'Cena se odvíjí od velikosti školy a požadovaných funkcí. Základní web pro školu začíná od 45 000 Kč, větší a komplexnější řešení od 75 000 Kč a výše. Konkrétní cenu vždy stanovíme nezávazně na míru škole.',
  },
  {
    question: 'Musí škola řešit technické věci sama?',
    answer: 'Ne. Technické záležitosti řešíme my – hosting, zabezpečení, aktualizace i provoz. Škola se stará pouze o obsah, a to velmi jednoduše.',
  },
  {
    question: 'Je možné web později rozšířit?',
    answer: 'Ano. Web je navržen tak, aby šel kdykoliv rozšířit – o nové sekce, formuláře, integrace nebo funkce podle potřeb školy.',
  },
];

export const processFaq: FAQ[] = [
  {
    question: 'Jak probíhá tvorba webových stránek pro školu krok za krokem?',
    answer: 'Tvorba webu školy probíhá v několika jasných krocích: úvodní konzultace, návrh struktury, design, naplnění obsahem, spuštění a následný servis. V každé fázi má škola přehled o tom, co se děje a co se bude dít dál.',
  },
  {
    question: 'Kolik času bude škola během procesu muset věnovat spolupráci?',
    answer: 'Časová náročnost pro školu je minimální. Obvykle jde jen o: krátkou úvodní konzultaci, schválení struktury a designu, základní zpětnou vazbu. Většinu práce – techniku, obsah i úpravy – zajišťujeme my.',
  },
  {
    question: 'Co musí škola dodat, aby mohl proces začít?',
    answer: 'Stačí základní součinnost: přístup ke stávajícímu webu (pokud existuje), dostupné texty, dokumenty a logo školy, kontakt na osobu odpovědnou za komunikaci. Pokud některé podklady chybí, pomůžeme s jejich doplněním nebo úpravou.',
  },
  {
    question: 'Musí mít škola předem jasnou představu o vzhledu webu?',
    answer: 'Nemusí. Na základě zkušeností s jinými školami navrhneme vhodnou strukturu i vzhled webu, který pak společně doladíme podle vašich připomínek.',
  },
  {
    question: 'Jak probíhá schvalování jednotlivých kroků?',
    answer: 'Každý důležitý krok – struktura, design i finální verze – schvaluje škola. Bez vašeho odsouhlasení nepokračujeme dál, takže máte web plně pod kontrolou.',
  },
  {
    question: 'Lze web během tvorby upravovat nebo měnit?',
    answer: 'Ano. Během procesu je běžné: upravovat strukturu, zpřesňovat texty, ladit vzhled. Změny řešíme průběžně a vždy srozumitelně vysvětlíme jejich dopad.',
  },
  {
    question: 'Co když se během tvorby změní požadavky školy?',
    answer: 'Počítáme s tím. Menší změny zapracujeme průběžně, větší úpravy vždy dopředu konzultujeme, aby byl jasný vliv na čas a rozsah projektu.',
  },
  {
    question: 'Jak dlouho trvá celý proces od prvního kontaktu po spuštění webu?',
    answer: 'Obvykle 4–8 týdnů, podle rozsahu webu a rychlosti schvalování. U menších škol může být web hotový i dříve.',
  },
  {
    question: 'Co se děje po spuštění webu školy?',
    answer: 'Po spuštění: web společně projdeme, zaškolíme správce, předáme přístupy a dokumentaci. Následně zajišťujeme servis, podporu a technickou správu podle zvoleného balíčku.',
  },
  {
    question: 'Musí mít škola vlastního IT správce?',
    answer: 'Ne. Web je navržen tak, aby ho zvládl spravovat běžný zaměstnanec školy. Technické záležitosti a podpora jsou součástí spolupráce.',
  },
];

export const pricingFaq: FAQ[] = [
  {
    question: 'Kolik stojí webové stránky pro školu?',
    answer: 'Cena webových stránek pro školu se odvíjí od velikosti školy, rozsahu obsahu a požadovaných funkcí. Základní web pro školu začíná od 45 000 Kč, běžné řešení pro základní školy od 75 000 Kč.',
  },
  {
    question: 'Je uvedená cena konečná, nebo se může změnit?',
    answer: 'Uvedené ceny jsou orientační. Finální cenu vždy stanovujeme na základě konkrétních potřeb školy, aby odpovídala rozsahu a nevznikaly zbytečné náklady.',
  },
  {
    question: 'Co je zahrnuto v ceně webu školy?',
    answer: 'V ceně je vždy zahrnuto: návrh struktury a designu webu, technické řešení a spuštění, přenos nebo úprava obsahu, základní školení správců, servis a technická podpora dle balíčku. Rozsah se liší podle zvoleného balíčku, vždy je ale jasně definovaný.',
  },
  {
    question: 'Platí se web jednorázově, nebo formou měsíčních poplatků?',
    answer: 'Tvorba webu se hradí jednorázově. Servis a podpora jsou součástí balíčku na určité období. Po skončení podpory můžeme servis prodloužit bez nutnosti nový web pořizovat.',
  },
  {
    question: 'Jsou v ceně zahrnuty i budoucí úpravy webu?',
    answer: 'Menší úpravy a technická podpora jsou součástí servisu. Rozsáhlejší změny (nové sekce, funkce, integrace) řešíme individuálně a vždy po domluvě.',
  },
  {
    question: 'Je možné přizpůsobit balíček konkrétní škole?',
    answer: 'Ano. Balíčky slouží jako přehledný základ, ale řešení vždy přizpůsobujeme konkrétní škole, jejím potřebám a rozpočtu.',
  },
  {
    question: 'Jak je to s veřejnými zakázkami a rozpočtem školy?',
    answer: 'Máme zkušenosti se spoluprací s příspěvkovými organizacemi a obcemi. Cenovou nabídku připravujeme transparentně a srozumitelně, aby byla použitelná pro schvalovací proces školy nebo zřizovatele.',
  },
  {
    question: 'Je v ceně i přístupnost a splnění zákonných požadavků?',
    answer: 'Ano. Weby navrhujeme tak, aby splňovaly: základní požadavky na přístupnost (WCAG), povinně zveřejňované informace školy, běžné legislativní náležitosti.',
  },
  {
    question: 'Co když si nejsme jistí, který balíček zvolit?',
    answer: 'Rádi vám poradíme. Na základě krátké konzultace doporučíme nejvhodnější řešení podle velikosti školy, obsahu a rozpočtu.',
  },
  {
    question: 'Je možné začít s menším řešením a web později rozšířit?',
    answer: 'Ano. Web je navržen modulárně, takže jej lze kdykoliv rozšířit o další sekce nebo funkce bez nutnosti nový web vytvářet.',
  },
];

export const processSteps = [
  { 
    title: 'Krátký call', 
    description: 'Zjištění potřeb a požadavků školy',
    subtitle: 'Rychlé zjištění potřeb vaší školy',
    details: 'Krátký telefonát nebo online schůzka, kde si ujasníme typ školy (MŠ, ZŠ, SŠ), rozsah webu a specifické požadavky a termíny. Žádné technické detaily, mluvíme lidsky.'
  },
  { 
    title: 'Návrh struktury', 
    description: 'Příprava struktury webu a sekcí',
    subtitle: 'Logické uspořádání obsahu a menu',
    details: 'Navrhneme přehlednou strukturu školního webu tak, aby rodiče rychle našli důležité informace, web splňoval povinné náležitosti školy a byl snadno spravovatelný do budoucna.'
  },
  { 
    title: 'Design', 
    description: 'Vytvoření moderního designu',
    subtitle: 'Moderní vzhled přizpůsobený vaší škole',
    details: 'Vytvoříme vizuální návrh hlavních stránek: responzivní (mobil, tablet, počítač), srozumitelný a reprezentativní, odpovídající charakteru školy.'
  },
  { 
    title: 'Naplnění', 
    description: 'Přenos a úprava obsahu',
    subtitle: 'Texty, dokumenty a obrázky bez starostí',
    details: 'Pomůžeme s přenosem obsahu ze starého webu, úpravou textů a dokumentů a základní optimalizací obsahu pro přehlednost.'
  },
  { 
    title: 'Spuštění', 
    description: 'Finální testy a spuštění webu',
    subtitle: 'Bezpečné spuštění a finální kontrola',
    details: 'Po schválení web přesuneme na ostrý hosting, provedeme finální kontrolu funkčnosti a připravíme web na běžný provoz.'
  },
  { 
    title: 'Servis', 
    description: 'Školení a dlouhodobá podpora',
    subtitle: 'Web, na který se můžete spolehnout i po spuštění',
    details: 'Po spuštění zajišťujeme technickou podporu, aktualizace systému a školení správců webu školy.'
  },
];

