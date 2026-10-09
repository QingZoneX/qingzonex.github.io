---
title: 시스템 아키텍처
description: qtable-web과 qtable-server로 구성되는 QTable의 아키텍처, 실행 서비스, 스토리지 경계.
---

QTable은 프런트/백엔드 저장소를 분리하면서 제품 모델을 통일하는 아키텍처를 사용합니다.

```text
qtable-web / QTable Web App
React 19 + TypeScript 7 + VTable + Apollo
                 │
      REST / GraphQL / WebSocket / OAuth
                 │
qtable-server / QTable API & Domain Services
FastAPI + Strawberry GraphQL
                 │
      ┌──────────┼──────────┐
      │          │          │
 PostgreSQL    Redis    S3-compatible
                         object storage
```

## 웹 계층: qtable-web

[`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)은 최종 사용자 경험, 라우팅, 보기 렌더링, 협업, AI 워크플로 UI를 담당합니다. 개발 서버는 기본으로 `9100`을 수신하고, 프로덕션 이미지는 Nginx로 SPA·프록시·보안 헤더를 제공합니다.

## 서비스 계층: qtable-server

[`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server)는 기본으로 `9000`을 수신하고 데이터 모델, 권한, 자동화, 감사, 검색, 첨부, OAuth, AI 서비스를 담당합니다. 서버는 권한과 쓰기 규칙의 최종 신뢰 경계입니다.

## 데이터와 런타임

표준 셀프 호스팅 스택은 PostgreSQL 16, Redis 7, MinIO 또는 외부 S3 호환 객체 스토리지를 사용합니다. SQLite는 명시적 경량 대체일 뿐이며 프로덕션 배포 기본 경로가 아닙니다.

## 보안 경계

모든 상세 보기·검색·Dashboard 집계·첨부 접근·AI 컨텍스트는 서버 권한 검증을 통과해야 합니다. 클라이언트는 분석이나 AI를 위해 현재 사용자에게 보이지 않는 데이터를 내려받을 수 없습니다.
