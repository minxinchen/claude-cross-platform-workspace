# 問題與解法：代表性案例

這一頁不是把所有 change log 依日期列出來，而是只保留**真正改變判斷與下一步做法**的問題。

每個案例都用同一個結構：

```text
觀察到什麼問題？
→ 有哪些可能原因？
→ 哪一份證據最能區分這些原因？
→ 原本忽略了什麼？
→ 因此改了什麼？
→ 後來新增了什麼驗證方式？
```

---

## 案例 1：手機首頁約 13 秒

### 問題

首頁 Mobile LCP 約 13.10s。可能原因包含 hosting、圖片重量、WordPress、Smart Slider 3、JavaScript / CSS 與 cache。

### 關鍵做法

建立隔離測試頁，只把第一屏 Smart Slider 3 換成 lightweight static hero，其餘頁面盡量維持可比較。

### 結果

- 原始首頁：13.10s
- 隔離測試：3.16s
- 正式改版：2.72s

### 原本容易忽略的地方

如果只看「網站慢」，很容易先怪 hosting 或整個 WordPress。但只改第一屏 slider 就產生巨大差異，代表 first-screen rendering structure 才是更高影響的變因。

### 解法

不先做 hosting migration。移除首屏重型 slider runtime，用 HTML / CSS 重建 hero，保留背景、Logo、文案、CTA 與 responsive layout。

→ [完整效能案例](../performance/isolated-first-screen-test.md)

---

## 案例 2：三語「完成」其實只有一語完整

### 問題

繁中 Pillar page 正常，英文與簡中也都有 URL、H1、hreflang 與文章，但後來發現英文與簡中沒有相同的完整 Pillar HTML。

### 為什麼原本會 PASS

舊 release gate 檢查了：

- translated URLs
- H1
- articles
- hreflang
- schema
- visual cases

這些檢查沒有錯，但它們無法證明三個語言真的有**等價內容**。

### 原本忽略的地方

`URL exists` 不等於 `content equivalent`。

另外，登入 WordPress 後看到的新版，也不一定等於 anonymous visitor 從 Breeze cache 拿到的版本。

### 解法

三語驗收改成逐語言檢查 anonymous rendered DOM，包括：

- unique H1
- 完整 Pillar DOM
- 頁內導航
- 同語言產品連結
- FAQ
- CTA
- desktop/mobile overflow
- cache purge 後的公開結果

這個事件改掉的不是一個翻譯頁，而是**「三語完成」的驗收定義**。

→ [三語 false PASS 紀錄](../incidents/multilingual-false-pass.md)

---

## 案例 3：產品正文更新，FAQ / JSON-LD 卻還是舊值

### 問題

業主更新工程規格後，visible product body 已經使用新規格，但較早建立的 FAQ 與 machine-readable data 還留著舊值。

### 原本忽略的地方

同一個產品事實不是只存在一個地方，而可能同時出現在：

- visible product body
- FAQ
- JSON-LD
- product knowledge JSON
- translated pages

只改正文，不能保證其他衍生內容自動同步。

### 解法

- owner-confirmed engineering data 作為最高產品 truth source
- Agent 不可以根據「哪個數字看起來合理」自行選值
- truth source 更新時，同時驗證所有 derived representations
- 對已知 obsolete values 建立 regression ban

→ [產品資料漂移紀錄](../incidents/product-truth-drift.md)

---

## 案例 4：Structured Data 不是越多越好

### 問題

專案曾嘗試 Product / ProductModel structured data，但 Google 實際 Rich Results 驗證與網站現有的 B2B quote-only 公開資料條件不相容。

網站沒有 verified：

- Offer
- price
- inventory
- review
- rating

### 原本容易走錯的方向

如果目標只是「讓 Schema 看起來更完整」，最簡單的方法反而會變成補不存在的欄位。

### 解法

不捏造資料。Production 移除不適合的 Product / ProductModel rich-result implementation，保留可由公開內容支持的 Article、Breadcrumb、Organization 與 visible product content。

這個案例讓 AIO 的判準從「加更多 Schema」改成「讓人看到的內容與 machine-readable information 一致」。

→ [AIO / Structured Data 方法](aio-governance.md)

---

## 案例 5：本地 QA 正常，但 Google 仍看見錯誤舊網址

### 問題

GSC Page Indexing 顯示 32 個 redirected URLs。

進一步分類後：

- 大部分屬於合理歷史 redirect、HTTP/www normalization、WordPress path 或原本就正確的舊網址
- 其中 **14 個** legacy paths 有明確的新頁面，卻錯誤 fallback 到語言首頁

### 原本忽略的地方

目前網站 navigation 正常，不代表搜尋引擎看到的歷史 URL graph 也正常。

### 解法

把 Google Search Console 從成果報表變成外部驗證資料：

- 先分類哪些 redirect 是合理的
- 只修有明確 modern equivalent 的 legacy path
- 使用 relevant single-hop redirect
- 沒有明確對應頁的舊網址不硬猜
- 不宣稱修正當天 GSC 就會立刻更新

→ [GSC redirect 紀錄](../search/search-console-redirect-review.md)

---

## 案例 6：做過實驗，不代表正式上線

### 問題

專案裡有 scroll-reveal test page、screenshots 與 checks。幾週後如果只看檔案，很容易把「曾經測試」誤記成「正式網站曾使用」。

### 關鍵證據

同一 checkpoint：

- test page 可公開存取，但有 `noindex`
- test page 不載入 heavy slider
- test marker 存在於實驗頁
- production homepage 沒有 test marker，也沒有 test-page references

### 解法

experiment state 與 production state 分開記錄，沒有 explicit release evidence 就不能寫成 shipped feature。

→ [實驗狀態紀錄](../experiments/scroll-reveal-state-check.md)

---

## 案例 7：已經 PASS，也可能被新證據推翻

某次 release checklist 曾經 PASS，但後來更完整的 anonymous / multilingual validation 找到漏同步問題。

因此專案採用的做法是：

- 不修改舊 evidence 來假裝從來沒出錯
- 保留當時的 PASS
- 新增 incident review
- 說明舊 gate 少檢查了什麼
- 建立更完整的新 gate
- 更新 current project state

這個原則很簡單：**PASS 只代表當時那一組檢查沒有找到問題，不代表結論永遠正確。**