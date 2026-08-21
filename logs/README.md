# Logs as Decision Evidence

這個公開作品集不放原始客戶 log，而是示範如何把大量 work logs 壓縮成 Agent 真正需要的「決策記憶」。

## Raw log 不是重點，能改變判斷的 log 才是

原專案有大量 Lighthouse runs、HTML、screenshots、stderr、JSON、before/after snapshots。它們像程式裡的底層資料與測試 fixture：不可缺少，但不應全部塞進 Agent context。

真正優先載入的是能回答這四個問題的代表性 log：

1. **問題真正是什麼？**
2. **哪個 evidence 排除了原本可能的解釋？**
3. **哪個容易被忽略的變因讓舊結論失效？**
4. **因此下一步決策或 gate 改了什麼？**

## 建議的載入順序

```text
Question
   ↓
Project State
   ↓
Problem Class
   ↓
Evidence Map
   ↓
Representative Log
   ↓
Raw Evidence only if needed
```

Agent 不需要先讀幾千個檔案。先讀 `examples/evidence-map.example.json`，找出和目前問題最接近的 case。只有當摘要不足、證據互相衝突、或需要重新驗證時，才往下讀 raw evidence。

## 六種高資訊量案例

### 1. Homepage performance

- phenotype：mobile first-screen 約 13 秒
- 高資訊量 evidence：只把 slider 換成 lightweight hero，LCP 13.10s → 3.16s
- production：2.72s
- 被忽略變因：首屏互動架構，而不是 hosting 本身
- 決策：front-end structure first

### 2. False multilingual completion

- phenotype：三語 release 被標成完成
- 高資訊量 evidence：只有一語具備等價的 pillar DOM
- 被忽略變因：URL/H1/hreflang 存在，不等於內容等價
- 決策：逐語系 anonymous DOM gate

### 3. Product truth drift

- phenotype：正文已更新，但 FAQ / structured data 仍是舊值
- 被忽略變因：同一產品 fact 存在多個 representation
- 決策：owner-confirmed registry + consistency validator

### 4. External search reality check

- phenotype：本地與公開檢查看似健康，但 first-party search data 仍暴露 legacy URL 問題
- 被忽略變因：local PASS 不等於 search engine 對歷史 URL graph 的理解相同
- 決策：Search Console evidence 可以推翻本地假設

### 5. Experiment vs production

- phenotype：scroll-reveal 測試存在
- 高資訊量 evidence：test page 有 marker，但 production 沒有
- 被忽略變因：專案裡「做過」不等於「上線過」
- 決策：experiment state 與 production state 分開

### 6. AIO experiment hypothesis

- status：**proposed, not executed**
- Human hypothesis：只挑一個產品強化 visible FAQ / semantic clarity，不捏造 Offer / price / review / rating，再觀察後續差異
- Agent objection：原 objective 偏向 production Rich Results zero-error
- 被忽略變因：production validation 與 information-gain experiment 是不同 objective
- 決策：不全站 rollout，保留成可量測假設

## 原始 log 的角色

Raw evidence 仍然保留四類功能：

- **before evidence**：修改前狀態
- **change / rollback record**：做了什麼，以及如何恢復
- **after validation**：公開匿名結果與 deterministic checks
- **incident evidence**：新 evidence 推翻舊 PASS 時，保存根因與新規則

公開版本刻意不包含客戶網址、內部 WordPress ID、私有路徑、未公開工程資訊或可識別客戶的 screenshots。
