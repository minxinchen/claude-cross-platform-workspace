# 案例 3：產品正文更新了，FAQ / JSON-LD 還是舊資料

## 問題

業主提供新版工程規格後，visible product body 已經更新，但較早建立的 FAQ 與 machine-readable representations 還保留舊值。

## 材料與證據

同一個產品事實同時存在於：

- visible product body
- FAQ
- structured data / JSON-LD
- product knowledge JSON
- translated pages

問題不只是「有一個數字寫錯」，而是同一個 fact 有多個衍生版本。更新 main body 並不會自動讓其他資料失效或同步更新。

## 方法

先定義最高權威來源，再把其他內容視為 derived representations。

流程改成：

```text
owner-confirmed engineering data
        ↓
product body / FAQ / JSON-LD / knowledge JSON / translated pages
        ↓
consistency verification
```

對已知 obsolete values，必要時也加入 regression ban，避免舊值重新出現。

## 解法

- owner-confirmed engineering data 作為最高產品 truth source
- Agent 不可以在衝突資料中用「看起來比較合理」自行選答案
- truth source 更新時，同時檢查所有 derived representations
- product-spec consistency validator 比對公開頁、FAQ、machine-readable content 與 known legacy values

## 結果

產品資料更新不再被視為「正文改完就完成」，而改成一次完整的 dependency update。這降低了人看到新版、搜尋引擎或 AI 卻仍讀到舊值的風險。

## 限制

這個方法可以降低已知欄位的不一致，但仍依賴 upstream truth source 本身正確。如果業主資料尚未確認，就應保留 pending，而不是由 Agent 補成 confirmed。

## 為什麼保留這份 Log

真正改變流程的不是某個特定產品數字，而是理解到資料有 upstream / downstream dependency。只要 upstream truth 改變，舊的生成內容與複製內容就可能變成 stale data。
