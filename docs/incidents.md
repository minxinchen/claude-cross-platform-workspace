# Incident Logs（去識別化案例）

這些案例保留原專案的工程教訓，但移除客戶名稱、網址與內部識別資訊。

## Incident 01：三語「完成」其實只完成一語

**現象**：繁中 Pillar page 正常，英文與簡中雖然已有 URL、文章、H1、hreflang 等基礎結構，卻沒有相同的 Pillar HTML。

**為什麼最初沒抓到**：舊 gate 驗證了 URL、H1、文章、hreflang、schema 與部分視覺，但沒有檢查每個語言版本是否真的存在 `.pillar` DOM 與完整內部結構。

**另一個干擾因素**：登入 WordPress 的瀏覽器看到新版，匿名訪客卻仍命中 cache 舊版。

**處理**：

- 不動已正常的繁中版本
- 對英文與簡中使用獨立 snippet
- purge cache
- 改用匿名 request 驗證
- 新增 multilingual pillar gate

**新增 gate**：每個語言都必須通過唯一 H1、完整 Pillar DOM、頁內導覽、產品連結、FAQ、CTA，以及 desktop/mobile overflow。

**教訓**：一個語言成功不能外推成整個 multilingual ecosystem 成功。

---

## Incident 02：產品主內容更新了，FAQ / JSON-LD 還活在舊世界

**現象**：業主提供新版工程規格後，產品主內容已更新，但較早產生的 FAQ 與 structured data 還保留上一版數值。

**風險**：同一頁同時存在兩套產品事實，搜尋引擎、AI 與人類訪客可能讀到不同答案。

**處理**：

- 以 owner engineering registry 為最高產品 truth source
- 只修改 stale FAQ / schema 區塊
- 保留已正確的主內容
- 加入產品規格 consistency validator
- 驗證三語匿名公開頁與 legacy-value ban

**教訓**：生成內容不是一次性任務。Truth source 更新時，所有衍生內容都需要 invalidation / regeneration。

---

## Incident 03：Product Schema 不是越多越好

**現象**：產品頁加入 Product / ProductModel 後，Google 實際測試仍把它視為 Product 類型，但頁面沒有真實公開的價格、Offer、review 或 rating。

**處理**：移除不具資格的 Product / ProductModel，保留 Article、Breadcrumb、Organization 與人類可見的產品內容。

**教訓**：AIO 的目標不是讓 schema 數量增加，而是讓 machine-readable information 和人類可見內容一致。

---

## Incident 04：已經 PASS，還是可以被新證據推翻

**現象**：某次封板 checklist 顯示 PASS，後續更細的匿名與跨語言驗證發現漏同步問題。

**處理**：保留舊 release evidence，不竄改歷史；建立新的 incident review 與 stronger gate，再更新 current project state。

**教訓**：PASS 是特定 gate 在特定時間的結果，不是永遠正確的真理。成熟的 Agent workflow 要允許 evidence overturn earlier conclusions。
