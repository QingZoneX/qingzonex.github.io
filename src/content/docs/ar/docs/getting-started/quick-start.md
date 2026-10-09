---
title: بدء سريع
description: شغّل QTable كاملًا محليًا باستخدام مستودعي qtable-server وqtable-web العامين.
---

## 1. استنسخ مستودعي التنفيذ

ضع المستودعين في المجلد الأب نفسه:

```bash
git clone https://github.com/QingZoneX/qtable-server.git
git clone https://github.com/QingZoneX/qtable-web.git
```

ويُفترض أن يصبح الدليل بهذا الشكل:

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

## 2. اضبط Compose في الخادم

```bash
cd qtable-server
cp .env.example .env
```

يحتفظ Compose الحالي في الخادم بقيم افتراضية متوافقة مع تخطيط الدلائل القديم، لذا يجب عند استخدام أسماء المستودعات العامة الحالية ضبط ما يلي صراحةً في `.env`:

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

يمكن للتطوير المحلي الإبقاء على بيانات اعتماد التطوير في `.env.example`؛ أما في أي بيئة مشتركة أو عامة فيجب تغيير `SECRET_KEY` وبيانات اعتماد تخزين المرفقات وضبط `ENCRYPTION_KEY` ثابت.

## 3. شغّل الحزمة الكاملة

```bash
docker compose up --build -d
```

افتح `http://localhost:9100`. الواجهة هي مدخل المستخدم؛ وتُربط API وPostgreSQL وRedis وMinIO افتراضيًا بعنوان الاسترجاع المحلي فقط.

## 4. التحقق

```bash
docker compose ps
curl -fsS http://localhost:9100/healthz
```

لا تتطلب قدرات الجدول الأساسية إعداد مزوّد ذكاء اصطناعي خارجي. وعند الحاجة إلى الذكاء الاصطناعي، اضبط بيانات اعتماد المزوّد عبر تدفق إعداد الذكاء الاصطناعي المشفّر في QTable، ولا تكتب مفتاح API حقيقيًا في متغيرات بيئة الواجهة أو ملفات المستودع.

لمزيد من تفاصيل النشر راجع [الاستضافة الذاتية](../self-hosting/) و[قائمة فحص بيئة الإنتاج](../production-checklist/).
