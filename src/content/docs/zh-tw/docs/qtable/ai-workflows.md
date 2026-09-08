---
title: AI 工作流程
description: QTable 如何依既有產品模型與使用者控制組織 AI 規劃與執行流程。
---

QTable 的 AI 能力與手動操作共用 Table / View / Dashboard / Permission 模型。

典型路徑：

```text
描述目標
   ↓
產生 Workspace / Tables
   ↓
規劃任務
   ↓
估算工作量與排程
   ↓
建議負責人
   ↓
診斷專案風險
   ↓
預覽並套用動作
```

## Preview → Confirm → Apply

AI Action Plan 讓變更保持明確可控：

1. AI 只能讀取目前使用者有權看到的脈絡。
2. 產生結構化 Action Plan。
3. Preview 不修改業務資料。
4. 使用者可以檢查並只接受部分計畫。
5. Apply 會重新驗證權限以及樂觀/並行狀態。

## Provider 設定

目前程式碼支援 OpenAI-compatible 與 DeepSeek-compatible 路徑。API Key 透過應用內加密 AI 設定流程保存，而不是提交到原始碼。

不設定外部 AI Provider 時，核心表格功能仍可使用。
