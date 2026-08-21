# 假設：單一產品 AIO 實驗

## 狀態

**尚未執行 / 尚未驗證 / 目前沒有結果**

這份文件刻意不寫成成功案例。

## 問題

Production 階段的 Structured Data 決策偏向保守：不虛構 Offer、price、review、rating，也不使用無法由公開頁支持的 Product implementation。

但這並沒有完全回答另一個問題：

> 如果只改一個產品，而不是全站一起改，能不能把它當成 experimental group，觀察 AIO / search visibility 是否出現差異？

## 實驗假設

選一個產品，在不虛構商業資料的前提下，強化：

- visible FAQ
- HTML information structure
- semantic clarity

其他可比較產品盡量保持不變，再觀察後續：

- Google Search Console impressions / queries / indexing behavior
- search-result presentation
- 可觀察到的 AI/search summaries 或 citations

## Agent 當時的反對理由

原始 production objective 很重視：

- Rich Results 不可以出 error
- machine-readable information 必須和 visible content 一致
- 不應暗示 unsupported schema 會直接提升排名

因此 Agent 偏向一致、保守的 production policy。

這個判斷對 production safety 是合理的，但它沒有完全回答 experiment 的 information-gain question。

## 如果未來執行

1. 只選一個產品作 treatment。
2. 不虛構 Offer / price / inventory / review / rating。
3. visible content 與 machine-readable content 保持一致。
4. 實驗前先定義 observation window。
5. 其他可比較產品盡量保持不變。
6. 保存實驗前後 GSC / search / AI visibility evidence。
7. 不因為看到 correlation 就直接宣稱 causal effect。

## 為什麼保留未完成假設

因為專案不是一路線性成功。

production validation 的目標是降低已知錯誤；experiment 的目標是控制差異並取得新的資訊。人與 Agent 對這兩種目標可以有不同判斷。

如果未來沒有真正執行與取得 evidence，這一頁永遠只能叫「假設」，不能變成成果。