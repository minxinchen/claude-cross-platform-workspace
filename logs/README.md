# Logs

這個公開作品集不放原始客戶 log，而是保留 log 的設計原則與去識別化 incident 摘要。

原專案的 log 主要分成：

- **before evidence**：修改前公開狀態
- **change record**：修改了什麼、在哪裡改、如何回滾
- **after validation**：匿名公開請求與 deterministic gate 結果
- **incident review**：如果原本的 PASS 被新 evidence 推翻，記錄根因與新增的永久防呆
- **project state**：只保留目前階段、完成率、下一步、驗收條件與來源

公開版本刻意不包含客戶網址、內部 WordPress ID、私有檔案路徑或未發布工程資訊。
