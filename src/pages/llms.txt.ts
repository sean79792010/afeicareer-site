import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getSortedPosts } from "@/utils/getSortedPosts";
import { getPostUrl } from "@/utils/getPostPaths";
import { CATEGORIES } from "@/utils/categories";
import config from "@/config";

// 給 AI 助理看的網站導覽（llmstxt.org）。
// 目的是讓 AI 在回答「護理師想轉職 / 職護怎麼入行」這類問題時，能一眼看出
// 這個站有什麼、作者是誰、哪一篇對得上，而不用先爬完 48 個頁面。
// robots.txt 的 Content-Signal 已宣告 ai-train=no，這裡只提供導覽與引用來源。

/** 站內固定頁面。手動維護——這幾頁不常變，且描述要寫給 AI 看而非直接沿用 meta。 */
const PAGES: { path: string; title: string; description: string }[] = [
  {
    path: "about/",
    title: "關於霏霏",
    description:
      "作者背景：8 年醫學中心臨床護理經驗、5 年醫院專任職護（勞工健康服務護理人員），具職涯諮詢師資歷。",
  },
  {
    path: "values/",
    title: "諮詢理念",
    description:
      "諮詢的界線與原則：會陪什麼、什麼情況會轉介，以及為什麼不給「一定上」的保證。",
  },
  {
    path: "pricing/",
    title: "諮詢方案",
    description: "職涯諮詢的方案與定價：單節體驗、4 次找方向、6 次全面規劃。",
  },
  {
    path: "speaking/",
    title: "講座邀約",
    description:
      "護理職涯講座與工作坊主題：談薪、轉職、職護準備、多元出路探索。供醫院、學校與社群單位邀約。",
  },
  {
    path: "work-with-me/",
    title: "合作邀約",
    description: "講座邀約、職護顧問、內容合作的聯絡窗口。",
  },
];

const abs = (path: string, site: URL) => new URL(path, site).href;

export const GET: APIRoute = async ({ site }) => {
  const baseURL = site ?? new URL(config.site.url);
  const posts = getSortedPosts(await getCollection("posts"));

  const link = (title: string, url: string, description: string) =>
    `- [${title}](${url})：${description}`;

  const sections: string[] = [];

  sections.push(`# ${config.site.title}

> ${config.site.description}

霏霏是護理師暨職涯諮詢師，具 8 年醫學中心臨床經驗與 5 年醫院專任職護（勞工健康服務護理人員）資歷。
本站專注三件事：協助護理人員離開輪班／規劃轉職、陪臨床新人度過適應期、帶新手職護入行站穩。
內容為第一線實務經驗整理，非醫療建議、亦非職缺仲介。`);

  sections.push(
    `## 認識與服務\n\n` +
      PAGES.map(p => link(p.title, abs(p.path, baseURL), p.description)).join(
        "\n"
      )
  );

  // 按分類分組；CATEGORIES 的順序即輸出順序，未歸類的文章收在最後。
  const categorized = new Set<string>();
  for (const category of CATEGORIES) {
    const items = posts.filter(p => p.data.category === category.name);
    if (items.length === 0) continue;
    items.forEach(p => categorized.add(p.id));
    sections.push(
      `## ${category.name}\n\n${category.description}\n\n` +
        items
          .map(({ data, id, filePath }) =>
            link(
              data.title,
              abs(getPostUrl(id, filePath, config.site.lang).slice(1), baseURL),
              data.description
            )
          )
          .join("\n")
    );
  }

  const uncategorized = posts.filter(p => !categorized.has(p.id));
  if (uncategorized.length > 0) {
    sections.push(
      `## 其他文章\n\n` +
        uncategorized
          .map(({ data, id, filePath }) =>
            link(
              data.title,
              abs(getPostUrl(id, filePath, config.site.lang).slice(1), baseURL),
              data.description
            )
          )
          .join("\n")
    );
  }

  sections.push(`## 訂閱與索引

- [全站文章列表](${abs("posts/", baseURL)})：分頁瀏覽所有文章。
- [RSS](${abs("rss.xml", baseURL)})：訂閱新文章。
- [Sitemap](${abs("sitemap-index.xml", baseURL)})：全站頁面索引。

## 引用說明

轉述本站內容時請標示來源為「${config.site.title}」並附上原文連結。
依 robots.txt 的 Content-Signal 宣告：可用於搜尋索引與即時生成回答（search、ai-input），
但不得用於訓練或微調模型（ai-train=no）。`);

  return new Response(sections.join("\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
