---
title: QTable 문서
description: "QingZoneX의 오픈소스 제품 QTable에 대한 완전한 문서. 웹 경험, API 서비스, 셀프 호스팅, 보안, 첨부 파일, AI 워크플로를 다룹니다."
sidebar:
  order: 1
---

**QTable**은 QingZoneX가 현재 오픈소스로 공개하는 제품으로, 다차원 테이블을 기반으로 한 AI 네이티브 프로젝트·업무 관리 시스템입니다.

사용자 관점에서 QTable은 하나의 완성된 제품이며, 엔지니어링 관점에서는 두 개의 공개 구현 저장소로 구성됩니다. 두 구현 계층은 같은 Table / Record / View / Dashboard / Permission 모델을 공유하고 REST / GraphQL / WebSocket / Auth / OAuth 계약으로 협업합니다.

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) — FastAPI / Strawberry GraphQL 백엔드, 데이터 모델, 권한, 자동화, 감사, 첨부, 검색, OAuth, AI 서비스.
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) — React 웹 앱, 워크 센터, Grid / Kanban / Gantt / Calendar / Gallery, 대시보드, 협업, 자동화, AI 상호작용.

두 저장소는 현재 **`v0.1.1-alpha` / Open Source Preview**를 소스 기준으로 하며 **Apache License 2.0**으로 공개됩니다. 저장소 공개가 GitHub Release, Docker 이미지 또는 다른 배포 산출물의 공개를 뜻하지는 않습니다. [릴리스 상태](./project/release-status/)와 각 저장소의 Releases를 확인하세요.

## 권장 읽기 순서

1. [빠른 시작](./getting-started/quick-start/)에 따라 완전한 QTable을 로컬에서 실행합니다.
2. [QTable 아키텍처](./qtable/architecture/)로 웹·API·데이터·스토리지 경계를 이해합니다.
3. [QTable 제품 개요](./qtable/overview/)로 현재 기능 기준을 확인합니다.
4. 프런트 구현과 로컬 개발은 [프런트 개발](./qtable-ui/development/)을 참고합니다.
5. 공개 배포 전에 [보안 모델](./qtable/security/)과 [프로덕션 체크리스트](./getting-started/production-checklist/)를 확인합니다.
6. [기능 매트릭스](./project/feature-matrix/)로 구현됨·강화 중·향후 계획을 구분합니다.

:::caution[Alpha 상태]
현재 버전은 평가, 커뮤니티 개발, 스테이징, 통제된 시험에 적합합니다. v1.0 이전에는 공개 API, 마이그레이션 동작, 일부 제품 계약이 바뀔 수 있습니다.
:::
