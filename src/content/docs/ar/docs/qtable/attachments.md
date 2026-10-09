---
title: تخزين المرفقات
description: عقد ودورة حياة تخزين المرفقات الخاص المتوافق مع S3 في QTable.
---

المرفقات بيانات تطبيقية خاصة، وليست روابط كائنات عامة.

تحفظ خلايا الجدول بيانات وصفية ثابتة، لا روابط تنتهي صلاحيتها:

```text
attachmentId + objectKey + name + size + contentType
```

يمر الرفع والتنزيل والحذف عبر واجهة QTable API المُوثَّقة، مع إعادة فحص صلاحيات Table وRow الحالية.

## إعداد وقت التشغيل

يتضمّن عقد التخزين الحالي:

- `ATTACHMENT_STORAGE_ENABLED`
- `ATTACHMENT_S3_ENDPOINT`
- `ATTACHMENT_S3_ACCESS_KEY`
- `ATTACHMENT_S3_SECRET_KEY`
- `ATTACHMENT_S3_BUCKET`
- `ATTACHMENT_S3_REGION` (اختياري)
- `ATTACHMENT_S3_SECURE`
- `ATTACHMENT_MAX_BYTES`
- إعدادات دفعة/فاصل التنظيف
- `ATTACHMENT_UPLOAD_PENDING_GRACE_SECONDS`

## دورة الحياة

تحتفظ السجلات المحذوفة حذفًا ناعمًا بكائنات مرفقاتها، لذلك تبقى قابلة للاستعادة. وبعد Permanent Purge يدخل الكائن مسار تنظيف خلفي دائم. ويُنشئ الرفع نية رفع دائمة قبل الكتابة في تخزين الكائنات، لذا يمكن اكتشاف الرفعات المتقطعة واستعادتها.
