# AGENTS.md — AI Knowledge Explorer

> 專案：AI 知識探索百科｜語言：繁體中文（zh-Hant）  
> 本文件是所有 AI Agent、程式助理與協作者的專案規則。每次修改前先閱讀本文件、`README.md` 與 `wiki/index.md`。

## 1. 目的與邊界

建立面向初學者的繁體中文 AI 互動學習百科，結合 Karpathy LLM Wiki 的「原始來源 → 持續維護的 Wiki → 網站呈現」思想。使用者可以自由探索文章、依五階段推薦路線學習、操作互動卡片、參加文章測驗與分類挑戰，並自行標記文章完成。

- 重點是**可持續擴充的規則和內容維護**，不是每次重做網頁。
- V1 範圍：5 分類、10 篇入門文章、3 種互動卡片、每篇 3 題測驗、7 種頁面類型。
- 目前不需要登入、伺服器 API、即時 AI 回答或任何公開部署作業。若要新增上述功能，應另行明確提出並評估。
- 優先修正現有資料與共用元件，避免增添不必要的框架或套件。

## 2. 技術與指令

- Vite + 原生 JavaScript + CSS，文章為 Markdown（含 YAML frontmatter），互動和題庫為 JSON。
- `npm install`：安裝套件；`npm run dev`：本機開發；`npm run check`：資料完整性檢查；`npm run index`：重建知識索引；`npm run build`：先檢查再建置；`npm run preview`：預覽 Vite 建置成果；`npm run build:offline`：不需外部套件的本機預覽建置。
- `src/data.js` 在建置期間使用 Vite 的 glob 匯入 Markdown/JSON，新增檔案後應重新整理頁面或重啟開發環境。
- 文章解析器只支援專案規定的簡單 YAML 欄位（字串、整數、JSON 格式陣列）。**不要自行新增巢狀 YAML 結構**，除非同步更新解析器與檢查腳本。
- 新增文章通常不應編輯 `src/main.js`、`src/styles.css` 或 `index.html`。
- `dist-local/` 是由 `npm run build:offline` 產生的離線預覽產物，不可直接編輯，且不包含公開部署。`vite.config.js` 目前採相對資源路徑以利本機預覽；**不代表已經部署到 GitHub Pages**。

## 3. 專案目錄與資料所有權

| 位置 | 用途 | 修改原則 |
|---|---|---|
| `AGENTS.md` | AI 行為、格式及維護規則 | 變更流程時才更新 |
| `README.md` | 專案介紹與本機使用方法 | 依實際功能更新 |
| `raw/` | 可合法保存的原始參考檔 | 原始內容不可擅改；私密內容不能提交 |
| `sources/sources.json` | 來源元資料、引用與查證狀態 | 來源穩定 ID、不得虛構 |
| `wiki/{basics,generative-ai,techniques,applications,safety}/` | 五大類 Markdown 教學文 | 應遵守統一模板 |
| `wiki/sources/`、`wiki/syntheses/` | 來源筆記、跨文綜整（可擴充） | 與入門教學文章區分 |
| `wiki/index.md` | 全站文章索引 | 以 `npm run index` 產生 |
| `wiki/log.md` | 依時間追加的變更紀錄 | 不覆寫既有紀錄 |
| `interactions/<article-id>.json` | 三種互動卡片的資料 | 優先重用共用模板 |
| `quizzes/<article-id>.json` | 一篇文章三題共用題庫 | 每題唯一 ID + 正確答案 |
| `learning-paths/main.json` | 學習階段和順序 | 對應真實文章 ID |
| `templates/` | 文章/互動/測驗範本 | 新增內容從模板開始 |
| `src/` | 共用渲染、樣式與狀態儲存 | 避免逐篇寫死內容 |
| `scripts/` | 索引生成、資料驗證 | 變更欄位時同步更新 |

**命名規範**：ID 與檔名使用英文小寫 kebab-case，如 `rag-introduction`。文章 `id`、互動 `article_id`、測驗 `article_id`、路線 `article_ids` 必須一致。文章標題變更不應更換 ID，以免破壞學習紀錄。

## 4. 網站頁面與視覺設計

共七種頁面：首頁、知識探索、推薦學習路線、知識文章、知識挑戰、我的學習、關於本站。首頁使用頂部導航與分類卡片；文章採左側分類、中央閱讀內容、桌面右側目錄；手機收合導航、改為單欄。

- 風格：清新科技風；白、淺藍、靛紫；大量留白、16px 左右圓角、細框、輕陰影。
- 主色 `#4F46E5`；輔色 `#7C83FF`、`#A78BFA`；背景 `#F0F5FF`／`#FFFFFF`；內文 `#1F2937`；次要文字 `#475569`。
- 繁體中文優先 Noto Sans TC；一般內文約 16px、行距約 1.7。
- 重要資訊不可只靠顏色，互動可使用鍵盤，考慮 `prefers-reduced-motion`，不因手機版而隱藏必要內容。
- 不因新增文章擅自更換全站導覽、設計系統或按鈕模式。

## 5. 文章資料合約

文章放在正確分類目錄，例如 `wiki/techniques/rag-introduction.md`。首段 YAML frontmatter 欄位必備：

- `id`：全域唯一、穩定 kebab-case。
- `title`：繁體中文文章標題。
- `category`：`basics`／`generative-ai`／`techniques`／`applications`／`safety`。
- `difficulty`：`入門` 或 `進階`。
- `stage`：整數 1–5，並與 `learning-paths/main.json` 的文章歸屬一致。
- `summary`：一行簡介。
- `minutes`：正整數的預估閱讀時間。
- `interaction_id`、`quiz_id`：現階段皆與文章 `id` 一致。
- `related`：JSON 字串陣列，指向已存在的文章 ID（不得指向自己）。
- `sources`：JSON 字串陣列，指向 `sources/sources.json` 中的來源 ID。
- `updated_at`：實際修改日期，格式 `YYYY-MM-DD`。

文章應包含八個二級標題，**名稱完全一致且按順序**：

1. `## 概念介紹`
2. `## 運作原理`
3. `## 生活應用範例`
4. `## 互動探索`
5. `## 知識重點整理`
6. `## 知識小測驗`
7. `## 延伸閱讀`
8. `## 參考資料`

繁體中文、初學者友善、生活化說明；首見術語提供中英名稱；不以簡化為由曲解技術。Markdown 中只放說明文字，不複製互動 JSON 或測驗題目。重要技術敘述應具可追溯來源。入門篇以 5–8 分鐘閱讀量為方向，不必硬性湊字數。

## 6. 來源管理（混合式）

優先利用使用者提供的資料和已收錄來源；若使用者要求補充、查證或更新，才搜尋公開的官方文件、原始研究或可信來源。不得假裝已閱讀未取得的文件。

`sources/sources.json` 每筆來源包含：`source_id`、`title`、`author`、`type`、`url`、`published_at`、`collected_at`、`status`、`related_articles`。`status` 只使用 `verified`、`pending`、`disputed`。目前示範來源標為 `pending`，**不能對外宣稱全部已查證**。正式發布文章前須複核重要敘述與來源。

- 原始資料 immutable：如需更正，在 Wiki 與來源註記中更正，不偷偷改原檔。
- 未知日期用 `null`，不得以收錄日冒充發表日。
- 不公開私人檔、付費全文或未取得授權的資料；公開的是合法摘要及引用。
- 不明確的說法標示待查證；相互矛盾的來源需比對日期、版本、方法與適用條件。

## 7. 三種互動元件

一篇文章配置一份 `interactions/<id>.json`，其 `id`、`article_id` 與文章一致。只使用：

- `flashcard`：`question`、`answer`、`explanation`。
- `step-flow`：`title`、`steps`，每個步驟有 `title`、`description`（至少兩步）。
- `comparison`：`title`、`option_a`、`option_b`（各有 `label`、`description`）、`conclusion`。

使用既有元件填入不同主題資料；不為單一文章重複新增 HTML/JavaScript。互動文本必須與正文一致，應提供清楚可操作的回饋，支援手機與鍵盤。

## 8. 測驗、學習進度與推薦路線

`quizzes/<id>.json` 包含 `id`、`article_id`、`version`、`questions`，每篇**恰好三題**。每題：`question_id`（唯一）、`article_id`、`version`、`question`、`options`（四字串）、`answer`（0–3 的索引）、`explanation`。每題單一正確答案、能在文章找到依據；不要杜撰試題事實。

- 文章內小測驗使用本篇三題；分類或綜合挑戰從共用題庫選 5 題；不足五題需明示，不得臨時湊題。
- 閱讀狀態：尚未開始、閱讀中、已完成；僅手動標記/取消完成，測驗不影響完成狀態。
- 最佳成績另存於本機瀏覽器（localStorage），不收集個資；更換裝置或清除資料可能遺失。
- `learning-paths/main.json` 的 5 個階段只保存文章 ID 和順序，不能複製正文；使用者可自由跳轉，不強制解鎖。
- 大幅修改題目或正確答案時增加版本，檢查既有成績的可比性。

## 9. Agent 標準工作流程

### Ingest｜納入新來源
1. 檢查已有 `sources` 和 `wiki/index.md`，避免重複。
2. 讀取新來源並註明實際讀取範圍、作者、發表日期及查證狀態。
3. 合法保存原始檔或來源網址，建立摘要及關鍵概念。
4. 辨識受影響的舊文章；在有來源依據下補充、修正、交叉連結。
5. 更新索引及 `wiki/log.md`；納入來源不代表自動公開發布文章。

### Query｜查詢知識
1. 先讀索引與相關文章，再回查來源。
2. 依據可追溯資料答覆，區分事實、推論、來源爭議。
3. 若有值得保留的新綜整，可在確認後存入 `wiki/syntheses/` 或修訂相關文章。

### Publish｜新增／修改教學文章
1. 讀 `AGENTS.md`、索引與同分類文章，確認不存在重複主題。
2. 使用可信來源，建立或使用既有來源 ID。
3. 由 `templates/article.md` 建立標準 Markdown、固定 ID 和分類。
4. 由 `templates/` 選一種互動卡片建立 `interactions/<id>.json`。
5. 參照 `templates/quiz.json` 建立 `quizzes/<id>.json` 三題。
6. 更新 `learning-paths/main.json`、其他文章的 `related`，檢查交叉引用。
7. 執行 `npm run index`，更新 `wiki/index.md`；將變更追加至 `wiki/log.md`。
8. 執行 `npm run check`、`npm run build`；若套件無法安裝，可改用 `npm run build:offline` 產生離線預覽，必要時操作測試相關頁面。須分別註明哪一種建置通過，**未執行不得宣稱通過**。
9. 列出新增檔案、可能影響、尚未查證事項；公開發布另依使用者明確要求執行。

### Lint｜知識與網站健檢
- 資料：重複 ID、缺少欄位、失效引用、孤立文章、來源矛盾、過期聲明。
- 學習：互動 JSON 不一致、選項錯誤、沒有解析、路線指向不存在文章。
- 網站：無法建置、導覽或路由錯誤、鍵盤/手機操作問題、閱讀紀錄破壞。
- 回報分為**已驗證問題**與**建議改善**，不得將猜測冒充確認結果。

## 10. 索引、日誌與版本紀律

- `wiki/index.md` 列出分類、標題、相對文章連結與摘要；應由 `npm run index` 根據文章生成，避免手工漂移。
- `wiki/log.md` 是追加式更新紀錄，格式 `## [YYYY-MM-DD] <ingest|query|publish|lint> | 摘要`，列出修改原因和受影響檔案。
- 文章 ID 及既有使用者紀錄的鍵值應保持穩定；刪除或移動內容前先查依賴。
- 不修改無關檔案，不隨意重構，必要的技術調整需同步更新本文與 README。

## 11. 驗收清單

- `npm run check`：文章欄位、分類與階段、來源、互動、題庫、路線關聯全部有效。
- `npm run build`：Vite 能成功生成網站成果。
- 操作檢查七種頁面；分類篩選與搜尋；翻卡、流程、比較卡；文章測驗與分類挑戰；標記完成與最佳成績。
- 手機與桌面瀏覽正常；不宣稱未實際測試的裝置/功能已通過。
- 核心能力驗收：依本文**只新增一篇新文章＋互動資料＋題庫＋索引及路線變更**，原本的網站版型和功能仍維持一致。
- **目前不包含公開部署或設定登入功能**。

## 12. 絕對禁止事項

- 捏造來源、論文、日期、實測結果、部署狀態。
- 未經授權公開私人文件或受限制全文。
- 未經確認刪除大量資料、修改穩定 ID 或更換全站設計。
- 只更動正文，卻忽略受影響的互動卡片、題庫、索引與連結。
- 假稱 `npm run check`、`npm run build` 或瀏覽器操作已成功。
- 未經要求私自推送至 GitHub、開啟部署或其他對外發布行為。
