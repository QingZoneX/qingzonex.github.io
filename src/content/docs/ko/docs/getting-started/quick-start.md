---
title: 빠른 시작
description: 공개 저장소 qtable-server와 qtable-web으로 완전한 QTable을 로컬에서 실행합니다.
---

## 1. 두 구현 저장소 클론

두 저장소를 같은 부모 디렉터리에 둡니다.

```bash
git clone https://github.com/QingZoneX/qtable-server.git
git clone https://github.com/QingZoneX/qtable-web.git
```

디렉터리는 다음과 같아야 합니다.

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

## 2. 서버 Compose 설정

```bash
cd qtable-server
cp .env.example .env
```

현재 서버 Compose는 구 디렉터리 구조용 호환 기본값을 유지하므로, 현재 공개 저장소 이름을 사용할 때는 `.env`에 명시적으로 설정해야 합니다.

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

로컬 개발은 `.env.example`의 개발용 자격 증명을 유지할 수 있지만, 공유 또는 공개 환경에서는 `SECRET_KEY`와 첨부 스토리지 자격 증명을 변경하고 안정적인 `ENCRYPTION_KEY`를 설정해야 합니다.

## 3. 완전한 스택 실행

```bash
docker compose up --build -d
```

`http://localhost:9100`을 엽니다. Web이 사용자 진입점이며 API, PostgreSQL, Redis, MinIO는 기본으로 로컬 루프백에만 바인딩됩니다.

## 4. 검증

```bash
docker compose ps
curl -fsS http://localhost:9100/healthz
```

핵심 테이블 기능은 외부 AI 공급자 설정이 필요 없습니다. AI가 필요하면 QTable의 암호화 AI 설정 흐름으로 공급자 자격 증명을 설정하고, 실제 API 키를 프런트 환경 변수나 저장소 파일에 쓰지 마세요.

배포 세부 사항은 [셀프 호스팅](../self-hosting/)과 [프로덕션 체크리스트](../production-checklist/)를 확인하세요.
