# 人機協作流程

## 不是把網站交給 AI，而是把工作切成不同責任

這個專案的核心不是「AI 自動改網站」，而是把工作分成三類：

### 人類負責

- 業務需求與優先順序
- 哪些資料可以公開
- 哪些產品規格是真的
- 是否允許上線
- 遇到衝突時，哪個來源具有最高權威

### AI Agent 負責

- 掃描大量頁面與檔案
- 比對三語內容
- 產生候選文案、HTML、JSON-LD 與程式
- 建立驗證腳本
- 產生 before/after evidence
- 整理專案狀態與報告

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

## 邊界設計

最重要的規則是：LLM 可以提出候選答案，但不能把未知資料補成事實。

產品資料被分成 confirmed 與 pending。只有 confirmed 欄位能進產品頁與 schema。當公開頁、舊 JSON、PDF 與業主工程資料互相衝突時，使用預先定義的 source precedence，而不是讓模型自行判斷「哪個看起來比較合理」。

## 一次修改的標準循環

1. 讀取目前公開狀態與 truth source。
2. Agent 提出最小修改範圍。
3. 先保存 before evidence。
4. 修改 WordPress / Code Snippets / Rank Math。
5. 清除 cache。
6. 以匿名公開請求驗證。
7. 跑 deterministic gate。
8. 保存 after evidence。
9. PASS 才更新 project state；FAIL 就 rollback 或修正。

## 為什麼不讓 Agent 自己判斷「完成」

專案曾發生過：

- 登入 WordPress 的瀏覽器已看到新內容，但匿名訪客仍拿到舊 cache；
- 繁中頁完成後，被誤認為英文與簡中也完成；
- 新產品規格更新到主內容，但舊 FAQ 與 JSON-LD 還保留舊值；
- 早期 release 被標成 PASS，後續更嚴格的 evidence 發現仍有缺口。

因此 completion 必須來自 gate，而不是 Agent 的自然語言結論。
