# XINL OFFICIAL WEBSITE

包含：
- 簡介內容（About）
- 語系切換（EN / ZH / JA，前端 SPA，會記住你上次選擇）
- 社群連結（Contact）

## 開發（本機）

```bash
pnpm install
pnpm dev
```

啟動後打開：

http://localhost:5178

## 內容如何修改

- **About 文案**
  - `src/lib/messages/en.json`
  - `src/lib/messages/zh.json`
  - `src/lib/messages/ja.json`

- **語系切換 UI**
  - `src/lib/components/Header.svelte`

- **社群連結**
  - `src/lib/components/ContactSection.svelte`

## 資產（Assets）

- **Logo**
  - `src/lib/assets/xinl_logo.png`

- **SVG Icons**
  - 放在 `src/lib/assets/*.svg`
  - 由 `src/lib/components/base/Icon.svelte` 統一載入與控制

