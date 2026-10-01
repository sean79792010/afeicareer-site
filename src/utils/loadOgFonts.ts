import { readFile } from "node:fs/promises";
import { join } from "node:path";

// OG 圖用 Noto Sans TC(含中文);範本原本的 Google Sans Code 沒有 CJK 字形,中文會變豆腐。
// 建置時從 repo 讀字型檔,不靠外部網路。
const FONT_DIR = join(process.cwd(), "src/assets/fonts");

export async function loadOgFonts() {
  const [regularData, boldData] = await Promise.all([
    readFile(join(FONT_DIR, "NotoSansTC-Regular.otf")),
    readFile(join(FONT_DIR, "NotoSansTC-Bold.otf")),
  ]);

  return [
    {
      name: "Noto Sans TC",
      data: regularData,
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "Noto Sans TC",
      data: boldData,
      weight: 700 as const,
      style: "normal" as const,
    },
  ];
}
