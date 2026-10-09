---
title: 보안 모델
description: QTable의 권한, 인증, 공개 공유, AI, 프라이빗 첨부의 보안 경계.
---

QTable은 `qtable-server`를 데이터 보안의 최종 경계로 삼고, `qtable-web`은 현재 사용자에게 허용된 내용만 표시·실행합니다.

## 핵심 불변식

- Workspace·객체·행 수준 권한은 서버에서 실행해야 합니다.
- 검색, Dashboard 집계, AI 컨텍스트, 첨부 접근은 같은 권한 모델을 우회할 수 없습니다.
- AI 쓰기는 Preview → Confirm → Apply를 따르며 Apply 시 권한과 현재 상태를 재검증합니다.
- Public Dashboard 데이터는 게시자가 여전히 읽을 수 있는 범위로 계산됩니다.
- OAuth Public Client는 S256 PKCE를 사용합니다.
- 시크릿을 일반 테이블 필드·프런트 환경 변수·로그에 쓰면 안 됩니다.
- 프라이빗 첨부의 업로드·읽기·삭제·복원은 항상 권한을 재확인해야 합니다.

## 웹 컨테이너

`qtable-web`의 프로덕션 Nginx 이미지는 CSP, `X-Content-Type-Options`, `Referrer-Policy`, 클릭재킹 방지, 제한된 `Permissions-Policy`를 설정합니다. 공개 진입점은 리버스 프록시가 TLS, HTTP → HTTPS, HSTS를 담당해야 합니다.

## 프로덕션 권장 사항

공개 배포 전에 [`qtable-server/SECURITY.md`](https://github.com/QingZoneX/qtable-server/blob/main/SECURITY.md), [`qtable-web/SECURITY.md`](https://github.com/QingZoneX/qtable-web/blob/main/SECURITY.md), 배포 예정 버전의 릴리스 노트를 읽고 [프로덕션 체크리스트](../../getting-started/production-checklist/)를 완료하세요.
