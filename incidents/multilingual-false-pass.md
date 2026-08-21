# 案例 2：有三語頁面，不代表三語內容真的完成

## 問題

某次 multilingual release 已被描述成「完成」，但後續檢查發現只有一個語言真正存在完整 pillar content。

## 材料與證據

舊 release gate 已經驗證：

- translated URLs
- H1
- articles
- hreflang
- schema
- visual cases

但英文與簡中的 category URL 雖然存在，rendered pillar DOM 並沒有和繁中一樣完整。

另外還有一個干擾因素：登入 WordPress 後可能看到新版內容，但 anonymous visitor 仍從 Breeze cache 取得舊版本。

## 方法

重新定義「三語完成」的驗收分母，不再只確認頁面是否存在，而是逐語言檢查實際 rendered result。

新的檢查範圍包含：

- unique H1
- complete pillar DOM
- expected in-page navigation
- same-language product links
- FAQ block
- same-language CTA
- no duplicate required IDs
- no horizontal mobile overflow
- cache purge 後的 anonymous public output

## 解法

multilingual completion 不再接受「一個語言成功，所以三語都成功」的外推。每個語言版本都必須獨立通過公開 anonymous 驗證。

## 結果

重新驗證後，三語 desktop 與 mobile 的 pillar 結構、導航、產品連結、FAQ、CTA 與 overflow 都被納入相同驗收條件，後續也新增 deterministic multilingual gate。

## 限制

這個案例證明的是原本驗收模型不完整，並不代表只要增加更多 checks 就能自動保證所有內容品質。語意品質與翻譯品質仍需要人或更高層次的 semantic review。

## 為什麼保留這份 Log

真正重要的不是「漏了一個翻譯頁」，而是找到原本 validation metric 的缺口：**page exists 不等於 content equivalent**。這個判斷直接改變後續三語 release 的驗收方式。
