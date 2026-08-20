# AIO Governance：把「讓 AI 看懂」變成可驗證工程

## AIO 在這個專案裡是什麼

AIO 不是單純增加關鍵字或塞更多 Schema，而是讓搜尋引擎與 AI 系統更容易取得一致、可引用、可驗證的資訊。

實際工作包含：

- 核心頁要有明確 H1 與第一段答案
- 產品規格從圖片／PDF 搬到 HTML 可讀內容
- 三語頁建立 canonical 與 reciprocal hreflang
- 產品、文章、分類頁的 metadata 各自說清楚用途
- 建立 FAQ 與 pillar page，讓問題、答案、產品之間有清楚連結
- 用 source-of-truth 控制產品資料，避免 AI 把舊值或猜測寫回網站
- 驗證 rendered DOM，而不是只看原始設定

## 一個重要反例：不是 Schema 越多越好

專案曾嘗試 Product / ProductModel structured data。Google 的實際測試顯示，在沒有真實公開的 price、Offer、review、rating 等商業資料時，強行做 Product rich result 會造成不合格或誤導。

最後的決策是移除不具資格的 Product / ProductModel，保留與公開頁一致的 Article、Breadcrumb 與 Organization。

原則：

> Structured data 不能比人類在頁面上看到的內容更「神通廣大」。

## AIO 的真正邊界

### AI 可以做

- 從產品知識庫產生候選 FAQ
- 比對三語內容落差
- 產生內部連結建議
- 產生 schema draft
- 找出頁面與 truth registry 的矛盾

### AI 不可以做

- 猜價格
- 猜庫存
- 猜產品性能
- 把 pending engineering field 改成 confirmed
- 因為「看起來合理」就補 Offer / review / rating

## 最終判準

對這類 B2B 網站，AIO 成功的第一步不是「AI 摘要有沒有提到品牌」，而是讓網站先具備：

1. 清楚的 entity
2. 穩定的 product facts
3. 可讀的 HTML
4. 一致的三語關係
5. 真實的 structured data
6. 可回溯的 evidence

排名與 AI 引用屬於後續外部結果，不能反過來破壞資料誠實性。
