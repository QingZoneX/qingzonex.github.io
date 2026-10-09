---
title: 기능 매트릭스
description: QTable v0.1.1-alpha의 구현된 기능과 향후 제품 방향을 구분합니다.
---

이 페이지는 `qtable-server`와 `qtable-web`의 현재 `v0.1.1-alpha` 태그 / main 기능을 기준으로 하여 계획 중인 방향을 구현 완료로 서술하지 않습니다.

## 구현된 기준

| 기능 | 현재 상태 | 주요 구현 저장소 |
| --- | --- | --- |
| Home / My Work / Projects Center | 구현됨 | qtable-web + qtable-server |
| Grid / Kanban / Gantt / Calendar / Gallery | 구현됨 | qtable-web + qtable-server |
| Dashboard Center / Workbench / 서버 집계 | 구현됨 | 둘 다 |
| Automation Center / 규칙 실행 / 기록 | 구현됨 | 둘 다 |
| Notification / Record Collaboration / Activity | 구현됨 | 둘 다 |
| 권한 인식 전체 검색 / Recycle Bin | 구현됨 | 둘 다 |
| 프라이빗 S3 호환 첨부 수명 주기 | 구현됨 | qtable-server + qtable-web |
| Goal / Task / Workload / Project Steward AI 워크플로 | 구현 기준 | 둘 다 |
| Source Inbox | 구현 기준 | 둘 다 |
| OAuth2 + S256 PKCE | 구현됨 | qtable-server + qtable-web |

## 향후 제품 계획

앞으로의 작업은 포털을 특정 GitHub Issue 번호에 묶지 않고 제품 방향으로 진행합니다.

- **릴리스 품질과 규모 확장**: 엔드투엔드 검증, 대용량 테이블 성능, 실시간 안정성, 프런트 반응형, 접근성, 국제화, 그리고 셀프 호스팅의 백업·복원·업그레이드 경험을 지속 강화.
- **개방성과 통합**: 폼/공개 수집, API, Webhook, Connector, 소스 수집을 단계적으로 확장해 기존 업무 시스템에 QTable을 더 쉽게 통합.
- **AI와 자동화 플랫폼화**: BYO / Self-hosted AI, 권한 인식 에이전트, 자동화 오케스트레이션을 확장하면서 Preview → Confirm → Apply의 안전한 쓰기 경로를 유지.
- **QingZoneX 제품 생태계**: 미래의 상위 업무 경험은 두 번째 데이터 모델을 다시 만들지 않고 QTable의 구조화 데이터·권한·협업·자동화를 재사용.

이 내용은 방향성 서술이며 날짜 약속이 아니고, 구현 완료로 설명해서는 안 됩니다. 사용 가능한 기능은 항상 `v0.1.1-alpha` 태그, 현재 소스, 실제 배포물이 기준입니다.
