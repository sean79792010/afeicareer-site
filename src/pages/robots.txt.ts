import type { APIRoute } from "astro";

// 明確放行 AI 搜尋 / 訓練爬蟲（GEO/AEO）——預設 * 已不擋，這裡逐一列名讓意圖清楚且防未來被誤擋。
const AI_CRAWLERS = [
  "GPTBot", // OpenAI
  "OAI-SearchBot", // OpenAI 搜尋
  "ChatGPT-User", // ChatGPT 即時瀏覽
  "PerplexityBot", // Perplexity
  "Perplexity-User",
  "ClaudeBot", // Anthropic
  "anthropic-ai",
  "Claude-Web",
  "Google-Extended", // Google Gemini / Vertex
  "CCBot", // Common Crawl
  "Applebot-Extended", // Apple Intelligence
  "Bytespider", // 位元組
];

const getRobotsTxt = (sitemapURL: URL) => `${AI_CRAWLERS.map(
  bot => `User-agent: ${bot}\nAllow: /\n`
).join("\n")}
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  return new Response(getRobotsTxt(sitemapURL));
};
