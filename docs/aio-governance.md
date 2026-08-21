# AIO：從「讓機器少猜」到可驗證假設

## 我怎麼理解 AIO

這個專案裡的 AIO 不是一開始就有完整答案，也不是「Schema 越多越好」。比較接近的問題是：

> 網站除了讓人看懂，能不能也讓搜尋引擎與 AI 更容易知道「這頁是什麼、產品是什麼、哪份資料才是真的」？

實際工作包含：

- 核心頁使用清楚的 H1 與第一段答案
- 把重要產品資訊放進 HTML，而不是只藏在圖片 / PDF
- 三語頁建立 canonical 與 reciprocal hreflang
- metadata 說清楚頁面的角色
- visible FAQ / pillar content 建立問題、答案與產品之間的關係
- 以 source-of-truth 控制產品資料
- 驗證 rendered DOM，而不是只相信 WordPress 後台設定
- 使用 GSC 觀察 Google 實際看到的 URL、indexing 與 search data

## Schema.org / JSON-LD 是什麼

可以把它理解成兩層：

- **Schema.org**：機器可共用的欄位字典，例如「這是產品」、「這是文章」、「這是組織」。
- **JSON-LD**：把這些欄位填成一份機器容易解析的資料格式。

它的價值不是保證排名上升，而是降低機器對頁面角色與資料關係的猜測空間。

## 一個重要反例：不是 Schema 越多越好

專案曾嘗試 Product / ProductModel structured data。Google 的實際驗證顯示，若頁面缺少符合 Product rich result 要求的真實公開商業資料，就不能為了通過驗證而捏造 Offer、price、review 或 rating。

Production-safe 的決策因此是：

- 不虛構商業欄位
- 移除不適合的 Product / ProductModel rich-result implementation
- 保留與公開頁一致的 Article、Breadcrumb、Organization 與 visible product content

原則：

> Structured data 不能比人類在頁面上看到的內容更「知道得多」。

## 但 Production policy 不等於所有實驗都結束

這裡出現過一個 Human 與 Agent 的真實分歧。

### Agent optimization target

原始要求很重視：

- Rich Results 不可以出 error
- 不補不存在的 Offer / price / review / rating
- 不應宣稱 unsupported schema 會直接提升排名

所以 Agent 傾向採取一致、保守、production-safe 的全站策略。

### Human hypothesis

Human 提出另一個尚未實作的想法：

> 是否只選一個產品當 experimental group，在不虛構 Offer、price、review、rating 的前提下，強化 visible FAQ、HTML 資訊結構與 semantic clarity，其他產品保持不變，再觀察後續 GSC 與 AI/search visibility 是否出現差異？

這不是已證明的 AIO 方法，也不是已完成成果。

目前狀態：**proposed / not executed / no evidence yet**。

保留這個 hypothesis 的原因是：

> Production validation 的 objective 是降低錯誤；Experiment 的 objective 是提高 information gain。兩者不一定相同。

## AIO 的真正邊界

### AI 可以做

- 從產品知識產生候選 FAQ
- 比對三語內容落差
- 產生內部連結建議
- 產生 schema draft
- 找出頁面與 truth registry 的矛盾
- 提出 measurable experiment design

### AI 不可以做

- 猜價格
- 猜庫存
- 猜產品性能
- 把 pending engineering field 改成 confirmed
- 因為「看起來合理」就補 Offer / review / rating
- 把未執行的 hypothesis 寫成已驗證成果

## 判準

這類 B2B 網站的技術準備可以量測：頁面是否可讀、資料是否一致、語言關係是否正確、Google 是否能索引、structured data 是否誠實。

但排名、AI 引用、品牌是否被摘要提及，屬於後續外部結果。沒有 evidence 時，不把「可能有幫助」寫成「已經提升」。
