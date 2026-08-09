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

// Content Signals（contentsignals.org / IETF draft-romm-aipref-contentsignals）
// search   = yes：可建索引、可在搜尋結果顯示標題與短摘錄
// ai-input = yes：可即時取用內容生成 AI 回答（RAG / grounding）——這是 AI 搜尋引用的來源
// ai-train = no ：不得用於訓練或微調模型
//
// Content-Signal 是 group-member line，只對它所屬的 User-agent 群組生效。
// 上面每個具名爬蟲各自成群，因此每一群都必須重複這行，否則 GPTBot / ClaudeBot 等
// 只會讀自己的群組、完全看不到宣告。
const CONTENT_SIGNAL = "Content-Signal: search=yes, ai-input=yes, ai-train=no";

const PREAMBLE = `# As a condition of accessing this website, you agree to
# abide by the following content signals:

# (a)  If a content-signal = yes, you may collect content
# for the corresponding use.
# (b)  If a content-signal = no, you may not collect content
# for the corresponding use.
# (c)  If the website operator does not include a content
# signal for a corresponding use, the website operator
# neither grants nor restricts permission via content signal
# with respect to the corresponding use.

# The content signals and their meanings are:

# search: building a search index and providing search
# results (e.g., returning hyperlinks and short excerpts
# from your website's contents).  Search does not include
# providing AI-generated search summaries.
# ai-input: inputting content into one or more AI models
# (e.g., retrieval augmented generation, grounding, or other
# real-time taking of content for generative AI search
# answers).
# ai-train: training or fine-tuning AI models.

# ANY RESTRICTIONS EXPRESSED VIA CONTENT-SIGNALS ARE EXPRESS
# RESERVATIONS OF RIGHTS UNDER ARTICLE 4 OF THE EUROPEAN
# UNION DIRECTIVE 2019/790 ON COPYRIGHT AND RELATED RIGHTS
# IN THE DIGITAL SINGLE MARKET.
`;

const getRobotsTxt = (sitemapURL: URL, llmsURL: URL) => `${PREAMBLE}
${AI_CRAWLERS.map(
  bot => `User-agent: ${bot}\nAllow: /\n${CONTENT_SIGNAL}\n`
).join("\n")}
User-agent: *
Allow: /
${CONTENT_SIGNAL}

# 給 AI 助理的網站導覽（llmstxt.org）
# ${llmsURL.href}

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL("sitemap-index.xml", site);
  const llmsURL = new URL("llms.txt", site);
  return new Response(getRobotsTxt(sitemapURL, llmsURL));
};
