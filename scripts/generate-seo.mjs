import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

function normalizeUrl(value) {
  if (!value) return "";
  const raw = value.startsWith("http://") || value.startsWith("https://") ? value : `https://${value}`;
  return raw.replace(/\/+$/, "");
}

const detectedUrl =
  process.env.SITE_URL ||
  process.env.VERCEL_PROJECT_PRODUCTION_URL ||
  process.env.VERCEL_URL ||
  "http://localhost:5173";

const siteUrl = normalizeUrl(detectedUrl);
if (!process.env.SITE_URL && siteUrl.startsWith("http://localhost")) {
  console.warn("SITE_URL is not set; generating local sitemap URLs. Set SITE_URL for production deployments.");
}

const publicDir = resolve("public");
await mkdir(publicDir, { recursive: true });

const pages = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/faqs", priority: "0.7", changefreq: "monthly" },
  { path: "/privacy", priority: "0.4", changefreq: "yearly" },
];

const lastmod = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n` +
`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  pages.map(({ path, priority, changefreq }) =>
    `  <url><loc>${siteUrl}${path}</loc><lastmod>${lastmod}</lastmod><changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>`
  ).join("\n") +
`\n</urlset>\n`;

const robots = `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`;

await writeFile(resolve(publicDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(resolve(publicDir, "robots.txt"), robots, "utf8");

console.log(`SEO files generated for ${siteUrl}`);
