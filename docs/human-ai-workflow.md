# 人機協作流程

## 不是把網站交給 AI，而是把工作切成不同責任

這個專案不是一開始就有一套完整的 Agent governance 架構，而是在真實工作中逐步形成邊界。Agent 會做得很快，也會犯錯；人類負責決定哪些錯誤值得改成永久規則。

### 人類負責

- 業務需求與優先順序
- 哪些資料可以公開
- 哪些產品規格是真的
- 是否允許上線
- 遇到衝突時，哪個來源具有最高權威
- 哪些假設值得做實驗，而不是直接全站套用

### AI Agent 負責

- 掃描大量頁面與檔案
- 比對三語內容
- 產生候選文案、HTML、JSON-LD 與程式
- 建立驗證腳本
- 產生 before/after evidence
- 整理專案狀態與報告
- 根據 evidence map 載入與當前問題最相關的歷史 log

### Deterministic tools 負責

- HTTP status
- canonical
- hreflang
- H1 / meta
- schema parse
- sitemap
- internal links
- image status
- viewport / overflow
- known-value consistency
- Lighthouse / performance comparisons

## 我後來真正建立的邊界

最重要的規則不是「AI 不可以犯錯」，而是：

> AI 的結論必須能被 evidence 推翻。

例如：

- Agent 曾把單一語言的成功外推成三語完成。
- Agent 曾更新產品正文，卻留下舊 FAQ / structured data。
- 登入後看到的新版本，曾與匿名 cache 中的版本不同。
- 一個已經 PASS 的 release，後來仍被更完整的 evidence 推翻。

因此我逐步把「完成」從自然語言判斷，改成可重跑的驗證條件。

## Evidence hierarchy

大量 log 不應全部載入 context。它們被分成三層：

```text
Raw Evidence
Lighthouse / HTML / screenshot / JSON / stderr
        ↓
Representative Log
哪個 evidence 真正改變了問題判斷
        ↓
Decision Rule
因此修改了什麼流程、gate 或 release decision
```

一份 log 只有在它能改變下一步決策時，才算高資訊量 representative log。

例如首頁效能問題：

```text
Phenotype
mobile first-screen ≈ 13 seconds

Candidate causes
hosting / images / slider / JS / CSS / cache

High-information experiment
只替換 first-screen slider
13.10s → 3.16s

Interpretation
hosting 不是主要解釋
first-screen structure 才是主要變因

Decision
移除重型 slider，重建 lightweight hero

Production result
2.72s
```

這比「讀了很多 Lighthouse log」更重要，因為這份 isolated test 真正改變了 implementation path。

## Agent context loading

Agent 開始工作時使用這個順序：

```text
Question
  ↓
Current Project State
  ↓
Problem Class
  ↓
Evidence Map
  ↓
Representative Log
  ↓
Raw Evidence if disputed / incomplete
```

這避免兩個問題：

1. 把所有歷史檔案一次塞進 context，浪費 token 並增加混淆。
2. 只靠 Agent 的對話記憶，幾週後把「做過實驗」誤記成「正式上線」。

## 一次修改的標準循環

1. 讀取目前公開狀態、project state 與 relevant evidence map。
2. 找出會改變判斷的 representative log，而不是先讀全部 raw files。
3. Agent 提出最小修改範圍。
4. 先保存 before evidence。
5. 修改 WordPress / Code Snippets / Rank Math。
6. 清除 cache。
7. 以匿名公開請求驗證。
8. 跑 deterministic gate。
9. 保存 after evidence。
10. PASS 才更新 project state；FAIL 就 rollback、修正或建立 incident review。

## Human hypothesis 不等於 Agent conclusion

專案後期也出現真正的意見分歧。

Agent 偏向守住 production Rich Results zero-error；Human 則提出另一個尚未執行的假設：是否可以只挑一個產品作為 experimental group，在不虛構 Offer / price / review / rating 的前提下，增加 visible FAQ 與 semantic clarity，觀察之後的搜尋與 AI 呈現是否不同。

這個想法目前仍是 **proposed / unvalidated**，不能寫成成果。

它保留下來的原因，是提醒後續 Agent：

> production safety 與 information gain 有時是不同 objective function。
