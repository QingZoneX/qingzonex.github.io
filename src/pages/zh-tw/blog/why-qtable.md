---
layout: ../../../layouts/BlogPostLayout.astro
title: "為什麼我又做了一個開源多維表格：QTable 想解決的其實不是「表格」問題"
description: "當 Airtable、Notion、飛書多維表格已經很成熟時，為什麼還值得做 QTable？這篇文章解釋 QTable 真正想構建的是怎樣的 AI Native 工作底座。"
date: "2026-09-13"
locale: "zh-tw"
slug: "why-qtable"
series: "構建 QTable：一個 AI Native 工作系統的設計與實作"
seriesIndex: 1
seriesTotal: 10
sourcePath: "src/pages/zh-tw/blog/why-qtable.md"
---

如果今天再做一個多維表格產品，最先遇到的問題大概不是技術，而是一個更直接的問題：**為什麼？**

Airtable 已經證明資料庫和表格之間存在巨大的產品空間；Notion 把資料庫嵌入文件與知識工作；飛書多維表格也已經把多檢視、自動化、協作與企業場景做得很成熟。

在這樣的市場裡，如果 QTable 的目標只是「再做一個支援 Grid、Kanban、Gantt 的開源表格」，那它很難形成真正有價值的差異。

所以在開發 QTable 的過程中，我越來越明確一件事：

> **QTable 想解決的其實不是表格問題，而是 AI 如何理解、組織並安全地執行真實工作的問題。**

多維表格只是目前我認為最適合承載這個問題的基礎資料模型。

## 從「設定一個工具」到「描述一個目標」

傳統專案管理或多維表格產品的典型路徑大致是：

```text
建立 Workspace
      ↓
建立 Table
      ↓
設計欄位
      ↓
設定 View
      ↓
輸入任務
      ↓
建立 Dashboard
      ↓
設定自動化
      ↓
開始工作
```

這套模型沒有錯，而且非常強大。

問題在於，它要求使用者在真正開始工作之前，先把自己的業務結構翻譯成軟體設定。

一個產品負責人腦中想的是：「下個月要發佈 1.0，我需要拆解需求、安排負責人、判斷工作量、找到關鍵風險，並隨時知道專案是否會延期。」

但軟體通常先要求他回答：要建幾張表、哪些欄位是 Select 或 Relation、Kanban 按什麼分組、Gantt 的日期從哪裡來、Dashboard 要聚合哪些指標。

這中間存在很大的**意圖到結構的翻譯成本**。

大模型第一次讓我們有機會重新設計這條路徑：

```text
描述目標
      ↓
理解目前業務脈絡
      ↓
產生 Workspace / Table / View
      ↓
拆解任務與相依關係
      ↓
估算工作量與時間
      ↓
建議負責人
      ↓
產生 Dashboard
      ↓
診斷專案風險
      ↓
Preview Changes
      ↓
Human Confirm
      ↓
Apply
```

關鍵不是「AI 幫你建了一張表」，而是：**使用者開始從描述目標出發，而不是從設定軟體出發。**

## AI Native 不是在右下角加一個聊天框

最容易實作的 AI Assistant，是把目前頁面的資料組成 Prompt，送給模型，再把回答顯示在 Chat 面板。

這當然有價值，但我並不認為這就叫 AI Native。

如果 AI 只能回答「這個專案有哪些風險？」，卻不能在使用者確認之後真正建立缺失任務、修改負責人、調整排程、建立檢視或產生 Dashboard，那它仍然只是位於業務系統旁邊的助手。

真正困難的問題不是模型會不會生成文字，而是：

> **AI 能不能成為業務系統中的一個受約束執行者？**

## 為什麼多維表格適合作為 Agent 的業務底座

Agent 如果要執行真實工作，首先需要足夠明確的世界模型。

純文件很靈活，但文件中的「任務」「成員」「狀態」「截止日期」很多時候只是自然語言。傳統資料庫非常結構化，但一般使用者很難直接操作 Schema、Join、Constraint 和 Query。

多維表格恰好處在兩者中間：對使用者仍然是熟悉的表格與檢視；對系統則提供清楚的結構。

```text
Workspace
  └─ Table
      ├─ Field
      ├─ Record
      ├─ Relation
      ├─ Formula
      └─ View
          ├─ Grid
          ├─ Kanban
          ├─ Gantt
          ├─ Calendar
          └─ Gallery
```

當任務擁有結構化的 `status`、`assignee`、`priority`、`startDate`、`dueDate` 和關聯欄位後，AI 面對的不再是一段模糊文字，而是可查詢、驗證與操作的業務物件。

從 Agent 的角度看：

```text
Natural Language
      ↓
Structured Intent
      ↓
Structured Business Model
      ↓
Validated Action
```

比「自然語言 → 更多自然語言」更接近真正的工作。

## View 不應該成為第二份資料

Grid、Kanban、Gantt、Calendar、Gallery 看起來是不同體驗，但它們不應各自擁有獨立任務資料。

QTable 更希望把它們理解成**同一份結構化資料的不同投影**：

```text
                 ┌─ Grid
                 ├─ Kanban
Table / Records ─┼─ Gantt
                 ├─ Calendar
                 └─ Gallery
```

因此在 Kanban 拖動任務，本質上是修改結構化欄位；在 Gantt 調整排程仍然回到相同 Record；AI 建立任務後不需要再同步多套資料；Dashboard 也從同一套權限與資料模型聚合。

當 AI 參與系統後，「一份事實，多種檢視」會更加重要。

## 我不希望 AI 繞過既有產品模型

一種很誘人的做法，是專門為 AI 做一套快捷接口，直接修改資料庫。短期很快，長期卻會形成兩套規則：人工操作的一套，AI 操作的另一套。

接著就會出現權限不一致、稽核缺失、資料驗證不同、併發狀態過期與自動化行為不一致等問題。

所以 QTable 希望 AI 與人工操作共用同一套 Table、View、Dashboard、Permission 與 ChangeSet 模型。

> **AI 不應該獲得一條繞過產品規則的「超級管理員捷徑」。**

它只是另一種發起業務操作的方式。

## 為什麼堅持 Preview → Confirm → Apply

當 AI 只能生成文字時，犯錯可能只是一段錯誤回答；當 AI 可以修改業務資料，錯誤成本完全不同。

因此 QTable 的 AI 寫入流程希望遵守：

```text
Understand
   ↓
Plan
   ↓
Preview
   ↓
Human Confirm
   ↓
Revalidate Permission / State
   ↓
Apply
   ↓
Audit
```

Preview 不是 UI 動畫，而是系統邊界。使用者應該看到 AI **準備做什麼**，而不是在 AI **已經做完之後**再尋找 Undo。

真正 Apply 時仍要重新檢查目前權限與業務狀態，因為 Preview 到 Apply 之間資料可能已經改變。

## Agent 真正缺少的往往不是更大的模型，而是 Context

使用者說「幫我看看這個專案為什麼延期」時，AI 至少需要知道目前使用者、Workspace、Table / View、Project / Task、團隊成員、資料可見範圍、最近事件與先前對話。

所以 QTable 後來逐漸形成 Context Engine，把 User、Project、Table、Task、Team、Organization、View、Session / Conversation 等脈絡統一起來。

這讓我越來越相信：

> **Agent 產品體驗的核心競爭力，很可能不是 Prompt Engineering，而是 Context Engineering。**

## 開源不是發佈方式，而是產品約束

對一個未來可能讀取專案、成員、文件、任務甚至呼叫外部 Skill 的 AI 工作系統，信任本身就是產品的一部分。

使用者應該知道資料存在哪裡、AI 能看到什麼、權限在哪裡檢查、金鑰如何保存、Docker 映像從哪個 commit 建構、依賴是否有已知漏洞、產物是否有 SBOM 與 provenance，以及一次 AI 修改經過哪些業務規則。

因此開源反過來要求 QTable 把一些「能跑就行」的工程問題變成明確契約，包括 dependency audit、license policy、容器掃描、SBOM、provenance、CI contract 與 full-stack release gate。

## QTable 現在是什麼，又不是什麼

QTable 目前仍在 Alpha 階段。它已經是公開開源專案，但「Repository Public」不等於「產品已經成熟」。大表效能、即時增量、模板品質、Agent Runtime、Context freshness、權限邊界與生態整合都還有很多工作。

目前更重要的是驗證一個架構判斷：

> **如果把結構化工作資料、權限系統、上下文引擎與可稽核的 Agent Runtime 放在同一套產品模型裡，我們能不能讓 AI 從「告訴你應該怎麼做」，逐漸變成「在你控制下把事情真正做完」？**

這才是我繼續做 QTable 的主要原因。

## 接下來這個系列會寫什麼

後續文章會繼續討論 Preview → Confirm → Apply、Context Engine、Multi Tool Chain Runtime、多檢視資料模型、Agent 權限、私有附件、Identity Contract，以及一個 Side Project 真正開源所需要的供應鏈與 CI 工程。

QTable 的後端與 Web 前端都已公開：

- [QingZoneX/qtable-server](https://github.com/QingZoneX/qtable-server)
- [QingZoneX/qtable-web](https://github.com/QingZoneX/qtable-web)

程式碼比宣傳文案更能說明一個產品真正相信什麼。
