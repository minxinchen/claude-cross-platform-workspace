# 代表性 Log：實驗狀態不等於 Production 狀態

## 問題

專案裡曾經做過 lightweight scroll-reveal experiment。幾週或幾個月後，如果只看到檔案、screenshots 或 test page，很容易把「這個實驗存在」誤記成「這個功能曾經正式上線」。

## 關鍵證據

在當時的 checkpoint：

- experimental page 可公開存取，但有 `noindex`
- test page 沒有 heavy slider runtime
- test marker 存在於 experiment
- production homepage **沒有** test marker
- production homepage 也沒有 test-page references

## 原本忽略的地方

**Repository 裡存在，不等於 production 曾經使用。**

prototype、test page、screenshot 與正式上線紀錄都是真實專案歷史，但它們代表不同狀態。

## 決策改變

- experiment state 與 production state 分開記錄
- 沒有 explicit release evidence，就不能把 prototype 寫成 shipped feature
- test URL 保持 isolated，避免進入 navigation 或 search indexing

## 為什麼這份 Log 重要

它的價值在於可以證明一件「沒有發生的事」：在該 checkpoint，scroll-reveal experiment 還不是 production homepage 的功能。

這能避免後續 Agent 在摘要歷史時，把「做過測試」加工成不存在的正式成果。