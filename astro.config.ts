import {
  defineConfig,
  envField,
  fontProviders,
  svgoOptimizer,
} from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { unified } from "@astrojs/markdown-remark";
import remarkToc from "remark-toc";
import remarkCollapse from "remark-collapse";
import rehypeCallouts from "rehype-callouts";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import config from "./astro-paper.config";

export default defineConfig({
  site: config.site.url,
  integrations: [
    mdx(),
    sitemap({
      filter: page =>
        config.features?.showArchives !== false || !page.endsWith("/archives/"),
    }),
  ],
  i18n: {
    locales: ["zh-TW"],
    defaultLocale: "zh-TW",
    routing: {
      prefixDefaultLocale: false,
    },
  },
  markdown: {
    processor: unified({
      remarkPlugins: [
        // 目錄標題支援中文「目錄」與英文 Table of Contents / TOC
        [remarkToc, { heading: "目錄|toc|table[ -]of[ -]contents?" }],
        [
          remarkCollapse,
          { test: /目錄|table of contents/i, summary: () => "展開目錄" },
        ],
      ],
      rehypePlugins: [rehypeCallouts],
    }),
    shikiConfig: {
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  fonts: [
    // 內文:Raleway(拉丁)+ Noto Sans TC(中文),清爽好讀
    {
      name: "Raleway",
      cssVariable: "--font-raleway",
      provider: fontProviders.google(),
      fallbacks: ["sans-serif"],
      weights: [300, 400, 500, 600, 700],
      styles: ["normal"],
      formats: ["woff2", "woff"],
    },
    {
      name: "Noto Sans TC",
      cssVariable: "--font-noto-sans-tc",
      provider: fontProviders.google(),
      fallbacks: ["sans-serif"],
      weights: [400, 500, 700],
      styles: ["normal"],
      formats: ["woff2", "woff"],
    },
    // 標題:Lora(拉丁襯線)+ Noto Serif TC(中文襯線),優雅療癒
    {
      name: "Lora",
      cssVariable: "--font-lora",
      provider: fontProviders.google(),
      fallbacks: ["serif"],
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"],
      formats: ["woff2", "woff"],
    },
    {
      name: "Noto Serif TC",
      cssVariable: "--font-noto-serif-tc",
      provider: fontProviders.google(),
      fallbacks: ["serif"],
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      formats: ["woff2", "woff"],
    },
    {
      name: "Google Sans Code",
      cssVariable: "--font-google-sans-code",
      provider: fontProviders.google(),
      fallbacks: ["monospace"],
      weights: [300, 400, 500, 600, 700],
      styles: ["normal", "italic"],
      formats: ["woff", "ttf"],
    },
  ],
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
  experimental: {
    svgOptimizer: svgoOptimizer(),
  },
});
