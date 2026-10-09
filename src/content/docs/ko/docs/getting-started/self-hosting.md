---
title: 셀프 호스팅
description: qtable-server의 Docker Compose로 qtable-web, API, PostgreSQL, Redis, 객체 스토리지를 실행합니다.
---

QTable의 표준 소스 셀프 호스팅 경로는 나란한 두 저장소 `qtable-server`와 `qtable-web`을 사용합니다.

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

`qtable-server` 안에서:

```bash
cp .env.example .env
```

`.env`의 웹 빌드 컨텍스트를 현재 저장소 디렉터리로 변경합니다.

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

그런 다음 실행합니다.

```bash
docker compose up --build -d
```

기본 포트: Web `9100`, API `9000`, PostgreSQL `5432`, Redis `6379`, MinIO API `9001`, MinIO Console `9002`. Web을 제외하고 표준 Compose는 데이터면·관리 포트를 `127.0.0.1`에 바인딩합니다.

## 프로덕션 환경

- `APP_ENV`를 `production`으로 설정
- 강력한 `SECRET_KEY`와 안정적인 유효한 Fernet `ENCRYPTION_KEY` 사용
- PostgreSQL과 객체 스토리지 자격 증명 변경
- 리버스 프록시에서 TLS, HTTPS 리다이렉트, HSTS 설정
- OAuth plain PKCE, 동적 클라이언트 등록, 비밀번호 재설정 디버그 토큰 비활성 유지
- PostgreSQL, 객체 스토리지, 핵심 설정의 실제 백업/복원 훈련 수행
- 실제 배포한 qtable-server와 qtable-web의 commit / tag 기록

소스 공개는 특정 컨테이너 태그 공개를 뜻하지 않습니다. 빌드된 이미지를 사용하기 전에 해당 정확한 버전이 대응 레지스트리에 존재하고 배포 예정 소스와 일치하는지 확인하세요.
