---
title: 릴리스 상태
description: "QTable의 현재 공개 소스 상태, Alpha 태그, 배포물 경계."
---

QTable의 현재 공개 버전은 **`v0.1.1-alpha` — Open Source Preview**입니다.

## 공개 소스와 태그

두 구현 저장소는 모두 공개되어 있고 둘 다 `v0.1.1-alpha` Git 태그가 있습니다.

- [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server)
- [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)

둘은 하나의 QTable 제품 버전을 구성합니다. 웹 프런트, API / Domain Services, 데이터 계층, 객체 스토리지는 같은 호환 기준에서 검증해야 합니다.

## 배포물 상태

현재까지 어느 저장소에도 `v0.1.1-alpha`에 대응하는 공개 GitHub Release가 없습니다. 따라서 **"Git 태그 공개"를 "GitHub Release·Docker Hub 이미지·안정 배포물 공개"로 해석해서는 안 됩니다**. 이미지·Release·기타 배포물의 존재 여부는 해당 저장소의 실제 공개 기록에 따릅니다.

## Alpha 기대

현재 기준은 소스 평가, 커뮤니티 개발, 스테이징, 통제된 시험에 적합합니다. v1.0 이전에는 공개 API, 마이그레이션 동작, 배포 Runbook, 일부 제품 계약이 바뀔 수 있습니다.

프로덕션 배포 전에 [프로덕션 체크리스트](../../getting-started/production-checklist/)를 완료하고 [기능 매트릭스](../feature-matrix/)를 읽으세요.
