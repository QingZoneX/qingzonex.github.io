---
title: 프로덕션 체크리스트
description: "QTable v0.1.1-alpha 셀프 호스팅 배포를 평가할 때 수행해야 할 실질 점검."
---

`v0.1.1-alpha`는 오픈소스 프리뷰 Git 태그입니다. QTable을 실제 사용자에게 공개하기 전에 프로덕션 토폴로지와 일치하는 환경에서 아래 점검을 완료하세요.

## 버전과 출처

- [ ] `qtable-server`와 `qtable-web`이 공동 검증된 `v0.1.1-alpha` 태그 또는 더 명시적인 정확한 commit을 사용.
- [ ] 소스 Compose인 경우 두 저장소가 나란히 있고 `.env`에 `QTABLE_UI_CONTEXT=../qtable-web` 설정.
- [ ] 빌드된 이미지인 경우 대상 태그가 레지스트리에 실재함을 확인하고 digest를 기록.
- [ ] "Git 태그 공개"를 "GitHub Release / 안정 배포물 공개"로 오해하지 않기.

## 설정과 시크릿

- [ ] `APP_ENV=production`
- [ ] 기본 `SECRET_KEY`, DB 비밀번호, 객체 스토리지 자격 증명 변경.
- [ ] 안정적이고 올바른 형식의 Fernet `ENCRYPTION_KEY`를 설정하고 여러 인스턴스가 같은 키 공유.
- [ ] OAuth plain PKCE, 동적 클라이언트 등록, 비밀번호 재설정 디버그 토큰 비활성 유지.
- [ ] 공급자 API 키를 프런트 환경 변수·일반 테이블 필드·로그에 넣지 않기.

## 네트워크와 브라우저 보안

- [ ] Web / 리버스 프록시 진입점만 공개하고 API, PostgreSQL, Redis, MinIO 관리면은 사설망 또는 루프백 유지.
- [ ] TLS, HTTP → HTTPS, HSTS 설정.
- [ ] qtable-web의 CSP, X-Content-Type-Options, Referrer-Policy, 프레임 방지, Permissions-Policy가 외부 프록시로 약화되지 않았는지 확인.

## 제품 한 바퀴

1. 로그인하여 Workspace / 객체 / 행 수준 권한 검증.
2. Grid, Kanban, Gantt, Calendar, Gallery에서 대표적인 읽기/쓰기 경로 실제 실행.
3. Dashboard 집계, 공개 공유, 권한 변경 후 접근 동작 검증.
4. 첨부 업로드/다운로드와 권한 상실 후 거부 검증.
5. Recycle Bin Restore / Purge 검증.
6. 최소 하나의 자동화 규칙과 실행 기록 검증.
7. AI를 활성화한 경우 Preview → Confirm → Apply와 권한 재검증 확인.
8. 비프로덕션 사본에서 PostgreSQL + 객체 스토리지 백업과 복원을 1회 실제 실행.

Alpha 단계의 백업·복원·업그레이드 Runbook은 계속 보완됩니다. 프로덕션 배포는 실제 복원 훈련, 버전 고정, 업그레이드 롤백 검증을 출시 전제로 삼아야 하며 "백업 파일 존재" 확인만으로는 부족합니다.
