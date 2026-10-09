---
title: معمارية النظام
description: معمارية QTable المكوّنة من qtable-web وqtable-server، وخدمات التشغيل وحدود التخزين.
---

يعتمد QTable معمارية تفصل المستودعات بين الواجهة والخادم مع توحيد نموذج المنتج:

```text
qtable-web / QTable Web App
React 19 + TypeScript 7 + VTable + Apollo
                 │
      REST / GraphQL / WebSocket / OAuth
                 │
qtable-server / QTable API & Domain Services
FastAPI + Strawberry GraphQL
                 │
      ┌──────────┼──────────┐
      │          │          │
 PostgreSQL    Redis    S3-compatible
                         object storage
```

## طبقة الويب: qtable-web

يتولّى [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web) تجربة المستخدم النهائي والتوجيه وعرض العروض وتفاعلات التعاون وواجهات سير عمل الذكاء الاصطناعي. يستمع خادم التطوير افتراضيًا إلى `9100`، وتستخدم صورة الإنتاج Nginx لتقديم SPA والوكيل ورؤوس الاستجابة الأمنية.

## طبقة الخدمات: qtable-server

يستمع [`QingZoneX/qtable-server`](https://github.com/QingZoneX/qtable-server) افتراضيًا إلى `9000`، ويتولّى نموذج البيانات والصلاحيات والأتمتة والتدقيق والبحث والمرفقات وOAuth وخدمات الذكاء الاصطناعي. والخادم هو الحد الموثوق النهائي للصلاحيات وقواعد الكتابة.

## البيانات ووقت التشغيل

تستخدم حزمة الاستضافة الذاتية القياسية PostgreSQL 16 وRedis 7 وMinIO أو تخزين كائنات خارجي متوافق مع S3. ولا يُستخدم SQLite إلا كرجوع خفيف صريح، وليس المسار الافتراضي لنشر الإنتاج.

## حدود الأمان

يجب أن تمر كل عمليات العرض التفصيلي والبحث وتجميع Dashboard والوصول إلى المرفقات وسياق الذكاء الاصطناعي عبر تحقق صلاحيات الخادم. ولا يمكن للعميل تنزيل بيانات لا يراها المستخدم الحالي بغرض التحليل أو الذكاء الاصطناعي.
