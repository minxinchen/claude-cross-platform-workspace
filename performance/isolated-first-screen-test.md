# 代表性 Log：首頁首屏效能隔離測試

## 問題

Mobile 使用者約要等 13 秒，首頁主要第一屏內容才完成 Largest Contentful Paint。

## 可能原因

- hosting / server response
- image weight
- WordPress overhead
- Smart Slider 3
- JavaScript / CSS
- cache behavior

## 關鍵實驗

沒有直接修改正式首頁，而是另外建立隔離測試頁，只改一個主要變因：

> 把第一屏 **Smart Slider 3** 換成 static lightweight hero，其餘頁面盡量維持可比較。

## 結果

| 狀態 | Mobile LCP |
|---|---:|
| 原始正式首頁 | 13.10s |
| 隔離 static hero 測試 | 3.16s |
| 重新設計後正式上線 | 2.72s |

只替換第一屏 slider，在正式改版前就讓 LCP 減少約 9.94 秒。

同一輪正式上線量測中，Lighthouse Mobile Performance 約由 73 提升到 96。

## 判斷

這個結果不支持把 hosting 當成主要瓶頸。

第一屏的 interaction / rendering structure 對使用者等待時間的影響更大。也就是說，真正需要先改的不是基礎設施，而是首屏的載入方式。

## 決策

- 不先把 hosting migration 當主要解法
- 移除第一屏 heavy slider runtime
- 使用 lightweight HTML / CSS 重建 hero
- 保留原本想要的背景、Logo、文案、CTA 與 responsive spacing
- richer interaction 另外測試，不讓實驗功能默默變成 production dependency

## 為什麼這份 Log 比大量原始 Lighthouse 檔案更重要

幾十份 Lighthouse runs 可以證明數值，但這份隔離測試做了更重要的事：**它改變了對問題原因的判斷，因此也改變了實作方向。**

未來 Agent 處理 performance 問題時，應先讀這份代表性紀錄；只有需要重新查證數值、環境或 outlier 時，才往下讀 raw Lighthouse evidence。