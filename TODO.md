# 作品集整理 TODO

這份清單用來控制公開作品集的下一步，不再靠聊天記憶決定先後順序。原則是：**先讓讀者快速看懂目標與成果，再補方法與證據，最後才談 Agent 細節。**

## P0｜作品集主線

- [x] 將主題改成「B2B 工業網站 SEO × AIO 優化案例」
- [x] README 改成：目標 → 結果 → 材料與資料 → 方法 → 問題與解法 → 限制
- [x] 全中文敘事；技術棧、工具名與必要技術術語保留原文
- [x] 把 Human-AI collaboration 從主角移到方法與討論
- [x] 把 GSC 整體結果與 AI 摘要結果納入作品集
- [x] 保留 CTR、平均排名下降等不利結果，不做單向美化

## P1｜讓招聘者 60–90 秒看懂

- [x] README 已再縮短，方法與結果細節下沉到 docs
- [x] README 首屏已固定回答：目標、我的角色、代表結果、技術棧
- [x] 用 Mermaid 加入「材料與方法」流程圖
- [x] 用 Mermaid 加入「問題 → 證據 → 決策 → 結果」案例圖
- [x] 5 個主要問題保留短摘要，詳細內容連到 case / incident 文件
- [x] 新增 `docs/methods.md`，整理材料、資料來源、方法與驗證方式

## P1｜結果與證據

- [x] 新增 `docs/results.md`
- [x] 區分可直接歸因的技術結果、修改後外部趨勢、未驗證假設
- [x] 不直接公開原始 GSC screenshot，改做去識別化 `assets/gsc-summary.svg`
- [x] 新增 `assets/performance-summary.svg`，呈現 13.10s → 3.16s → 2.72s
- [x] 檢查 GSC 百分比、日期、樣本期間與文字是否一致
- [x] 將 GSC 結果標註為 observation，不宣稱單一 SEO / AIO 修改造成因果結果

## P1｜代表性問題案例

- [x] 首頁效能：Smart Slider 3 與首屏瓶頸
- [x] 三語內容：URL 存在不等於內容等價
- [x] 產品資料：正文更新但 FAQ / JSON-LD 殘留舊值
- [x] GSC：14 個舊網址錯誤導向首頁
- [x] Structured Data：不為 Rich Results 捏造 Offer / price / review / rating
- [x] 首頁效能案例統一成：問題 → 材料與證據 → 方法 → 解法 → 結果 → 限制
- [x] 三語案例統一成：問題 → 材料與證據 → 方法 → 解法 → 結果 → 限制
- [x] 產品資料案例統一成：問題 → 材料與證據 → 方法 → 解法 → 結果 → 限制
- [x] GSC redirect 案例統一成：問題 → 材料與證據 → 方法 → 解法 → 結果 → 限制
- [x] 公開敘事移除 `phenotype / modifier / high-information evidence` 等研究筆記式用語

## P2｜AIO 專題

- [x] 說明 Schema.org / JSON-LD 的作用與限制
- [x] 區分正式環境保守策略與未執行的單產品 AIO hypothesis
- [x] 將 AIO 工作整理成「讓搜尋引擎與 AI 少猜」的具體工作項目
- [x] 新增 H1、HTML 產品資訊、canonical / hreflang、FAQ / pillar、truth source、Schema、GSC 關係圖
- [ ] 未來若執行單產品 AIO experiment，先定義 baseline、control、observation window、success metric

## P2｜Agent / Log

- [x] 保留 representative logs，不公開原始客戶 workspace
- [x] 建立 evidence map 概念
- [x] 把 Agent / log 內容移到 README 後半與 docs，不與 SEO/AIO 目標搶主線
- [x] 代表性 log 只保留真正改變決策的案例
- [x] 檢查 evidence map 內的 representative log 路徑均對應真實檔案
- [x] 決定保留 `examples/evidence-map.example.json` 作為 Agent / log 方法的工程附錄，不放在作品集主線

## P2｜公開安全與一致性

- [x] 搜尋客戶名稱與網域，公開 repo 無命中
- [x] 搜尋已知私人工作路徑與內部 WordPress ID，公開 repo 無命中
- [x] 搜尋 `production-grade`、`guarantee` 等過度誇大用語，公開 repo 無命中
- [x] README 主要連結均對應現有檔案
- [x] README、`docs/methods.md`、`docs/human-ai-workflow.md` 再做中文化，減少非必要英文敘事
- [x] 檢查近期 commit messages，未出現客戶名稱或敏感識別資訊

## P3｜最後整理

- [x] README 再縮短成 portfolio landing page
- [x] 確認 `assets/gsc-summary.svg` 與 `assets/performance-summary.svg` 已存在於 main branch
- [ ] GitHub 實際頁面上的 SVG / Mermaid 視覺渲染仍需 UI 最終目視確認
- [ ] 若之後補更細 GSC 資料，再更新搜尋詞 / 頁面層級分析

## 受限事項｜需要手動處理

- [ ] **Repo 名稱仍是 `claude-cross-platform-workspace`，與作品集內容不符。** 現有連接器沒有 rename repository action。建議改成 `seo-aio-b2b-case-study`。
- [ ] **Repo description 仍是舊的「Claude Code 跨平台協作工作空間：Windows Claude + Ubuntu Claude」。** 現有連接器沒有修改 repository metadata 的 action。建議改成：`真實 B2B 工業網站 SEO × AIO 優化案例：效能、三語架構、Structured Data、GSC 與 AI Agent 協作。`
- [ ] GSC 搜尋詞 / 頁面層級深度分析需要更細的匯出資料，目前只有總覽與 AI 摘要比較資料。

## 完成定義

這個作品集完成時，第一次看到 repo 的人應能在 60–90 秒內回答：

1. 這個專案想解決什麼？
2. 使用了哪些資料與方法？
3. 遇到哪些真正的問題？
4. 我做了哪些判斷與修改？
5. 哪些結果可以量化？
6. 哪些結果仍不能宣稱因果？
7. AI Agent 在這裡究竟扮演什麼角色？
