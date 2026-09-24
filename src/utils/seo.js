const SEO = {
  home: {
    title: "9771 SMS رجسٹریشن | PM Fuel Relief اردو گائیڈ",
    description: "9771 پر PM Fuel Relief رجسٹریشن SMS کیسے بھیجیں؟ CNIC، گاڑی نمبر، صوبہ کوڈ اور DDMMYYYY تاریخ کے ساتھ آسان اردو گائیڈ۔",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    keywords: [
      "9771 SMS registration", "9771 SMS registration format", "9771 registration Pakistan", "9771 petrol relief registration", "PM Fuel Relief 9771", "PM Fuel Relief registration SMS", "PM Fuel Relief SMS format", "how to send REG SMS to 9771", "9771 REG SMS", "9771 TOK token", "9771 province code", "9771 Punjab code", "9771 vehicle number format", "9771 registration date DDMMYYYY", "9771 SMS guide Pakistan", "PM Fuel Relief in Urdu", "petrol relief 9771 Urdu", "9771 پر رجسٹریشن کا طریقہ", "9771 ایس ایم ایس رجسٹریشن", "9771 پر REG میسج کیسے بھیجیں", "9771 رجسٹریشن کا طریقہ", "9771 ایس ایم ایس فارمیٹ", "9771 پر پٹرول ریلیف رجسٹریشن", "9771 گاڑی نمبر", "9771 پنجاب کوڈ", "9771 رجسٹریشن تاریخ", "9771 ٹوکن TOK طریقہ", "پٹرول ریلیف 9771", "PM Fuel Relief اردو گائیڈ"
    ],
  },
  faqs: {
    title: "9771 SMS سوالات | PM Fuel Relief اردو گائیڈ",
    description: "9771 رجسٹریشن، گاڑی نمبر میں ہائفن، پنجاب کوڈ P، DDMMYYYY تاریخ اور PM Fuel Relief SMS کے عام سوالات کے آسان اردو جواب۔",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    keywords: ["9771 FAQs Urdu", "9771 registration questions", "9771 SMS format Pakistan", "9771 vehicle number format", "9771 Punjab code", "9771 registration date", "9771 TOK token guide", "9771 گاڑی نمبر", "9771 پنجاب کوڈ", "9771 SMS طریقہ", "9771 رجسٹریشن کا طریقہ", "PM Fuel Relief سوالات"],
  },
  privacy: {
    title: "رازداری | 9771 SMS گائیڈ",
    description: "9771 SMS گائیڈ آپ کی درج کردہ معلومات کو کیسے ہینڈل کرتی ہے؟ براؤزر میں SMS تیار کرنے اور رازداری کے بارے میں آسان معلومات۔",
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    keywords: ["9771 privacy Urdu", "CNIC privacy 9771", "9771 گائیڈ رازداری"],
  },
};

function upsertMeta(name, content) {
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!tag) { tag = document.createElement("meta"); tag.name = name; document.head.appendChild(tag); }
  tag.content = content;
}

function upsertProperty(property, content) {
  let tag = document.head.querySelector(`meta[property="${property}"]`);
  if (!tag) { tag = document.createElement("meta"); tag.setAttribute("property", property); document.head.appendChild(tag); }
  tag.content = content;
}

function upsertLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`);
  if (!tag) { tag = document.createElement("link"); tag.rel = rel; document.head.appendChild(tag); }
  tag.href = href;
}

function upsertJsonLd(id, data) {
  let tag = document.head.querySelector(`script[data-seo="${id}"]`);
  if (!tag) { tag = document.createElement("script"); tag.type = "application/ld+json"; tag.dataset.seo = id; document.head.appendChild(tag); }
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
  document.documentElement.lang = "ur-PK";
  document.documentElement.dir = "rtl";
  upsertMeta("description", config.description);
  upsertMeta("robots", config.robots);
  upsertMeta("googlebot", config.robots);

  upsertProperty("og:title", config.title);
  upsertProperty("og:description", config.description);
  upsertProperty("og:type", "website");
  upsertProperty("og:url", url);
  upsertProperty("og:image", imageUrl);
  upsertProperty("og:image:alt", "9771 SMS گائیڈ");
  upsertProperty("og:locale", "ur_PK");

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
      "name": "9771 SMS گائیڈ",
      "description": "PM Fuel Relief 9771 رجسٹریشن SMS کی آزاد اردو گائیڈ۔",
      "inLanguage": "ur-PK",
      "keywords": config.keywords,
    },
    {
      "@type": "Organization",
      "@id": `${window.location.origin}/#organization`,
      "name": "9771 SMS گائیڈ",
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
      "inLanguage": "ur-PK",
      "keywords": config.keywords,
    },
  ];

  if (page === "faqs" && faqItems.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      "url": url,
      "mainEntity": faqItems.map(([question, answer]) => ({
        "@type": "Question",
        "name": question,
        "acceptedAnswer": { "@type": "Answer", "text": answer },
      })),
    });
  }

  upsertJsonLd("site-graph", { "@context": "https://schema.org", "@graph": graph });
}
