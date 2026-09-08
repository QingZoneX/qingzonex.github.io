---
title: 附件存储
description: QTable 的私有 S3 兼容附件存储契约与生命周期。
---

附件属于私有应用数据，而不是公开对象 URL。

表格单元格保存稳定元数据，而不是会过期的 URL：

```text
attachmentId + objectKey + name + size + contentType
```

上传、下载和删除都通过已认证的 QTable API，并重新检查当前 Table 与 Row 权限。

## 运行时配置

当前存储契约包含：

- `ATTACHMENT_STORAGE_ENABLED`
- `ATTACHMENT_S3_ENDPOINT`
- `ATTACHMENT_S3_ACCESS_KEY`
- `ATTACHMENT_S3_SECRET_KEY`
- `ATTACHMENT_S3_BUCKET`
- 可选 `ATTACHMENT_S3_REGION`
- `ATTACHMENT_S3_SECURE`
- `ATTACHMENT_MAX_BYTES`
- Cleanup batch / interval 配置
- `ATTACHMENT_UPLOAD_PENDING_GRACE_SECONDS`

## 生命周期

Soft Delete 的记录保留附件对象，因此仍可 Restore。Permanent Purge 后，对象进入持久后台清理流程。上传会在对象存储写入之前建立持久 Upload Intent，因此异常中断的上传仍可被发现并回收。
