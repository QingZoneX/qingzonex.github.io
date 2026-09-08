---
title: 附件儲存
description: QTable 的私有 S3 相容附件儲存契約與生命週期。
---

附件屬於私有應用資料，而不是公開物件 URL。

表格儲存格保存穩定中繼資料，而不是會過期的 URL：

```text
attachmentId + objectKey + name + size + contentType
```

上傳、下載與刪除都透過已驗證的 QTable API，並重新檢查目前 Table 與 Row 權限。

## 執行階段設定

目前儲存契約包含：

- `ATTACHMENT_STORAGE_ENABLED`
- `ATTACHMENT_S3_ENDPOINT`
- `ATTACHMENT_S3_ACCESS_KEY`
- `ATTACHMENT_S3_SECRET_KEY`
- `ATTACHMENT_S3_BUCKET`
- 可選 `ATTACHMENT_S3_REGION`
- `ATTACHMENT_S3_SECURE`
- `ATTACHMENT_MAX_BYTES`
- Cleanup batch / interval 設定
- `ATTACHMENT_UPLOAD_PENDING_GRACE_SECONDS`

## 生命週期

Soft Delete 的記錄保留附件物件，因此仍可 Restore。Permanent Purge 後，物件進入持久背景清理流程。上傳會在物件儲存寫入前建立持久 Upload Intent，因此異常中斷的上傳仍可被發現並回收。
