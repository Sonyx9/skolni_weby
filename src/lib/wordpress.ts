/**
 * WordPress REST API integration
 * 
 * Tento soubor obsahuje utility funkce pro načítání obsahu z WordPress REST API
 * 
 * Nastavení:
 * 1. Vytvořte .env soubor s WORDPRESS_URL=https://vase-wordpress-instalace.cz
 * 2. Ujistěte se, že WordPress má povolené REST API pro Custom Post Types
 * 3. Nastavte show_in_rest => true v registraci Custom Post Types
 */

const WORDPRESS_URL = import.meta.env.WORDPRESS_URL || 'https://admin.skolni-weby.cz';

// Types matching your current content structure
export interface Reference {
  id: string;
  title: string;
  type: 'ms' | 'zs' | 'ss' | 'zus';
  city: string;
  image: string;
  description?: string;
}

export interface FAQ {
  question: string;
  answer: string;
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

export interface ProcessStep {
  title: string;
  description: string;
}

/**
 * Načte reference z WordPressu
 * Custom Post Type: 'reference'
 * ACF fields: type, city
 */
export async function getReferences(): Promise<Reference[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/reference?_embed&per_page=100`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.warn('WordPress API error:', response.status);
      return [];
    }

    const data = await response.json();

    return data.map((post: any) => ({
      id: post.id.toString(),
      title: post.title.rendered,
      type: post.acf?.type || post.meta?.type || 'ms',
      city: post.acf?.city || post.meta?.city || '',
      image: 
        post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
        post.featured_media_url ||
        '/images/placeholder-ref-01.webp',
      description: post.excerpt?.rendered || post.acf?.description,
    }));
  } catch (error) {
    console.error('Error fetching references from WordPress:', error);
    return [];
  }
}

/**
 * Načte FAQ z WordPressu
 * Custom Post Type: 'faq'
 */
export async function getFAQ(): Promise<FAQ[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/faq?per_page=100`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.warn('WordPress API error:', response.status);
      return [];
    }

    const data = await response.json();

    return data.map((post: any) => ({
      question: post.title.rendered,
      answer: post.content.rendered || post.content?.raw || '',
    }));
  } catch (error) {
    console.error('Error fetching FAQ from WordPress:', error);
    return [];
  }
}

/**
 * Načte ceník z WordPressu
 * Custom Post Type: 'pricing' nebo ACF fields
 */
export async function getPricingTiers(): Promise<PricingTier[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/pricing?per_page=100`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.warn('WordPress API error:', response.status);
      return [];
    }

    const data = await response.json();

    return data.map((post: any) => ({
      id: post.slug || post.id.toString(),
      name: post.title.rendered,
      subtitle: post.acf?.subtitle || '',
      price: post.acf?.price || '',
      priceNote: post.acf?.price_note,
      features: post.acf?.features || [],
      recommended: post.acf?.recommended || false,
      cta: post.acf?.cta || 'Chci nabídku',
    }));
  } catch (error) {
    console.error('Error fetching pricing from WordPress:', error);
    return [];
  }
}

/**
 * Načte proces kroky z WordPressu
 * Custom Post Type: 'process'
 */
export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const response = await fetch(
      `${WORDPRESS_URL}/wp-json/wp/v2/process?orderby=menu_order&order=asc&per_page=100`,
      {
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (!response.ok) {
      console.warn('WordPress API error:', response.status);
      return [];
    }

    const data = await response.json();

    return data.map((post: any) => ({
      title: post.title.rendered,
      description: post.content.rendered || post.acf?.description || '',
    }));
  } catch (error) {
    console.error('Error fetching process steps from WordPress:', error);
    return [];
  }
}

/**
 * Fallback na statická data pokud WordPress není dostupný
 * Použijte při buildu nebo pokud preferujete hybridní přístup
 */
export async function getContentWithFallback() {
  const [references, faq, pricingTiers, processSteps] = await Promise.all([
    getReferences(),
    getFAQ(),
    getPricingTiers(),
    getProcessSteps(),
  ]);

  // Fallback na statická data pokud WordPress vrátí prázdné pole
  const { references: staticRefs, faq: staticFAQ, pricingTiers: staticPricing, processSteps: staticProcess } = await import('../data/content');

  return {
    references: references.length > 0 ? references : staticRefs,
    faq: faq.length > 0 ? faq : staticFAQ,
    pricingTiers: pricingTiers.length > 0 ? pricingTiers : staticPricing,
    processSteps: processSteps.length > 0 ? processSteps : staticProcess,
  };
}

