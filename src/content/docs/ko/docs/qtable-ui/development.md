---
title: 웹 프런트 개발
description: qtable-web의 로컬 개발, 프록시 규약, 품질 게이트.
---

QTable의 웹 프런트 구현 저장소는 [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web)입니다.

## 로컬 개발

요구 사항: Node.js 22와 `http://localhost:9000`에서 실행되는 qtable-server.

```bash
git clone https://github.com/QingZoneX/qtable-web.git
cd qtable-web
npm ci
npm run dev
```

개발 서버는 기본으로 `http://localhost:9100`을 수신하고 API / GraphQL / WebSocket / Auth / OAuth 트래픽을 qtable-server로 프록시합니다.

실제 자격 증명을 프런트 환경 변수에 넣지 마세요. npm과 루트 `package-lock.json`이 재현 가능한 설치 경로입니다.

## 주요 품질 게이트

```bash
node scripts/check-secrets.mjs --history
node scripts/check-open-source-readiness.mjs
npm run check:dependencies
npm run check:licenses
npm run test:license-policy
npm run test:xlsx-export
npm run build
```

저장소에는 OAuth, 검색, AI, Member 필드, Source Inbox, Dashboard, Automation, 첨부, 서비스 워커 계약 검사도 포함됩니다. 커밋 전에는 저장소의 현재 `package.json`과 CI를 최종 명령 출처로 삼으세요.

## 서버와의 연동

완전한 스택이 필요하면 [빠른 시작](../../getting-started/quick-start/)에 따라 `qtable-server`와 `qtable-web`을 나란히 클론하고 Compose의 `QTABLE_UI_CONTEXT`가 `../qtable-web`을 가리키도록 합니다.
