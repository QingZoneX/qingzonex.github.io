---
title: QTable 제품 개요
description: "QTable v0.1.1-alpha의 전체 기능과 qtable-web·qtable-server의 구현 경계."
---

QTable은 완전한 AI 네이티브 오픈소스 프로젝트·업무 관리 제품입니다. **웹 프런트와 서버가 함께 하나의 QTable을 구성하며**, Table / Record / View / Dashboard / Permission 모델을 공유합니다.

현재 코드는 두 개의 공개 저장소로 관리됩니다.

- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — QTable Web App
- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — API, 도메인 서비스, 데이터 보안 경계

## QTable Web App

`qtable-web`은 현재 다음을 제공합니다.

- Home / My Work / Projects Center
- Grid / Kanban / Gantt / Calendar / Gallery
- Dashboard Center / Workbench
- Automation Center와 실행 기록
- Notification Center, 레코드 작업 공간, Activity, 실시간 경로
- 권한을 반영한 전체 검색과 Recycle Bin
- AI Planning, Project Steward, 안전한 액션 플랜, Source Inbox

## QTable API & Domain Services

`qtable-server`는 다음을 담당합니다.

- 필드, 레코드, 필터, 정렬, 그룹, 이름 있는 보기, Task Profile
- Workspace·객체·행 수준 권한
- 자동화, Dashboard 집계, ChangeSet, 감사, 휴지통 수명 주기
- OAuth2 + S256 PKCE
- PostgreSQL + Redis 스택과 명시적 SQLite 경량 대체
- 프라이빗 S3 호환 첨부 수명 주기
- 권한 인식 AI 서비스와 Preview → Confirm → Apply 쓰기 경로

## 하나의 제품 계약

웹과 API는 REST / GraphQL / WebSocket / Auth / OAuth 계약으로 하나의 셀프 호스팅 QTable로 결합됩니다. 프런트는 서버의 권한·페이징·감사·첨부 보안 규칙을 우회할 수 없습니다. 핵심 테이블 기능은 외부 AI 공급자 설정을 요구하지 않습니다.

## Alpha 경계

두 저장소는 현재 `v0.1.1-alpha` / Open Source Preview를 기준으로 합니다. 저장소는 공개되었지만 공개된 GitHub Release는 아직 없습니다. 소스 상태와 배포 산출물 상태는 분리해 이해해야 합니다. [기능 매트릭스](../../project/feature-matrix/)와 [릴리스 상태](../../project/release-status/)를 확인하세요.
