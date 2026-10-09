---
title: QTable 웹 프런트엔드
description: "qtable-web이 제공하는 QTable Web App 제품 UI, 기술 스택, 보안 경계."
---

이 장은 **QTable Web App**을 설명합니다. 공개 저장소 [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)이 구현하는 QTable 제품의 웹 프런트 계층으로, [`qtable-server`](https://github.com/QingZoneX/qtable-server)와 권한·데이터·릴리스 계약을 공유합니다.

## 현재 제품 UI

- Home / My Work / Projects Center
- Grid / Kanban / Gantt / Calendar / Gallery
- Dashboard Center / Workbench
- Automation Center와 실행 기록
- Notification Center, Record Workspace / Collaboration / Activity
- Global Search / Command paths와 Recycle Bin
- AI Planning, Project Steward, 안전한 액션 플랜, Source Inbox

## 기술 스택

- React 19
- TypeScript 7
- Vite / Rolldown
- Ant Design 6
- VTable / VTable Gantt
- Apollo Client
- Zustand
- VChart
- react-grid-layout

## 실행 계약

개발 서버는 기본으로 `9100`을 수신하고 API / GraphQL / WebSocket / Auth / OAuth를 기본으로 `9000`을 수신하는 qtable-server로 프록시합니다. 프로덕션 컨테이너는 Nginx로 정적 자산, SPA 라우팅, 보안 헤더를 제공합니다.

## 제품 경계

프런트는 qtable-server의 권한·페이징·감사·프라이빗 첨부·**Preview → Confirm → Apply** 계약을 지켜야 합니다. 대용량 테이블, AI, Dashboard, 공개 공유는 클라이언트로 숨은 데이터를 내려받거나 서버 보안 경계를 우회할 수 없습니다.
