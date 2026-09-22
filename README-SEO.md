# SEO setup

This project uses people-first SEO rather than a keyword-stuffed metadata block.

## Target search intent

Primary: PM Fuel Relief, pmfuelrelief, 9771 SMS, PM Fuel Relief 9771, 9771 registration.

Related: 9771 SMS registration format, PM petrol relief, petrol subsidy SMS, REG 9771, 9771 province code, 9771 registration date, DDMMYYYY 9771, PM Fuel Relief FAQs.

## Technical SEO included

- Unique titles and meta descriptions for the home, FAQs and privacy URLs.
- Crawlable `/`, `/faqs`, and `/privacy` URLs with Vercel rewrites.
- Runtime canonical URLs based on the real origin.
- Open Graph and Twitter metadata.
- WebSite, Organization, WebPage and FAQ structured data.
- Build-generated `robots.txt` and `sitemap.xml`.
- Local OG share image and favicon.
- Existing Google Search Console verification tag preserved.
- Visible, natural search language in headings and page copy.

## Build-time sitemap and robots.txt

The production build generates `public/sitemap.xml` and `public/robots.txt` from `SITE_URL`, `VERCEL_PROJECT_PRODUCTION_URL`, or `VERCEL_URL`.

For a custom domain, set `SITE_URL` in the deployment environment, for example:

```bash
SITE_URL=https://your-real-domain.example
```

On Vercel, `VERCEL_PROJECT_PRODUCTION_URL` is used as a fallback. During local development/building, the generator falls back to `http://localhost:5173` so the build itself does not fail; replace it with your real production URL before indexing the site.

## Important

Do not add a `meta name="keywords"` block. Google says the meta-keywords tag has no effect on indexing or ranking. The project instead places real search language in visible headings, useful copy, page titles, descriptions, FAQ content, crawlable links, and structured data.
