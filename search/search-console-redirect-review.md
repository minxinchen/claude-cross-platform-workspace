# 案例 4：用 Google Search Console 找到本地 QA 看不到的舊網址問題

## 問題

網站本地檢查與 anonymous public QA 看起來健康，但 GSC Page Indexing 仍顯示一批 redirected legacy URLs。

## 材料與證據

總共檢視 32 個 redirected URLs：

- 多數是合理的歷史 redirect、HTTP/www normalization、WordPress path 或原本就正確的舊網址
- 其中 **14 個** legacy paths 有清楚的 modern equivalent，卻錯誤 fallback 到語言首頁

這代表現在的網站 navigation 即使正常，crawler、舊搜尋結果或歷史外部連結仍可能走到錯誤目的地。

## 方法

把 GSC 當成外部驗證資料，而不是只看 impressions / clicks 的成果 dashboard。

處理方式是先分類：

1. 合理歷史 redirect
2. HTTP / www normalization
3. 已經正確的舊網址轉址
4. 有明確新頁面、但錯誤 fallback 到首頁的 legacy path
5. 沒有清楚 modern equivalent 的舊網址

## 解法

- 只修有明確 modern equivalent 的 legacy path
- 使用 relevant single-hop redirects
- 沒有清楚對應頁面的舊網址不硬猜
- 修正後重新檢查 redirect target、HTTP status、canonical 與 H1
- 不宣稱 GSC 會同日更新，因為 indexing data 有時間延遲

## 結果

14 個有明確對應頁的錯誤 legacy redirects 被修正，不再全部回到語言首頁。

更重要的是，GSC 在專案裡從「搜尋成果報表」變成一種 external validation source，可以補上 local QA 看不到的 historical URL behavior。

## 限制

GSC report 反映的是 Google 已收集到的資料，具有時間延遲。production 修正完成後，Page Indexing 數字不會立刻同步下降，因此結果必須等待 recrawl / refresh 後再觀察。

## 為什麼保留這份 Log

這個問題不是靠目前頁面本身找到的，而是由 Google first-party data 暴露出來。它改變了 GSC 在工作流程中的角色，也改變了後續網址驗收方式。
