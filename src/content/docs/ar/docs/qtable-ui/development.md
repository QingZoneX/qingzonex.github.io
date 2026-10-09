---
title: تطوير واجهة الويب
description: التطوير المحلي في qtable-web واصطلاحات الوكيل وبوابات الجودة.
---

مستودع تنفيذ واجهة QTable هو [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web).

## التطوير المحلي

المتطلبات: Node.js 22، وخادم qtable-server يعمل على `http://localhost:9000`.

```bash
git clone https://github.com/QingZoneX/qtable-web.git
cd qtable-web
npm ci
npm run dev
```

يستمع خادم التطوير افتراضيًا إلى `http://localhost:9100`، ويوكّل حركة API / GraphQL / WebSocket / Auth / OAuth إلى qtable-server.

لا تضع بيانات اعتماد حقيقية في متغيرات بيئة الواجهة. ويُعد npm و`package-lock.json` في الجذر مسار التثبيت القابل للتكرار.

## بوابات الجودة الرئيسية

```bash
node scripts/check-secrets.mjs --history
node scripts/check-open-source-readiness.mjs
npm run check:dependencies
npm run check:licenses
npm run test:license-policy
npm run test:xlsx-export
npm run build
```

يضم المستودع أيضًا فحوصًا تعاقدية لـ OAuth والبحث والذكاء الاصطناعي وحقول Member وSource Inbox وDashboard وAutomation والمرفقات وعمال الخدمة. وينبغي اعتبار `package.json` وCI الحاليين في المستودع المصدر النهائي للأوامر قبل الإيداع.

## التكامل مع الخادم

للحصول على الحزمة الكاملة، استنسخ `qtable-server` و`qtable-web` كمجاورين وفق [بدء سريع](../../getting-started/quick-start/)، وتأكد من أن `QTABLE_UI_CONTEXT` في Compose يشير إلى `../qtable-web`.
