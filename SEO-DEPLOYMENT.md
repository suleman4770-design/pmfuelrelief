# SEO deployment checklist

1. In Vercel → Project → Settings → Environment Variables, add:

   `SITE_URL=https://YOUR-REAL-DOMAIN.example`

2. Redeploy the project. The build script generates:

   - `/sitemap.xml`
   - `/robots.txt`

3. In Google Search Console, verify the property using the existing verification meta tag, then submit:

   `https://YOUR-REAL-DOMAIN.example/sitemap.xml`

4. Use URL Inspection for:

   - `/`
   - `/faqs`
   - `/privacy`

5. Request indexing after the first production deployment and after major content changes.

Search engines decide ranking; these changes improve crawlability, relevance signals and search appearance but cannot guarantee a specific position for any keyword.
