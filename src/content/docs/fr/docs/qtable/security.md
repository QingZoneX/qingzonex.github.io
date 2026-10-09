---
title: Modèle de sécurité
description: Frontières de permission, d'authentification, de partage public, d'IA et de pièces jointes privées dans QTable.
---

QTable fait de `qtable-server` la frontière de sécurité finale des données, tandis que `qtable-web` ne présente que ce que l'utilisateur courant est autorisé à voir et à faire.

## Invariants fondamentaux

- Les permissions workspace, objet et ligne doivent être appliquées côté serveur.
- La recherche, l'agrégation Dashboard, le contexte IA et l'accès aux pièces jointes ne peuvent pas contourner le même modèle de permission.
- L'écriture IA suit Preview → Confirm → Apply, avec revalidation des permissions et de l'état à l'Apply.
- Les données Public Dashboard sont calculées selon le périmètre encore lisible par le publieur.
- OAuth Public Client utilise S256 PKCE.
- Les secrets ne doivent pas être écrits dans des champs de table ordinaires, des variables d'environnement front ou des journaux.
- Upload, lecture, suppression et restauration des pièces jointes privées doivent revérifier l'autorisation.

## Conteneur web

L'image Nginx de production de `qtable-web` définit CSP, `X-Content-Type-Options`, `Referrer-Policy`, une protection contre le clickjacking et une `Permissions-Policy` restreinte. L'entrée publique doit toujours être assurée par un reverse proxy pour TLS, HTTP → HTTPS et HSTS.

## Recommandations de production

Avant un déploiement public, lisez [`qtable-server/SECURITY.md`](https://github.com/QingZoneX/qtable-server/blob/main/SECURITY.md), [`qtable-web/SECURITY.md`](https://github.com/QingZoneX/qtable-web/blob/main/SECURITY.md) et les notes de version prévues, puis complétez la [checklist de production](../../getting-started/production-checklist/).
