---
title: 첨부 파일 스토리지
description: QTable의 프라이빗 S3 호환 첨부 스토리지 계약과 수명 주기.
---

첨부 파일은 공개 객체 URL이 아니라 프라이빗 애플리케이션 데이터입니다.

테이블 셀은 만료되는 URL이 아니라 안정적인 메타데이터를 보관합니다.

```text
attachmentId + objectKey + name + size + contentType
```

업로드·다운로드·삭제는 인증된 QTable API를 거치며 현재 Table / Row 권한을 재확인합니다.

## 런타임 설정

현재 스토리지 계약에는 다음이 포함됩니다.

- `ATTACHMENT_STORAGE_ENABLED`
- `ATTACHMENT_S3_ENDPOINT`
- `ATTACHMENT_S3_ACCESS_KEY`
- `ATTACHMENT_S3_SECRET_KEY`
- `ATTACHMENT_S3_BUCKET`
- `ATTACHMENT_S3_REGION` (선택)
- `ATTACHMENT_S3_SECURE`
- `ATTACHMENT_MAX_BYTES`
- 정리 배치/간격 설정
- `ATTACHMENT_UPLOAD_PENDING_GRACE_SECONDS`

## 수명 주기

소프트 삭제된 레코드는 첨부 객체를 보존하므로 복원할 수 있습니다. 영구 삭제 후 객체는 지속적인 백그라운드 정리에 들어갑니다. 업로드는 객체 스토리지에 쓰기 전에 지속적인 업로드 의도를 만들므로 중단된 업로드를 감지하고 회수할 수 있습니다.
