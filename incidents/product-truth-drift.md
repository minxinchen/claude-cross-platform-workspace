# 代表性 Log：產品資料漂移

## 問題

業主提供新版工程規格後，visible product body 已經更新，但較早建立的 FAQ 與 machine-readable representations 還保留舊值。

## 關鍵發現

問題不只是「有一個數字寫錯」。真正重要的是：同一個產品 fact 同時存在很多 representation。

- visible product body
- FAQ
- structured data / JSON-LD
- product knowledge JSON
- translated pages

更新 main body 並不會自動讓其他衍生資料失效或同步更新。

## 原本忽略的地方

**一個產品事實可以有很多份 stale copy。**

所以人看頁面正文時可能覺得已經正確，但搜尋引擎或 AI 讀到 FAQ / JSON-LD 時仍可能取得另一套答案。

## 決策改變

- owner-confirmed engineering data 作為最高產品 truth source
- Agent 不可以在衝突資料中用「看起來比較合理」自行選答案
- truth source 更新時，同時檢查所有 derived representations
- 對已知 obsolete values，在 regression checks 中加入禁止條件

## 新的驗證方式

product-spec consistency validator 會把 authoritative registry 和以下內容一起比對：

- public language pages
- FAQ
- machine-readable content
- known legacy values

## 為什麼這份 Log 重要

真正改變流程的不是某個特定產品數字，而是理解到**資料有 upstream / downstream dependency**。

只要 upstream truth 改變，舊的生成內容與複製內容就可能變成 stale data，因此需要一起 invalidation / verification。