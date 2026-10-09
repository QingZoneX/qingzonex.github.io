---
title: 添付ファイルストレージ
description: QTable のプライベートな S3 互換添付ストレージの契約とライフサイクル。
---

添付ファイルはプライベートなアプリケーションデータであり、公開オブジェクト URL ではありません。

テーブルのセルは期限切れする URL ではなく、安定したメタデータを保持します。

```text
attachmentId + objectKey + name + size + contentType
```

アップロード・ダウンロード・削除は認証済みの QTable API を通り、現在の Table / Row 権限を再確認します。

## ランタイム設定

現在のストレージ契約には以下が含まれます。

- `ATTACHMENT_STORAGE_ENABLED`
- `ATTACHMENT_S3_ENDPOINT`
- `ATTACHMENT_S3_ACCESS_KEY`
- `ATTACHMENT_S3_SECRET_KEY`
- `ATTACHMENT_S3_BUCKET`
- `ATTACHMENT_S3_REGION`（任意）
- `ATTACHMENT_S3_SECURE`
- `ATTACHMENT_MAX_BYTES`
- クリーンアップのバッチ／間隔設定
- `ATTACHMENT_UPLOAD_PENDING_GRACE_SECONDS`

## ライフサイクル

論理削除されたレコードは添付オブジェクトを保持するため Restore できます。恒久削除後はオブジェクトが永続的なバックグラウンドクリーンアップに入ります。アップロードはオブジェクトストレージに書き込む前に永続的なアップロード意図を作成するため、中断されたアップロードを検出して回収できます。
