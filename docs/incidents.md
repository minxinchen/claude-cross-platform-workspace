# Incident / Evidence Reviews（去識別化案例）

這些案例不只是「發生過什麼錯」，而是保留真正改變下一步判斷的 high-information evidence。

每個案例都用同一個框架：

```text
Phenotype
→ Candidate explanations
→ High-information evidence
→ Overlooked variable
→ Decision change
→ New rule / gate
```

---

## Case 00：手機首頁約 13 秒，真正瓶頸不是主機

**Phenotype**：首頁 mobile first-screen LCP 約 13.10 秒。

**候選解釋**：hosting、圖片重量、WordPress、slider plugin、JavaScript / CSS、cache。

**高資訊量 evidence**：建立隔離測試頁，只把首屏 Smart Slider 3 換成 static lightweight hero，其餘頁面盡量維持可比較。Mobile LCP 從 13.10s 降到 3.16s。

**被忽略的變因**：首屏互動架構本身，比 hosting 更能解釋使用者為什麼要等這麼久。

**決策改變**：不把「換主機」當主要解法，先移除首屏重型 slider，再重新設計輕量 hero。

**Production evidence**：正式上線後 mobile LCP 約 2.72s。視覺仍保留背景、Logo、文字、CTA 與 responsive layout，但不恢復 slider runtime。

**教訓**：效能改善不能只看相關性。隔離單一變因的測試，才真正改變 implementation path。

---

## Case 01：三語「完成」其實只完成一語

**Phenotype**：繁中 Pillar page 正常，英文與簡中雖已有 URL、文章、H1、hreflang 等基礎結構，卻沒有相同的 Pillar HTML。

**高資訊量 evidence**：舊 gate 能證明 multilingual surfaces 存在，卻不能證明每個語言都存在等價 `.pillar` DOM。

**被忽略的變因**：release denominator 定義錯誤。URL/H1/hreflang 存在，不等於內容等價。

**Secondary modifier**：登入 WordPress 的瀏覽器可能看到新版，而匿名訪客仍命中 cache 舊版。

**決策改變**：不再接受從單一語言外推整個 multilingual ecosystem。

**新增 gate**：每個語言都必須逐一驗證唯一 H1、完整 Pillar DOM、頁內導覽、產品連結、FAQ、CTA、desktop/mobile overflow，並以 anonymous public output 為準。

**教訓**：AI 最危險的錯誤之一不是完全做錯，而是把「局部成功」合理化成「整體完成」。

---

## Case 02：產品主內容更新了，FAQ / JSON-LD 還活在舊世界

**Phenotype**：業主提供新版工程規格後，產品主內容已更新，但較早產生的 FAQ 與 machine-readable data 還保留上一版數值。

**高資訊量 evidence**：同一個 product fact 同時存在 visible body、FAQ、structured data、knowledge JSON 與 language variants。

**被忽略的變因**：更新一個 representation，不會自動 invalidates 其他衍生 representation。

**風險**：同一頁同時存在兩套產品事實，搜尋引擎、AI 與人類可能讀到不同答案。

**決策改變**：以 owner-confirmed registry 為最高 truth source，並把 derived content 一起納入 consistency verification。

**新增 gate**：產品規格 consistency validator、三語匿名公開頁驗證、legacy-value ban。

**教訓**：生成內容不是一次性任務。Truth source 更新後，衍生內容也需要 invalidation / regeneration。

---

## Case 03：Product Schema 不是越多越好

**Phenotype**：曾嘗試 Product / ProductModel structured data，但頁面沒有足夠的真實公開商業資料支撐 Product rich-result eligibility。

**高資訊量 evidence**：Google 的實際驗證結果，比「Schema 看起來很完整」更重要。

**被忽略的變因**：machine-readable completeness 與 rich-result eligibility 不是同一件事。

**Production decision**：不虛構 Offer、price、review、rating；移除不適合的 Product / ProductModel implementation，保留與公開頁一致的 Article、Breadcrumb、Organization 與 visible product content。

**教訓**：AIO 的目標不是讓 schema 數量增加，而是降低人類內容與機器內容之間的矛盾。

### 尚未執行的 Human hypothesis

另有一個仍未驗證的想法：是否只選一個產品作 experimental group，在不虛構商業欄位的前提下，強化 visible FAQ / semantic clarity，再與其他 unchanged products 比較後續 GSC 或 AI/search visibility。

狀態：**proposed / not executed / no evidence yet**。

這個 hypothesis 被保留，是因為 production zero-error 與 experimental information gain 是不同 objective。

---

## Case 04：Search Console 可以推翻本地的「看起來正常」

**Phenotype**：網站本地與公開 QA 可以通過，但第一方 Search Console indexing data 仍顯示一批 legacy redirects。

**高資訊量 evidence**：32 個 redirected URLs 中，大多是合理歷史行為，但 14 個清楚可對應新頁面的 legacy paths 卻錯誤 fallback 到語言首頁。

**被忽略的變因**：local PASS 不等於 search engine 對歷史 URL graph 的理解也正確。

**決策改變**：把 Search Console 從「成果報表」升級成 engineering reality check。

**處理**：對有明確現代等價頁的舊網址建立 relevant single-hop redirects，沒有明確對應者不強行猜測。

**教訓**：外部系統看到的網站狀態，可以成為新的 evidence，並推翻內部驗收假設。

---

## Case 05：做過實驗，不等於正式上線

**Phenotype**：專案中存在 scroll-reveal test page 與相關 screenshots / checks。

**高資訊量 evidence**：測試頁有 test marker、`noindex`，且不載入 heavy slider；同一 checkpoint 的 production homepage 明確沒有 test marker。

**被忽略的變因**：幾週或幾個月後，Agent 很容易把「repo 裡存在」誤記成「production 曾採用」。

**決策改變**：experiment state 與 production state 必須分開記錄，沒有 explicit release evidence 就不能說 shipped。

**教訓**：log 不只是證明「做了什麼」，也要能證明「沒有做什麼」。

---

## Case 06：已經 PASS，還是可以被新證據推翻

**Phenotype**：某次封板 checklist 顯示 PASS，後續更細的匿名與跨語言驗證發現漏同步問題。

**被忽略的變因**：PASS 只代表「當時那組 gate 沒找到問題」，不是永遠正確。

**決策改變**：保留舊 release evidence，不修改歷史；新增 incident review、stronger gate，再更新 current project state。

**教訓**：成熟的 Agent workflow 必須容許 evidence overturn earlier conclusions。
