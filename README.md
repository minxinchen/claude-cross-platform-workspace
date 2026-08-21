# B2B 工業網站 SEO × AIO 優化案例

> 一個真實、去識別化的 B2B 工業網站專案。目標不是展示「用了多少 AI」，而是回答一個更直接的問題：**如何把網站的 SEO 與 AIO 基礎做起來，讓搜尋引擎、AI 系統與潛在客戶更容易理解網站與產品資訊？**

## 專案目標

這個專案有兩個主要目標：

1. **SEO**：改善網站效能、技術結構、三語頁面、索引與舊網址問題，讓 Google 更容易正確抓取、理解與導向內容。
2. **AIO**：整理頁面語意、產品資料與 machine-readable information，降低搜尋引擎與 AI 系統對「這頁是什麼、產品是什麼、哪份資料才是真的」的猜測空間。

AI Agent 是方法之一，不是專案主角。真正的主軸是：**發現問題、提出解釋、找到能區分解釋的證據、修改、驗證，再觀察外部結果。**

---

## 結果摘要

### 網站效能

| 指標 | 修改前 | 隔離測試 | 正式上線 |
|---|---:|---:|---:|
| Mobile LCP | 13.10s | 3.16s | **2.72s** |
| Lighthouse Mobile Performance | 約 73 | 約 93 | **96** |

首頁原本使用 Smart Slider 3。隔離測試只替換首屏 slider，就讓 Mobile LCP 從 13.10s 降到 3.16s，因此主要問題不在 hosting，而在 first-screen rendering structure。正式頁重新設計後，Mobile LCP 約 2.72s。

→ [效能案例：isolated-first-screen-test.md](performance/isolated-first-screen-test.md)

### Google Search Console 整體搜尋結果

比較兩個 GSC 區間：

- 前期：2026/5/1–2026/6/28，共 59 天
- 後期：2026/6/30–2026/8/20，共 52 天

| 指標 | 前期 | 後期 | 總量變化 | 依天數換算 |
|---|---:|---:|---:|---:|
| 點擊 | 299 | 346 | **+15.7%** | 約 **+31.3% / 日** |
| 曝光 | 1.61 萬 | 2.17 萬 | **+34.8%** | 約 **+52.9% / 日** |
| CTR | 1.9% | 1.6% | -0.3 個百分點 | — |
| 平均排名 | 6.3 | 8.8 | 下降 2.5 位 | — |

曝光與點擊增加，但 CTR 與平均排名沒有同步改善。這代表**搜尋可見度擴張得比點擊效率更快**。目前不能只靠總表判斷是原有 query 排名下滑，還是新增 query / page 開始取得較低順位曝光，因此這部分列為後續 query/page-level analysis。

### AI 摘要曝光

同樣比較前後兩期：

| 指標 | 前期 | 後期 | 變化 |
|---|---:|---:|---:|
| AI 摘要曝光 | 4,428 | 5,736 | **+29.5%** |
| 日均曝光 | 約 75.1 | 約 110.3 | **+47.0%** |

AI 摘要曝光占整體 GSC 曝光約由 27.5% 變為 26.4%，大致維持同一量級。因此目前能說的是：**AI 摘要曝光隨整體搜尋可見度一起增加**，不能宣稱 AIO 已讓 AI 摘要占比顯著提高，也不能把這個變化直接視為單一修改造成的因果結果。

→ [結果與限制：results.md](docs/results.md)

---

## 材料與資料

這個專案使用的不是單一 dataset，而是多種真實網站資料來源。

### 網站資料

- WordPress 公開頁面
- 產品頁、技術文章、分類頁、FAQ
- 繁中 / 簡中 / 英文三語內容
- HTML、圖片、PDF、sitemap、internal links
- canonical、hreflang、metadata、redirects

### 產品與業務資料

- 業主確認的產品工程規格
- 既有產品內容與歷史資料
- 公開產品頁與衍生 FAQ / structured data

### 搜尋與效能資料

- Google Search Console
- Google Rich Results Test
- Lighthouse
- anonymous public HTML
- desktop / mobile screenshots
- before / after validation records

### 工作紀錄

- Agent logs
- change logs
- rollback records
- validation JSON
- regression checks

---

## 方法

整體流程類似一個資料分析與實驗專案：

```text
建立 baseline
    ↓
找出高影響問題
    ↓
提出可能原因
    ↓
修改或隔離實驗
    ↓
公開環境驗證
    ↓
Google / GSC 外部驗證
    ↓
重新調整方法
```

### 1. Technical SEO audit

檢查 H1、title、description、canonical、hreflang、sitemap、redirects、internal links、images 與公開 HTTP 狀態。

### 2. 內容與語意結構

整理核心頁主題、產品 HTML 資訊、FAQ、pillar content、三語內容與頁面之間的 internal linking，避免重要資訊只存在圖片或 PDF。

### 3. AIO / Structured Data

研究 Schema.org / JSON-LD、Product、Article、Organization、FAQ 等 machine-readable information，並以 Google 實際驗證結果決定哪些資料適合 production。

### 4. Performance experiment

使用 Lighthouse 建立 baseline，再用隔離頁面控制主要變因，確認瓶頸後才修改正式網站。

### 5. AI Agent-assisted workflow

AI Agent 用來處理大量頁面掃描、三語比較、HTML / script 產生、驗證與 log 整理；人負責定義目標、判斷資料權威性、接受或拒絕 Agent 建議，以及決定是否正式上線。

→ [AI Agent 在專案中的角色](docs/human-ai-workflow.md)

---

## 遇到的主要問題，以及怎麼解

### 問題 1：手機首頁約 13 秒

**觀察**：Mobile LCP 約 13.10s。

**可能原因**：hosting、圖片、WordPress、Smart Slider 3、JavaScript / CSS、cache。

**做法**：建立隔離測試頁，只把 Smart Slider 3 換成 lightweight static hero，其餘頁面盡量保持可比較。

**結果**：13.10s → 3.16s。

**判斷**：主要瓶頸不是 hosting，而是首屏互動與載入結構。

**正式解法**：保留背景、Logo、文字、CTA 與 responsive layout，但移除重型 slider runtime。Production Mobile LCP 約 2.72s。

### 問題 2：有三語 URL，不代表三語內容真的完成

早期 release gate 已經檢查 URL、H1、hreflang、schema 與部分 visual case，但後來發現只有繁中具有完整 pillar content，英文與簡中並沒有等價 rendered DOM。

**真正問題**：驗收指標錯把「surface exists」當成「content equivalent」。

**解法**：改成逐語言驗證 anonymous rendered DOM、H1、導航、產品連結、FAQ、CTA 與 desktop/mobile overflow，並在 cache purge 後重新檢查。

→ [三語 false PASS 案例](incidents/multilingual-false-pass.md)

### 問題 3：產品正文更新了，FAQ / JSON-LD 還是舊資料

產品工程規格更新後，visible main content 已是新值，但較早建立的 FAQ / JSON-LD 還保留舊值。

**真正問題**：同一個 product fact 有多個 representation，只更新其中一份不代表其他衍生資料也同步更新。

**解法**：建立 owner-confirmed truth source，讓產品頁、FAQ、structured data、language variants 與 knowledge JSON 一起做 consistency verification。

→ [產品資料漂移案例](incidents/product-truth-drift.md)

### 問題 4：網站自己測試正常，不代表 Google 看到的歷史 URL 也正常

GSC Page Indexing 顯示 32 個 redirected URLs。分類後發現大部分合理，但其中 14 個 legacy paths 明明有清楚的新頁面，卻錯誤導向語言首頁。

**解法**：把 GSC 當成外部驗證資料，將 14 個有明確對應頁的舊網址修成 relevant single-hop redirects。

→ [GSC redirect 案例](search/search-console-redirect-review.md)

### 問題 5：Structured Data 不是加越多越好

曾嘗試 Product / ProductModel，但 Google 的實際 Rich Results 驗證與網站的 B2B quote-only 資料條件不相容。公開頁沒有 verified Offer、price、inventory、review、rating。

**解法**：不捏造欄位。移除不適合 production 的 Product / ProductModel rich-result implementation，保留可由公開頁支持的 Article、Breadcrumb、Organization 與 visible product content。

→ [AIO 與 Structured Data 方法](docs/aio-governance.md)

---

## 全站技術驗收

目前代表性的 release evidence 包含：

- **122 / 122** sitemap URLs 通過公開檢查
- **116 / 116** desktop/mobile multilingual visual cases 通過
- **170** internal links 檢查無錯誤
- **92** images 無 broken resource
- **14** 個錯誤 legacy redirects 已修正

這些數字代表 technical readiness 與 release validation，不等於搜尋排名或 AI 引用的因果證明。

---

## 限制與尚未回答的問題

這個專案目前仍有幾個不能過度解讀的地方：

1. GSC 前後期不是 controlled experiment，期間內同時有多項 SEO / AIO / performance 修改，因此不能把曝光成長歸因到單一措施。
2. CTR 1.9% → 1.6%，平均排名 6.3 → 8.8，需要 query/page-level data 才能判斷是既有排名下降，還是新增低順位曝光拉低平均值。
3. AI 摘要曝光增加，但占整體曝光比例大致持平，因此不能宣稱 AIO 已提高 AI 摘要占比。
4. 「單一產品做 AIO experimental group」目前仍是未執行假設，沒有結果。
5. 搜尋引擎索引、排名與 AI 摘要引用都具有時間延遲，技術修正完成不代表外部結果會即時更新。

---

## Technical Stack

**WordPress · Rank Math · Polylang · Breeze · Smart Slider 3 · Google Search Console · Google Rich Results Test · Schema.org / JSON-LD · Python · Node.js · Playwright · Lighthouse · GitHub · Google Drive · AI Agents / LLM-assisted workflow**

---

## Repository Map

```text
.
├── docs/
│   ├── results.md
│   ├── human-ai-workflow.md
│   ├── aio-governance.md
│   └── incidents.md
├── performance/
│   └── isolated-first-screen-test.md
├── incidents/
│   ├── multilingual-false-pass.md
│   └── product-truth-drift.md
├── search/
│   └── search-console-redirect-review.md
├── experiments/
│   └── scroll-reveal-state-check.md
├── hypotheses/
│   └── single-product-aio-experiment.md
├── examples/
│   ├── evidence-map.example.json
│   ├── product-truth-registry.example.json
│   ├── project-state.example.json
│   └── release-gate.example.json
├── logs/
│   └── README.md
└── scripts/
    └── verify-release-gate.example.js
```

## 專案結論

這個案例不是「用 AI 做 SEO」的展示，而是一個完整的網站優化問題：

> **我想把 SEO 與 AIO 做起來，因此先建立 baseline，用網站資料、GSC、Lighthouse、產品資料與 Agent logs 找問題；遇到錯誤時重新定義驗收方式，再用公開結果與 Google 的外部資料驗證。**

AI Agent 提供速度與規模，人負責問題定義、資料真實性、實驗判斷與最後決策。