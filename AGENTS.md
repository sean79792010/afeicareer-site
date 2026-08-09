## 上架文章:只 commit 指名的檔案

**幫 Fei 發文章時,`git add` 一律指名該篇,絕不用 `git add .` / `git add -A` / `git commit -a`。**

`src/content/posts/` 底下常躺著 Fei 還沒寫完的草稿(欄位未填齊,例如 `pubDatetime` 空白、
`category` 不在 `src/content.config.ts` 的 enum 內)。整包掃進去 push 後,
**Cloudflare Pages 的 `astro check` 會失敗 → 整批部署被退,連這次要發的新文章也上不了線**,
而且沒有任何錯誤通知會傳到 Fei 那邊,她只會看到「文章怎麼沒出現」。

```bash
git add src/content/posts/<這次要發的那一篇>.md
git status              # 確認暫存區只有這一篇,沒有夾帶其他草稿
git commit -m "posts: ..."
git push
```

不確定改動會不會過建置,push 前先跑 `npx astro check`(等同 CF 端的第一道關卡)。

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
