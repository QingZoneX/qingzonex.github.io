---
title: نموذج الأمان
description: حدود الصلاحيات والمصادقة والمشاركة العامة والذكاء الاصطناعي والمرفقات الخاصة في QTable.
---

يجعل QTable من `qtable-server` الحد النهائي لأمان البيانات، بينما يعرض `qtable-web` فقط ما يُصرّح للمستخدم الحالي برؤيته وتنفيذه.

## الثوابت الأساسية

- يجب تنفيذ صلاحيات مساحة العمل والكائن والصف على الخادم.
- لا يجوز للبحث أو تجميع Dashboard أو سياق الذكاء الاصطناعي أو الوصول إلى المرفقات تجاوز نموذج الصلاحيات نفسه.
- تتبع كتابة الذكاء الاصطناعي Preview → Confirm → Apply، مع إعادة التحقق من الصلاحيات والحالة عند Apply.
- تُحسب بيانات Public Dashboard وفق نطاق البيانات الذي ما زال الناشر قادرًا على قراءته.
- يستخدم OAuth Public Client خوارزمية S256 PKCE.
- لا يجوز كتابة الأسرار في حقول جدول عادية أو متغيرات بيئة الواجهة أو السجلات.
- يجب إعادة فحص التخويل عند رفع المرفقات الخاصة وقراءتها وحذفها واستعادتها.

## حاوية الويب

تضبط صورة Nginx الإنتاجية لـ `qtable-web` سياسة CSP و`X-Content-Type-Options` و`Referrer-Policy` والحماية من اختطاف النقر و`Permissions-Policy` مقيّدة. ويبقى الوكيل العكسي مسؤولًا عن TLS وإعادة التوجيه من HTTP إلى HTTPS وHSTS عند المدخل العام.

## توصيات بيئة الإنتاج

قبل النشر للعامة، اقرأ [`qtable-server/SECURITY.md`](https://github.com/QingZoneX/qtable-server/blob/main/SECURITY.md) و[`qtable-web/SECURITY.md`](https://github.com/QingZoneX/qtable-web/blob/main/SECURITY.md) وملاحظات الإصدار المزمع نشره، ثم أكمل [قائمة فحص بيئة الإنتاج](../../getting-started/production-checklist/).
