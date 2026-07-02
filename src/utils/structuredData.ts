// 集中管理 schema.org 結構化資料（JSON-LD），供 GEO/AEO（AI 搜尋優化）使用。
// 所有 @id 用絕對 URL 當錨點，讓不同 JSON-LD 區塊能互相引用（例如文章 author 指向 Person）。
import config from "@/config";

const { site, socials } = config;

export const SITE_URL = site.url.replace(/\/+$/, "");
export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

// Person 的 sameAs：取社群連結（排除 mailto: 等非 http 連結）
const sameAs = socials
  .map(s => s.url)
  .filter(url => /^https?:\/\//.test(url));

/** 霏霏本人 Person schema（品牌識別 + E-E-A-T）。資料來自 Fei 提供的職涯需求清單。 */
export const personSchema = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: site.author,
  jobTitle: "護理師暨職涯諮詢師",
  description:
    "具 8 年臨床護理經驗的護理師，兼具勞工健康服務護理人員與職涯諮詢師資歷，專注協助護理人員規劃轉職與職涯發展。",
  url: `${SITE_URL}/about/`,
  ...(sameAs.length ? { sameAs } : {}),
  knowsAbout: [
    "護理職涯",
    "護理師轉職",
    "職業衛生護理",
    "職涯諮詢",
    "不輪班護理工作",
  ],
};

/** 全站 WebSite schema，publisher 指向 Person。 */
export const websiteSchema = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: site.title,
  description: site.description,
  inLanguage: site.lang,
  publisher: { "@id": PERSON_ID },
};

type BlogPostingInput = {
  headline: string;
  description?: string;
  url: string;
  image?: string;
  pubDatetime?: Date;
  modDatetime?: Date | null;
};

/** 單篇文章 BlogPosting schema，author/publisher 皆指向 Person。 */
export function blogPostingSchema({
  headline,
  description,
  url,
  image,
  pubDatetime,
  modDatetime,
}: BlogPostingInput) {
  return {
    "@type": "BlogPosting",
    headline,
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(pubDatetime ? { datePublished: pubDatetime.toISOString() } : {}),
    ...(modDatetime ? { dateModified: modDatetime.toISOString() } : {}),
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
    isPartOf: { "@id": WEBSITE_ID },
  };
}

type Crumb = { name: string; url: string };

/** 麵包屑 BreadcrumbList schema。 */
export function breadcrumbSchema(items: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export type FaqItem = { question: string; answer: string };

/** FAQ 區塊 → FAQPage schema（AEO 重點：讓 AI/搜尋引擎直接抓問答）。 */
export function faqSchema(faq: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: faq.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** 把多個 schema 節點包成單一 @graph JSON-LD 字串。 */
export function jsonLdGraph(...nodes: object[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
}
