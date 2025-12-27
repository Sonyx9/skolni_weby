# Příklad použití WordPress API v Astro

## Aktualizace stránky pro použití WordPress API

### Příklad: index.astro s WordPress daty

```astro
---
// src/pages/index.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import Hero from '../components/Hero.astro';
import ReferenceCard from '../components/ReferenceCard.astro';
import PricingCard from '../components/PricingCard.astro';
import FAQAccordion from '../components/FAQAccordion.astro';
import { getContentWithFallback } from '../lib/wordpress';

// Načtení dat z WordPressu (s fallbackem na statická data)
const { references, faq, pricingTiers } = await getContentWithFallback();

// Nebo přímo z WordPressu (bez fallbacku):
// import { getReferences, getFAQ, getPricingTiers } from '../lib/wordpress';
// const references = await getReferences();
// const faq = await getFAQ();
// const pricingTiers = await getPricingTiers();
---

<BaseLayout 
  title="Moderní web pro školu | ŠkolníWeby"
  description="..."
>
  <Hero 
    title="Moderní web pro školu, který rodiče opravdu používají."
    subtitle="..."
  />

  <!-- Reference z WordPressu -->
  <section class="section bg-gray-50">
    <div class="container-custom">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {references.slice(0, 6).map((ref) => (
          <ReferenceCard {...ref} />
        ))}
      </div>
    </div>
  </section>

  <!-- FAQ z WordPressu -->
  <section class="section bg-white">
    <div class="container-custom">
      <FAQAccordion faqs={faq.slice(0, 5)} />
    </div>
  </section>

  <!-- Ceník z WordPressu -->
  <section class="section bg-gray-50">
    <div class="container-custom">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingTiers.map((tier) => (
          <PricingCard {...tier} />
        ))}
      </div>
    </div>
  </section>
</BaseLayout>
```

## Nastavení WordPress Custom Post Types

### functions.php v WordPressu

```php
<?php
// Registrace Custom Post Types s REST API podporou

// Reference
function register_reference_post_type() {
    register_post_type('reference', [
        'labels' => [
            'name' => 'Reference',
            'singular_name' => 'Reference',
        ],
        'public' => true,
        'show_in_rest' => true, // DŮLEŽITÉ pro REST API!
        'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
        'menu_icon' => 'dashicons-portfolio',
    ]);
}
add_action('init', 'register_reference_post_type');

// FAQ
function register_faq_post_type() {
    register_post_type('faq', [
        'labels' => [
            'name' => 'FAQ',
            'singular_name' => 'FAQ',
        ],
        'public' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'editor'],
        'menu_icon' => 'dashicons-editor-help',
    ]);
}
add_action('init', 'register_faq_post_type');

// Pricing
function register_pricing_post_type() {
    register_post_type('pricing', [
        'labels' => [
            'name' => 'Ceník',
            'singular_name' => 'Cenová položka',
        ],
        'public' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'editor'],
        'menu_icon' => 'dashicons-money-alt',
    ]);
}
add_action('init', 'register_pricing_post_type');

// Process Steps
function register_process_post_type() {
    register_post_type('process', [
        'labels' => [
            'name' => 'Proces kroky',
            'singular_name' => 'Krok',
        ],
        'public' => true,
        'show_in_rest' => true,
        'supports' => ['title', 'editor'],
        'menu_icon' => 'dashicons-list-view',
    ]);
}
add_action('init', 'register_process_post_type');
```

## Nastavení ACF (Advanced Custom Fields)

Pro strukturovaná data použijte ACF plugin:

### ACF Field Groups

**Reference:**
- `type` (Select): ms, zs, ss, zus
- `city` (Text)
- `description` (Textarea)

**Pricing:**
- `subtitle` (Text)
- `price` (Text)
- `price_note` (Text)
- `features` (Repeater)
- `recommended` (True/False)
- `cta` (Text)

## Environment Variables

Vytvořte `.env` soubor v root projektu:

```env
WORDPRESS_URL=https://admin.skolni-weby.cz
```

V `astro.config.mjs` přidejte:

```javascript
export default defineConfig({
  // ...
  env: {
    WORDPRESS_URL: process.env.WORDPRESS_URL,
  },
});
```

## Build Process

Při buildu Astro automaticky fetchuje data z WordPressu:

```bash
npm run build
```

Pokud WordPress není dostupný, použije se fallback na statická data.

## Webhook pro automatický rebuild

Nastavte webhook v WordPressu, který triggeruje rebuild při změně obsahu:

```php
// functions.php
function trigger_astro_rebuild($post_id) {
    // Ignoruj autosave
    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    $post_type = get_post_type($post_id);
    
    // Pouze pro naše Custom Post Types
    if (!in_array($post_type, ['reference', 'faq', 'pricing', 'process'])) {
        return;
    }

    // Zavolej webhook (Vercel, Netlify, Cloudflare Pages, atd.)
    $webhook_url = 'https://api.vercel.com/v1/integrations/deploy/...';
    
    wp_remote_post($webhook_url, [
        'method' => 'POST',
        'timeout' => 5,
    ]);
}
add_action('save_post', 'trigger_astro_rebuild');
```

## Hybridní přístup

Můžete kombinovat WordPress API s lokálními daty:

```typescript
// src/lib/wordpress.ts
import { references as staticReferences } from '../data/content';

export async function getReferences() {
  const wpReferences = await fetchFromWordPress();
  
  // Pokud WordPress není dostupný, použij statická data
  if (wpReferences.length === 0) {
    return staticReferences;
  }
  
  return wpReferences;
}
```

## Testování

```bash
# Lokální test s WordPress API
npm run dev

# Build test
npm run build

# Preview buildu
npm run preview
```

