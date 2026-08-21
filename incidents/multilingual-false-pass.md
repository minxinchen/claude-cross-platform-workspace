# 代表性 Log：三語 False PASS

## 問題

某次 multilingual release 已被描述成「完成」，但後續檢查發現只有一個語言真正存在完整 pillar content。

## 當時已經通過什麼

舊 release gate 並不是完全沒有檢查，它已經驗證：

- translated URLs
- H1
- articles
- hreflang
- schema
- visual cases

問題在於驗收的分母不完整。

## 關鍵證據

英文與簡中的 category URL 都存在，但 rendered pillar DOM 並沒有和繁中一樣完整。

同時還有第二個干擾變因：登入 WordPress 後可能看到新版內容，但 anonymous visitor 仍從 Breeze cache 取得舊版本。

## 原本忽略的地方

**有語言頁面，不等於有等價語言內容。**

舊流程其實默默做了這個錯誤推論：

```text
translated URL exists
        ↓
translated experience complete
```

實際上這兩件事不是同一件事。

## 決策改變

multilingual completion 不再只看 URL、H1 或 hreflang，而是要求每個語言逐一驗證 anonymous rendered result。

## 新的驗收條件

每個語言版本都要確認：

- unique H1
- complete pillar DOM
- expected in-page navigation
- same-language product links
- FAQ block
- same-language CTA
- no duplicate required IDs
- no horizontal mobile overflow
- cache purge 後的 anonymous public output

## 為什麼這份 Log 重要

真正值得留下的不是「漏了一個翻譯頁」，而是這份 evidence 找到了**驗收模型本身的問題**：原本量到的是 multilingual surface coverage，不是 multilingual content equivalence。

這個事件之後，「一個語言成功」不能再被外推成「整個三語網站成功」。