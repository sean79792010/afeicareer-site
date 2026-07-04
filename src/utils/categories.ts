import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "./slugify";
import { postFilter } from "./postFilter";

export interface CategoryDef {
  /** 同時是文章 frontmatter 的 `category` 值（填中文即可） */
  name: string;
  description: string;
}

/**
 * 網站的四大文章分類。顯示順序即此陣列順序。
 * URL slug 由 `slugifyStr(name)` 動態產生（中文走 kebabcase，與 tags 一致）。
 * 新增分類：在這裡加一筆，並記得同步更新 content.config.ts 的 category enum。
 */
export const CATEGORIES: CategoryDef[] = [
  {
    name: "護理轉職",
    description: "想離開臨床、脫離輪班、找正常班出路的護理師，從這裡開始。",
  },
  {
    name: "臨床新人調適",
    description: "還在臨床、快撐不住的新人，陪你面對那些不敢在單位裡說的話。",
  },
  {
    name: "新手職護陪跑",
    description:
      "剛踏進企業當職護？從入行到第一年，實務與心理一起陪你站穩、不陣亡。",
  },
  {
    name: "職涯隨筆",
    description: "關於護理職涯、諮詢與陪伴，我想跟你聊的那些事。",
  },
];

export const getCategorySlug = (name: string): string => slugifyStr(name);

export interface CategoryWithCount extends CategoryDef {
  slug: string;
  count: number;
}

/** 回傳四大分類 + 各自的（已發佈）文章數，供分類總覽頁使用。 */
export function getCategoriesWithCount(
  posts: CollectionEntry<"posts">[]
): CategoryWithCount[] {
  const published = posts.filter(postFilter);
  return CATEGORIES.map(cat => ({
    ...cat,
    slug: getCategorySlug(cat.name),
    count: published.filter(p => p.data.category === cat.name).length,
  }));
}
