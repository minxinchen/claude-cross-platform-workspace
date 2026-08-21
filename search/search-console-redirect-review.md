# 代表性 Log：用 Google Search Console 檢查網站外部狀態

## 問題

網站本地檢查與 anonymous public QA 看起來健康，但 GSC Page Indexing 仍顯示一批 redirected legacy URLs。

## 關鍵發現

總共檢視 32 個 redirected URLs：

- 多數是合理的歷史 redirect、HTTP/www normalization、WordPress path 或原本就正確的舊網址
- 其中 **14 個** legacy paths 有清楚的 modern equivalent，卻錯誤 fallback 到語言首頁

## 原本忽略的地方

**目前網站看起來正常，不代表搜尋引擎看到的歷史 URL graph 也正常。**

現在的 navigation 可以完全沒有問題，但 crawler、舊搜尋結果或歷史外部連結仍可能走到錯誤目的地。

## 決策改變

- 把 Google Search Console 當成 engineering evidence，不只當成果 dashboard
- 先分類合理 redirect 與真正錯誤 fallback
- 只修有明確 modern equivalent 的 legacy path
- 使用 relevant single-hop redirects
- 沒有清楚對應頁面的舊網址不硬猜
- 修正後不宣稱 GSC 會同日更新，因為 indexing data 有時間延遲

## 為什麼這份 Log 重要

這個問題不是靠目前網站頁面本身找到的，而是由 Google 的 first-party data 暴露出來。

因此 GSC 在這個專案裡從「看曝光與點擊的報表」變成另一種外部驗證資料，可以補上 local QA 看不到的歷史 URL 行為。