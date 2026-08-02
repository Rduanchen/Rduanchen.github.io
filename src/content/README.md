# 內容管理指南 (Content Management Guide)

這個資料夾 (`src/content`) 集中管理了網站的所有靜態內容，主要分為三大區塊：**Projects (作品集)**、**Blog (網誌)**、與 **Docs (書本/長篇筆記)**。

---

## 1. 作品集 (Projects) - 雙語系工作流

作品集已支援**中英雙語系 (i18n)**。為了保持網址的整潔且讓中英文可以共用同一份圖片資源，請嚴格遵守以下的資料夾與命名結構。

### 如何新增一個專案？

1. 在 `src/content/projects/` 底下建立一個**代表該專案名稱的資料夾**（例如 `my-awesome-project`）。
   * ⚠️ 注意：這個資料夾名稱將會成為網址的一部份，請使用小寫英文與連字號 `-`。
2. 將該專案需要用到的所有圖片（例如 `cover.png`, `sample.jpg`）丟進這個資料夾中。
3. 在該資料夾內，建立**兩個 Markdown 檔案**：
   - `zh-tw.mdx`：填寫繁體中文內容。
   - `en.mdx`：填寫英文內容。

### 檔案結構範例：
```text
src/content/projects/
└── my-awesome-project/       <-- 你的專案資料夾 (URL Slug)
    ├── en.mdx                <-- 英文版內容
    ├── zh-tw.mdx             <-- 中文版內容
    ├── cover.png             <-- 封面圖
    └── screenshot.jpg        <-- 內文截圖
```

### Frontmatter 必填欄位 (MDX 檔頭)：
兩個語言的檔案開頭都需要包含以下的屬性：
```yaml
---
title: "專案標題"
subtitle: "專案副標題（選填）"
description: "簡短描述，會顯示在卡片上"
pubDate: "2026-08-01"
image: "./cover.png"
tags: ["Vue", "Astro"]
---
```

完成後，英文版將自動發布於 `/projects/my-awesome-project/`，中文版則會發布於 `/zh-tw/projects/my-awesome-project/`。

---

## 2. 網誌 (Blog)

網誌系統支援完整的 Markdown/MDX 與程式碼高亮，並具備全文搜尋與標籤前端無重整篩選功能。

### 如何新增一篇網誌？

1. 在 `src/content/blog/` 底下建立一個 `.md` 或 `.mdx` 檔案。
2. 檔案名稱將會是文章的網址 (Slug)。

### Frontmatter 必填欄位：
```yaml
---
title: "你的網誌標題"
description: "這篇文章的簡介"
pubDate: "2026-08-02"
tags: ["前端", "教學"]
---
```
* 💡 **小提示**：寫完後若要測試**全文搜尋**功能，必須執行 `npm run build && npm run preview` 讓 Pagefind 建立搜尋索引；一般開發時只要 `npm run dev` 即可測試標籤過濾功能。

---

## 3. 書本與長篇筆記 (Books)

書本系統由 Astro Starlight 驅動，擁有自動生成的側邊欄目錄與文章大綱，非常適合撰寫連載文章、技術文檔或系統性筆記。

### 如何新增章節？

1. 所有的筆記請放置於 `src/content/docs/books/` 目錄下。
2. Starlight 會自動抓取該目錄底下的所有 markdown 檔案，並自動建立左側的導覽列。
3. 你也可以在裡面建立子資料夾，Starlight 會自動將子資料夾視為一個「章節群組 (Group)」。

### Frontmatter 基本欄位：
```yaml
---
title: "章節名稱"
description: "章節簡介"
---
```

Enjoy writing! 🚀
