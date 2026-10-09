---
title: الاستضافة الذاتية
description: شغّل qtable-web وAPI وPostgreSQL وRedis وتخزين الكائنات عبر Docker Compose في qtable-server.
---

يستخدم مسار الاستضافة الذاتية القياسي من المصدر مستودعين متجاورين: `qtable-server` و`qtable-web`.

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

داخل `qtable-server`:

```bash
cp .env.example .env
```

غيّر سياق بناء الواجهة في `.env` إلى دليل المستودع الحالي:

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

ثم شغّل:

```bash
docker compose up --build -d
```

المنافذ الافتراضية: الويب `9100`، وAPI `9000`، وPostgreSQL `5432`، وRedis `6379`، وMinIO API `9001`، وMinIO Console `9002`. وباستثناء الويب، يربط Compose القياسي منافذ البيانات والإدارة بـ `127.0.0.1`.

## بيئة الإنتاج

- اضبط `APP_ENV` على `production`؛
- استخدم `SECRET_KEY` قويًا وFernet `ENCRYPTION_KEY` ثابتًا وصالحًا؛
- غيّر بيانات اعتماد PostgreSQL وتخزين الكائنات؛
- اضبط TLS وإعادة التوجيه إلى HTTPS وHSTS في الوكيل العكسي؛
- أبقِ OAuth plain PKCE والتسجيل الديناميكي للعملاء ورمز تصحيح إعادة تعيين كلمة المرور مغلقة؛
- نفّذ تدريبات نسخ احتياطي واستعادة حقيقية لـ PostgreSQL وتخزين الكائنات والإعدادات الحساسة؛
- سجّل commit/tag الفعلي لـ qtable-server وqtable-web المنشورين.

نشر الكود المصدري لا يعني نشر وسم حاوية معيّن. وقبل استخدام صورة مبنية مسبقًا، تأكد من وجود ذلك الإصدار بالضبط في Registry المطابق ومن توافقه مع إصدار الكود المزمع نشره.
