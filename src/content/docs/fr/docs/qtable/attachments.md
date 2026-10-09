---
title: Stockage des pièces jointes
description: Contrat et cycle de vie du stockage privé de pièces jointes S3-compatible dans QTable.
---

Les pièces jointes sont des données applicatives privées, pas des URL d'objets publiques.

Les cellules de table conservent des métadonnées stables, pas des URL expirantes :

```text
attachmentId + objectKey + name + size + contentType
```

Upload, téléchargement et suppression passent par l'API QTable authentifiée et revérifient les permissions Table et Row courantes.

## Configuration runtime

Le contrat de stockage actuel inclut :

- `ATTACHMENT_STORAGE_ENABLED`
- `ATTACHMENT_S3_ENDPOINT`
- `ATTACHMENT_S3_ACCESS_KEY`
- `ATTACHMENT_S3_SECRET_KEY`
- `ATTACHMENT_S3_BUCKET`
- `ATTACHMENT_S3_REGION` (optionnel)
- `ATTACHMENT_S3_SECURE`
- `ATTACHMENT_MAX_BYTES`
- configuration de lot / intervalle de nettoyage
- `ATTACHMENT_UPLOAD_PENDING_GRACE_SECONDS`

## Cycle de vie

Les enregistrements en suppression logique conservent leurs objets de pièce jointe et restent donc restaurables. Après une purge permanente, l'objet entre dans un nettoyage d'arrière-plan durable. L'upload crée une intention d'upload durable avant d'écrire dans le stockage objet, de sorte que les uploads interrompus puissent être détectés et récupérés.
