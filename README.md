# 9771 SMS Guide

A focused static React + Vite tool for preparing a 9771 registration SMS in the browser.

## UX direction

Version 4 is a full visual redesign rather than a collection of incremental UI patches. The experience uses a restrained public-service visual language: strong typography, dark forest-green hero, warm neutral surfaces, clear form states, and minimal decoration.

## Main flow

1. Enter CNIC, vehicle number, province/region and registration date.
2. See live completion and validation feedback.
3. Review the exact SMS in the live preview.
4. Copy the message.
5. Use the success dialog to share the guide or finish.

## Privacy

The form is handled in the browser. No login, account or form endpoint is included in the project.

## Images

Put the two supplied example images in `public/images/`:
- `vehicle-registration.jpg`
- `registration-date.jpg`

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

Before publishing, verify all scheme-specific instructions, SMS formats and official URLs against current official sources.


### v4.1 interaction fixes
- Example viewer is rendered through a document-level portal so it cannot be trapped inside the input wrapper on desktop or mobile.
- Example controls are shown only while their associated field is empty and disappear immediately once the user types.
- Example viewer locks background scrolling and supports Escape to close.
## Vercel Analytics and Speed Insights

The Vite + React app includes Vercel Web Analytics and Speed Insights using their React integrations. The Next.js-specific imports are not used because this project is a Vite React application.

```bash
npm install
```

After deploying to Vercel, enable **Analytics** and **Speed Insights** for the project in the Vercel dashboard to start receiving data. Vercel documents React support for both packages.

Google Search Console verification is included in `index.html` using the verification token supplied for this site.


## SEO / Search Console

The project is configured for SEO around natural search intent such as **PM Fuel Relief**, **pmfuelrelief**, **9771 SMS**, **9771 registration**, **9771 SMS format**, and related registration queries.

Technical SEO included:
- Unique titles/descriptions for Guide, FAQs and Privacy.
- Crawlable `/`, `/faqs`, and `/privacy` URLs.
- Canonical URL generation from the deployed origin.
- Open Graph and Twitter metadata.
- WebSite, Organization and WebPage structured data.
- Build-generated `sitemap.xml` and `robots.txt`.
- Google Search Console verification tag preserved.

Before production deployment, set the real public domain as `SITE_URL` in your Vercel project environment variables. The build then generates the correct absolute sitemap URLs.

Google does not use the `meta keywords` tag, so this project intentionally does not add one. Search terms are used naturally in visible headings, page titles, descriptions, FAQ content and links instead.
