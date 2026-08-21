# Log：怎麼從大量紀錄找到真正有用的證據

這個公開作品集不放原始客戶 log，而是保留一個比較重要的方法：**大量工作紀錄裡，哪些真的改變了問題判斷？**

原專案有大量 Lighthouse runs、HTML、screenshots、stderr、JSON、before / after snapshots。這些原始資料不可缺少，但不代表每次都要全部讀進 Agent context。

## 我怎麼分類 Log

```text
Raw Evidence
Lighthouse / HTML / screenshot / JSON / stderr
        ↓
Representative Log
哪一份紀錄真正改變了對問題的解釋？
        ↓
Decision
因此下一步做法、驗收方式或 release decision 改了什麼？
```

一份 log 如果只是記錄「做過某件事」，資訊量不一定高。

真正值得優先載入的是能回答這四個問題的紀錄：

1. 問題到底是什麼？
2. 哪一份 evidence 排除了原本可能的解釋？
3. 哪個容易被忽略的變因讓舊結論失效？
4. 因此下一步決策或 validation rule 改了什麼？

---

## Agent 建議的載入順序

```text
目前問題
   ↓
Project State
   ↓
問題類別
   ↓
Evidence Map
   ↓
Representative Log
   ↓
必要時才讀 Raw Evidence
```

Agent 不需要先讀幾千個檔案。先從 `examples/evidence-map.example.json` 找到最接近的 case，只有摘要不足、證據互相衝突或需要重新驗證時，才往下追 raw evidence。

---

## 目前保留的代表性案例

### 1. 首頁效能

- 問題：Mobile first-screen 約 13 秒
- 關鍵 evidence：只把 Smart Slider 3 換成 lightweight hero，LCP 13.10s → 3.16s
- Production：2.72s
- 原本忽略：首屏 interaction / rendering structure
- 決策：先改 front-end structure，不先把 hosting 當主因

→ [`performance/isolated-first-screen-test.md`](../performance/isolated-first-screen-test.md)

### 2. 三語 False PASS

- 問題：multilingual release 被標成完成
- 關鍵 evidence：只有一語具備完整 pillar DOM
- 原本忽略：URL / H1 / hreflang 存在，不等於內容等價
- 決策：逐語言 anonymous rendered DOM validation

→ [`incidents/multilingual-false-pass.md`](../incidents/multilingual-false-pass.md)

### 3. 產品資料漂移

- 問題：正文已更新，FAQ / JSON-LD 還留著舊值
- 原本忽略：同一 product fact 有多個 representation
- 決策：owner-confirmed truth source + consistency validator

→ [`incidents/product-truth-drift.md`](../incidents/product-truth-drift.md)

### 4. GSC 外部驗證

- 問題：目前網站 QA 正常，但 Search Console 顯示 legacy URL 問題
- 關鍵 evidence：32 個 redirected URLs 中，14 個有明確新頁面卻錯誤導向首頁
- 決策：GSC 成為 engineering evidence，不只看成績

→ [`search/search-console-redirect-review.md`](../search/search-console-redirect-review.md)

### 5. Experiment 與 Production 分開

- 問題：scroll-reveal test 存在，但容易被後續摘要誤認成已上線功能
- 關鍵 evidence：test page 有 marker，production 沒有
- 決策：沒有 explicit release evidence 就不能寫成 shipped

→ [`experiments/scroll-reveal-state-check.md`](../experiments/scroll-reveal-state-check.md)

### 6. 單一產品 AIO 假設

- 狀態：尚未執行
- 想法：只挑一個產品強化 visible FAQ / semantic clarity，其他產品盡量不變，再觀察 GSC / AI search visibility
- Agent 當時偏向 production Rich Results zero-error
- 關鍵差異：production safety 與 experimental information gain 是不同目標

→ [`hypotheses/single-product-aio-experiment.md`](../hypotheses/single-product-aio-experiment.md)

---

## Raw Evidence 仍然有什麼用

原始 log 仍然保留四種功能：

- **before evidence**：修改前公開狀態
- **change / rollback record**：做了什麼，以及怎麼恢復
- **after validation**：公開匿名結果與 deterministic checks
- **incident evidence**：新 evidence 推翻舊 PASS 時，保存根因與新規則

公開版本刻意移除客戶網址、內部 WordPress ID、私有路徑、未公開工程資訊與可識別客戶的 screenshots。

Log 在這個作品集裡不是為了證明「我做很多事」，而是為了讓後來的人或 Agent 知道：**當時為什麼做這個決定。**