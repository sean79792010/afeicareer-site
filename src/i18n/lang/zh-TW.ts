import type { UIStrings } from "../types";

export default {
  nav: {
    home: "首頁",
    posts: "文章",
    tags: "標籤",
    about: "關於",
    archives: "文章彙整",
    search: "搜尋",
  },
  post: {
    publishedAt: "發布於",
    updatedAt: "更新於",
    sharePostIntro: "分享這篇文章:",
    sharePostOn: "分享到 {{platform}}",
    sharePostViaEmail: "以 email 分享這篇文章",
    tagLabel: "標籤",
    backToTop: "回到頂端",
    goBack: "返回",
    editPage: "編輯此頁",
    previousPost: "上一篇",
    nextPost: "下一篇",
  },
  pagination: {
    prev: "上一頁",
    next: "下一頁",
    page: "頁",
  },
  home: {
    socialLinks: "社群連結",
    featured: "精選文章",
    recentPosts: "最新文章",
    allPosts: "所有文章",
  },
  footer: {
    copyright: "版權所有",
    allRightsReserved: "保留所有權利。",
  },
  pages: {
    tagTitle: "標籤",
    tagDesc: "所有含此標籤的文章",

    tagsTitle: "標籤",
    tagsDesc: "文章使用的所有標籤。",

    postsTitle: "文章",
    postsDesc: "所有文章一覽。",

    archivesTitle: "文章彙整",
    archivesDesc: "依時間彙整的所有文章。",

    searchTitle: "搜尋",
    searchDesc: "搜尋任何文章 ...",
  },
  a11y: {
    skipToContent: "跳至主要內容",
    openMenu: "開啟選單",
    closeMenu: "關閉選單",
    toggleTheme: "切換深色/淺色主題",
    searchPlaceholder: "搜尋文章...",
    noResults: "找不到結果",
    goToPreviousPage: "前往上一頁",
    goToNextPage: "前往下一頁",
  },
  notFound: {
    title: "404 找不到頁面",
    message: "找不到這個頁面",
    goHome: "回到首頁",
  },
} satisfies UIStrings;
