import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://afeicareer.com/",
    title: "霏霏｜護理職涯諮詢",
    description: "護理職涯路上不孤單 — 霏霏的護理師職涯諮詢與經驗分享",
    author: "霏霏",
    profile: "https://www.instagram.com/afeicareer",
    ogImage: "default-og.jpg",
    lang: "zh-TW",
    timezone: "Asia/Taipei",
    dir: "ltr",
  },
  posts: {
    perPage: 4,
    perIndex: 4,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: false,
    dynamicOgImage: true,
    showArchives: false,
    showBackButton: true,
    editPost: {
      enabled: true,
      url: "https://github.com/satnaing/astro-paper/edit/main/",
    },
    search: "pagefind",
  },
  socials: [
    { name: "instagram", url: "https://www.instagram.com/afeicareer" },
    { name: "threads",   url: "https://www.threads.net/@afeicareer" },
    { name: "firstory",  url: "https://open.firstory.me/user/cmp1827nk0axa01wd13kt3mpi/platforms", linkTitle: "職愛護相取暖會客室 Podcast" },
    { name: "mail",      url: "mailto:contact@afeicareer.com" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});