---
title: Attachment storage
description: QTable's private S3-compatible attachment storage contract and lifecycle.
---

Attachments are private application data, not public object URLs.

A table cell stores stable metadata rather than an expiring URL:

```text
attachmentId + objectKey + name + size + contentType
```

Upload, download and delete operations go through authenticated QTable APIs and re-check the current table and row permission.

## Runtime settings

The current storage contract includes settings for:

- `ATTACHMENT_STORAGE_ENABLED`
- `ATTACHMENT_S3_ENDPOINT`
- `ATTACHMENT_S3_ACCESS_KEY`
- `ATTACHMENT_S3_SECRET_KEY`
- `ATTACHMENT_S3_BUCKET`
- optional `ATTACHMENT_S3_REGION`
- `ATTACHMENT_S3_SECURE`
- `ATTACHMENT_MAX_BYTES`
- cleanup batch / interval settings
- `ATTACHMENT_UPLOAD_PENDING_GRACE_SECONDS`

## Lifecycle

Soft-deleted rows retain attachment objects so restore remains possible. Permanent purge makes those objects eligible for durable background cleanup. Uploads use a durable intent before object-store writes so abandoned uploads remain discoverable for cleanup.
