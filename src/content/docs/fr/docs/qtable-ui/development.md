---
title: Développement du front web
description: Développement local, conventions de proxy et portes de qualité de qtable-web.
---

Le dépôt d'implémentation du front QTable est [`QingZoneX/qtable-web`](https://github.com/QingZoneX/qtable-web).

## Développement local

Prérequis : Node.js 22, et un qtable-server en écoute sur `http://localhost:9000`.

```bash
git clone https://github.com/QingZoneX/qtable-web.git
cd qtable-web
npm ci
npm run dev
```

Le serveur de développement écoute `http://localhost:9100` par défaut et proxifie le trafic API / GraphQL / WebSocket / Auth / OAuth vers qtable-server.

Ne placez pas de vraies informations d'identification dans les variables d'environnement front. npm et le `package-lock.json` racine sont le chemin d'installation reproductible.

## Principales portes de qualité

```bash
node scripts/check-secrets.mjs --history
node scripts/check-open-source-readiness.mjs
npm run check:dependencies
npm run check:licenses
npm run test:license-policy
npm run test:xlsx-export
npm run build
```

Le dépôt contient aussi des vérifications de contrat pour OAuth, la recherche, l'IA, les champs Member, Source Inbox, Dashboard, Automation, les pièces jointes et les service workers. Avant de committer, utilisez le `package.json` et la CI actuels comme source de commandes finale.

## Intégration avec le serveur

Pour une pile complète, clonez `qtable-server` et `qtable-web` côte à côte selon le [démarrage rapide](../../getting-started/quick-start/) et assurez-vous que `QTABLE_UI_CONTEXT` pointe vers `../qtable-web`.
