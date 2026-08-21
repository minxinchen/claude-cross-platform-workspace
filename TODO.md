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

- [ ] 縮短 README，將細節下沉到 docs
- [ ] README 首屏固定只回答四件事：目標、我的角色、代表結果、技術棧
- [ ] 用 Mermaid 加入一張「材料與方法」流程圖
- [ ] 用 Mermaid 加入一張「問題 → 證據 → 決策 → 結果」案例圖
- [ ] 將 5 個主要問題改成短摘要卡式段落，詳細內容連到 incident / performance 文件
- [ ] 新增一份獨立的 `docs/methods.md`，整理材料、資料來源、方法與驗證方式

## P1｜結果與證據

- [x] 新增 `docs/results.md`
- [x] 區分可直接歸因的技術結果、修改後外部趨勢、未驗證假設
- [ ] 將兩張去識別化 GSC 截圖放入 `assets/`，README / results 直接引用
- [ ] 補一張首頁效能 13.10s → 3.16s → 2.72s 的簡潔視覺
- [ ] 檢查所有百分比、日期、樣本期間與文字是否一致
- [ ] 將 GSC 結果標註為 observation，不宣稱單一 SEO / AIO 修改造成因果結果

## P1｜代表性問題案例

- [x] 首頁效能：Smart Slider 3 與首屏瓶頸
- [x] 三語內容：URL 存在不等於內容等價
- [x] 產品資料：正文更新但 FAQ / JSON-LD 殘留舊值
- [x] GSC：14 個 legacy redirects 錯誤導向首頁
- [x] Structured Data：不為 Rich Results 捏造 Offer / price / review / rating
- [ ] 將每個案例統一成：問題 → 材料/證據 → 方法 → 解法 → 結果 → 限制
- [ ] 刪除過度像研究筆記的 `phenotype / modifier / high-information evidence` 公開用語，保留概念但換成人話

## P2｜AIO 專題

- [x] 說明 Schema.org / JSON-LD 的作用與限制
- [x] 區分 production-safe policy 與未執行的單產品 AIO hypothesis
- [ ] 將 AIO 工作重新整理成「讓搜尋引擎與 AI 少猜」的具體工作項目
- [ ] 補上 H1、HTML 產品資訊、canonical / hreflang、FAQ / pillar、truth source、GSC 的關係圖
- [ ] 未來若執行單產品 AIO experiment，先定義 baseline、control、observation window、success metric

## P2｜Agent / Log

- [x] 保留 representative logs，不公開原始客戶 workspace
- [x] 建立 evidence map 概念
- [ ] 把 Agent / log 內容移到 README 後半或 docs，不與 SEO/AIO 目標搶主線
- [ ] 代表性 log 只保留真正改變決策的案例
- [ ] 檢查 evidence map 路徑是否全部能指到真實檔案

## P2｜公開安全與一致性

- [ ] 全 repo 搜尋客戶名稱、網址、聯絡資訊、內部 WordPress ID、私人路徑
- [ ] 全 repo 搜尋過度誇大的字眼：`production-grade`、`guarantee`、`AIO ranking improvement` 等
- [ ] 檢查所有 README links 是否可用
- [ ] 檢查中英文用語一致性與檔名可讀性

## 受限事項

- [ ] Repo 名稱目前仍是 `claude-cross-platform-workspace`，與內容不符；若連接器無 rename repository 權限，需要手動改名。建議名稱：`seo-aio-b2b-case-study` 或 `evidence-driven-seo-aio-case-study`。
- [ ] GSC query/page-level 深度分析需要更細的匯出資料，目前只有總覽與 AI 摘要比較資料。

## 完成定義

這個作品集完成時，第一次看到 repo 的人應能在 60–90 秒內回答：

1. 這個專案想解決什麼？
2. 使用了哪些資料與方法？
3. 遇到哪些真正的問題？
4. 我做了哪些判斷與修改？
5. 哪些結果可以量化？
6. 哪些結果仍不能宣稱因果？
7. AI Agent 在這裡究竟扮演什麼角色？
