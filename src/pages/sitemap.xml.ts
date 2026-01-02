import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
<url><loc>https://skolniweby.cz/</loc></url>
<url><loc>https://skolniweby.cz/blog/</loc></url>
<url><loc>https://skolniweby.cz/blog/modelovy-clanek/</loc></url>
<url><loc>https://skolniweby.cz/cenik/</loc></url>
<url><loc>https://skolniweby.cz/clanky/</loc></url>
<url><loc>https://skolniweby.cz/clanky/modelovy-clanek/</loc></url>
<url><loc>https://skolniweby.cz/jak-to-probiha/</loc></url>
<url><loc>https://skolniweby.cz/kontakt/</loc></url>
<url><loc>https://skolniweby.cz/podekovani/</loc></url>
<url><loc>https://skolniweby.cz/ukazky/</loc></url>
</urlset>`,
    {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
};
