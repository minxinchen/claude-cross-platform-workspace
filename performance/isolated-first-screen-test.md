# 案例 1：首頁首屏效能優化

## 問題

Mobile 使用者約要等 13 秒，首頁主要第一屏內容才完成 Largest Contentful Paint。

## 材料與證據

使用 Lighthouse 建立 baseline，並檢查首頁首屏結構。可能原因包含：

- hosting / server response
- image weight
- WordPress overhead
- Smart Slider 3
- JavaScript / CSS
- cache behavior

## 方法

沒有直接修改正式首頁，而是另外建立隔離測試頁，只改一個主要變因：把第一屏 **Smart Slider 3** 換成 static lightweight hero，其餘頁面盡量維持可比較。

這樣可以回答一個具體問題：如果主機與大部分頁面內容不變，只拿掉首屏輪播，效能是否會大幅改善？

## 結果

| 狀態 | Mobile LCP |
|---|---:|
| 原始正式首頁 | 13.10s |
| 隔離 static hero 測試 | 3.16s |
| 重新設計後正式上線 | 2.72s |

只替換第一屏 slider，在正式改版前就讓 LCP 減少約 9.94 秒。同一輪正式上線量測中，Lighthouse Mobile Performance 約由 73 提升到 96。

## 解法

這個結果不支持把 hosting 當成主要瓶頸，因此實作方向改成：

- 不先把 hosting migration 當主要解法
- 移除第一屏 heavy slider runtime
- 使用 lightweight HTML / CSS 重建 hero
- 保留原本的背景、Logo、文案、CTA 與 responsive spacing
- richer interaction 另外測試，不讓實驗功能默默變成 production dependency

## 限制

Lighthouse 是 lab measurement，不等同真實使用者的 field Core Web Vitals。正式 Mobile LCP 2.72s 也不能寫成「完全沒有效能問題」，而應視為相較 baseline 的明顯改善。

## 為什麼保留這份 Log

大量 Lighthouse runs 是底層證據，但這份隔離測試真正改變了對問題原因的判斷，也改變了實作方向。未來 Agent 遇到同類問題時，應先讀這份代表性紀錄，再視需要往下查 raw Lighthouse evidence。
