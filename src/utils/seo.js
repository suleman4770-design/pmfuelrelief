const SEO = {
  home: {
    title: "PM Fuel Relief 9771 SMS Registration Guide | 9771 SMS Guide",
    description:
      "Looking for pmfuelrelief, PM Fuel Relief or the 9771 SMS registration format? Use this independent guide to check your CNIC, vehicle number, province code and registration date before copying the SMS.",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  },
  faqs: {
    title: "PM Fuel Relief 9771 FAQs | SMS Registration Guide",
    description:
      "Answers about the PM Fuel Relief 9771 registration SMS, vehicle number format, province codes, DDMMYYYY date format, copying the SMS and privacy.",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  },
  privacy: {
    title: "Privacy | 9771 SMS Guide",
    description:
      "Privacy information for the independent 9771 SMS Guide. Learn how the browser-only registration builder handles your entered details.",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
  },
};

function upsertMeta(name, content) {
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.name = name;
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertProperty(property, content) {
  let tag = document.head.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.content = content;
}

function upsertLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement("link");
    tag.rel = rel;
    document.head.appendChild(tag);
  }
  tag.href = href;
}

function upsertJsonLd(id, data) {
  let tag = document.head.querySelector(`script[data-seo="${id}"]`);
  if (!tag) {
    tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.dataset.seo = id;
    document.head.appendChild(tag);
  }
  tag.textContent = JSON.stringify(data);
}

export function applySEO(page, faqItems = []) {
  const config = SEO[page] || SEO.home;
  const pathname = window.location.pathname || "/";
  const cleanPath = pathname === "/" ? "/" : pathname.replace(/\/+$/, "");
  const url = `${window.location.origin}${cleanPath || "/"}`;
  const imageUrl = `${window.location.origin}/brand/9771-og.png`;
  const logoUrl = `${window.location.origin}/brand/9771-mark.svg`;

  document.title = config.title;
  document.documentElement.lang = "en-PK";

  upsertMeta("description", config.description);
  upsertMeta("robots", config.robots);
  upsertMeta("googlebot", config.robots);

  upsertProperty("og:title", config.title);
  upsertProperty("og:description", config.description);
  upsertProperty("og:type", "website");
  upsertProperty("og:url", url);
  upsertProperty("og:image", imageUrl);
  upsertProperty("og:image:alt", "PM Fuel Relief 9771 SMS Guide share image");
  upsertProperty("og:locale", "en_PK");

  upsertMeta("twitter:card", "summary");
  upsertMeta("twitter:title", config.title);
  upsertMeta("twitter:description", config.description);
  upsertMeta("twitter:image", imageUrl);

  upsertLink("canonical", url);

  const graph = [
    {
      "@type": "WebSite",
      "@id": `${window.location.origin}/#website`,
      "url": `${window.location.origin}/`,
      "name": "9771 SMS Guide",
      "description": "Independent guide for preparing the PM Fuel Relief 9771 registration SMS.",
      "inLanguage": "en-PK",
    },
    {
      "@type": "Organization",
      "@id": `${window.location.origin}/#organization`,
      "name": "9771 SMS Guide",
      "url": `${window.location.origin}/`,
      "logo": logoUrl,
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      "url": url,
      "name": config.title,
      "description": config.description,
      "isPartOf": { "@id": `${window.location.origin}/#website` },
      "inLanguage": "en-PK",
    },
  ];


  upsertJsonLd("site-graph", {
    "@context": "https://schema.org",
    "@graph": graph,
  });
}
