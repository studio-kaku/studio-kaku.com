import { publicPages, jaPath } from '../data/public-pages.js';

export function GET({ site }) {
  const urls = publicPages
    .flatMap((path) => [path, jaPath(path)])
    .map((path) => `  <url><loc>${new URL(path, site).href}</loc></url>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
}
