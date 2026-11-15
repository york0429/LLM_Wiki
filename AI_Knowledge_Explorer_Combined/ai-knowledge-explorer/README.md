# AI Knowledge Explorer｜AI 知識探索百科

繁體中文 AI 互動學習網站，結合 Karpathy LLM Wiki 的知識累積、交叉連結與維護思想，並提供文章、三種互動卡片、選擇題與學習路線。

> 目前為本機可執行的第一版，**尚未公開部署**。此專案不包含登入系統；學習紀錄僅儲存在目前的瀏覽器。

## 已包含的內容

- 7 類頁面：首頁、知識探索、學習路線、文章、知識挑戰、我的學習、關於本站。
- 5 個主題類別、10 篇繁體中文示範文章。
- 3 種互動元件：知識翻轉卡、逐步流程圖、情境比較卡。
- 每篇 3 題選擇題（共 30 題）；分類挑戰與綜合挑戰共用題庫。
- 手動完成標記、最佳成績與路線進度（localStorage）。
- `AGENTS.md`、來源紀錄、知識索引、維護日誌及資料檢查腳本。

## 本機啟動

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev
```

在終端機開啟 Vite 顯示的本機網址（通常是 `http://localhost:5173/`）。

檢查資料、生成索引與測試建置：

```bash
npm run index
npm run check
npm run build
npm run preview
```

## 專案結構

| 路徑 | 內容 |
|---|---|
| `AGENTS.md` | 讓 AI 知道怎麼維護專案 |
| `wiki/` | Markdown 文章、分類索引、維護紀錄 |
| `sources/sources.json` | 參考來源元資料與待查證狀態 |
| `interactions/` | 各篇文章的互動卡片 JSON |
| `quizzes/` | 各篇文章的三題題庫 JSON |
| `learning-paths/main.json` | 五階段推薦路線 |
| `templates/` | 新增文章、卡片與題庫的樣板 |
| `src/` | 前端頁面、資料載入、樣式與儲存功能 |
| `scripts/` | 資料驗證與索引工具 |
| `raw/` | 可合法保存的原始來源（私人檔案不要提交） |

## AI 擴充文章的方式

1. 先讀根目錄 `AGENTS.md` 和 `wiki/index.md`。
2. 檢查資料來源與同分類文章，選定唯一英文 ID。
3. 依 `templates/article.md` 建立 `wiki/<category>/<id>.md`。
4. 從三種互動卡樣板選一個，建立 `interactions/<id>.json`。
5. 建立 `quizzes/<id>.json`（恰好 3 題且有解析）。
6. 將 ID 加到 `learning-paths/main.json`，更新適合的延伸閱讀連結。
7. 執行 `npm run index && npm run check && npm run build`，更新 `wiki/log.md`。

**資料原則**：`raw/` 原始資料不由 AI 擅自改寫；Wiki 是可持續更新的整理層。`wiki/index.md` 應由工具從文章重新產生，避免手工與網站內容不一致。

## 關於資料正確性

第一版的文章是入門教學摘要。`sources/sources.json` 中的來源目前標記為 `pending`，表示**尚未完成逐條來源查證**，不能將其宣稱為經完整審核的學術知識庫。正式對外提供內容前應檢查每項重要說法和引用連結。

## 本版範圍

本版只包含本機開發與測試，不包含 GitHub Pages、公開網站部署、帳號或雲端同步。日後如果需要，可以另外規劃。

## 不安裝套件的離線預覽

為了方便直接檢查第一版，專案另提供 `dist-local/` 預覽版本。解壓縮專案後，直接開啟 `dist-local/index.html` 即可瀏覽，不需要先安裝 Node.js、Vite，也不會連到任何公開網站。離線時若無法載入線上字體，會自動使用裝置上的備用字體。

如要重新製作離線預覽，請使用 Node.js 執行：

```bash
npm run index
npm run build:offline
```

其中 `build:offline` 會先執行資料完整性檢查，再使用專案內建的建置腳本更新 `dist-local/`。平常新增文章時，**不要直接修改 `dist-local/` 內的產物**，應修改 `wiki/`、`interactions/`、`quizzes/` 等來源，再重新建置。

> 注意：本機測試環境目前無法透過 npm 取得 Vite，因此這次已完成的自動化資料檢查與瀏覽器操作測試採離線預覽版本；`npm run build`（正式 Vite 建置）未在此環境完成。若其他環境可正常安裝 npm 套件，可使用上面的 Vite 流程。
