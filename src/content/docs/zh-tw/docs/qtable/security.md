---
title: 安全模型
description: 權限、AI、附件、公開 Dashboard 與 OAuth 流程的重要安全不變條件。
---

QTable 的安全模型屬於應用架構的一部分，而不是前端約定。

## 重要不變條件

- AI 脈絡必須遵守目前使用者的列可見性。
- Preview 不得修改業務資料。
- Apply 必須重新驗證權限以及樂觀/並行狀態。
- Member 值必須指向目前 Workspace 成員。
- Attachment 值必須解析到綁定同一 Table、Row 與 Attachment Field 的有效 Registry 項目。
- 直接 URL 或 presigned URL 不能作為持久附件資料。
- 附件讀取會重新檢查目前 Table + Row 權限，並以 `private, no-store` 提供。
- Public Dashboard 資料依發佈者目前仍可讀取的資料範圍計算。
- OAuth Public Client 使用 S256 PKCE。
- Secret 不得寫入一般表格欄位或 Log。

## 正式環境建議

對網際網路開放部署前，請閱讀儲存庫最新 [`SECURITY.md`](https://github.com/QingZoneX/QTable/blob/main/SECURITY.md) 與計畫部署版本的 Release Notes。
