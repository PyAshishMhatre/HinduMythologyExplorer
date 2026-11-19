// Generates public/sitemap.xml and public/robots.txt. Run via: npm run sitemap
import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { sitemapPaths, SITE_URL } from '../src/lib/seo';

const paths = [...new Set(sitemapPaths())];
const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${SITE_URL}${p === '/' ? '/' : p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
const pub = resolve(process.cwd(), 'public');
mkdirSync(pub, { recursive: true });
writeFileSync(resolve(pub, 'sitemap.xml'), xml);
writeFileSync(resolve(pub, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);
console.log(`sitemap: ${paths.length} URLs`);
