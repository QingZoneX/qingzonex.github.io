---
title: Самостоятельный хостинг
description: Запустите qtable-web, API, PostgreSQL, Redis и объектное хранилище через Docker Compose в qtable-server.
---

Стандартный путь самостоятельного хостинга QTable использует два соседних репозитория: `qtable-server` и `qtable-web`.

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

Внутри `qtable-server`:

```bash
cp .env.example .env
```

Измените контекст сборки web в `.env` на каталог текущего репозитория:

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

Затем запустите:

```bash
docker compose up --build -d
```

Порты по умолчанию: web `9100`, API `9000`, PostgreSQL `5432`, Redis `6379`, MinIO API `9001`, MinIO Console `9002`. Кроме web, стандартный Compose привязывает порты данных и администрирования к `127.0.0.1`.

## Окружение production

- задайте `APP_ENV=production`;
- используйте сильный `SECRET_KEY` и стабильный корректный Fernet `ENCRYPTION_KEY`;
- смените учётные данные PostgreSQL и объектного хранилища;
- настройте TLS, редирект на HTTPS и HSTS на reverse proxy;
- держите OAuth plain PKCE, динамическую регистрацию клиентов и отладочный токен сброса пароля выключенными;
- проведите реальные тренировки резервного копирования/восстановления PostgreSQL, объектного хранилища и ключевых настроек;
- зафиксируйте фактически развёрнутые commit/tag qtable-server и qtable-web.

Публичный исходный код не означает опубликованный тег контейнера. Перед использованием готового образа убедитесь, что точная версия существует в соответствующем реестре и совпадает с планируемым кодом.
