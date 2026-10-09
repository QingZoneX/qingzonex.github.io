---
title: Démarrage rapide
description: Lancez le QTable complet en local avec les dépôts publics qtable-server et qtable-web.
---

## 1. Cloner les deux dépôts d'implémentation

Placez les deux dépôts dans le même dossier parent :

```bash
git clone https://github.com/QingZoneX/qtable-server.git
git clone https://github.com/QingZoneX/qtable-web.git
```

L'arborescence devrait ressembler à :

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

## 2. Configurer le Compose serveur

```bash
cd qtable-server
cp .env.example .env
```

Le Compose serveur actuel conserve des valeurs par défaut compatibles avec l'ancienne arborescence ; avec les noms de dépôt publics actuels, vous devez définir explicitement dans `.env` :

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

Le développement local peut conserver les identifiants de développement de `.env.example` ; pour tout environnement partagé ou public, changez `SECRET_KEY`, les identifiants de stockage des pièces jointes et définissez une `ENCRYPTION_KEY` stable.

## 3. Démarrer la pile complète

```bash
docker compose up --build -d
```

Ouvrez `http://localhost:9100`. Le web est l'entrée utilisateur ; l'API, PostgreSQL, Redis et MinIO ne sont liés qu'à l'adresse de bouclage locale par défaut.

## 4. Vérifier

```bash
docker compose ps
curl -fsS http://localhost:9100/healthz
```

Les capacités table de base n'exigent aucun fournisseur IA externe. Si nécessaire, configurez le fournisseur via le flux de configuration IA chiffré de QTable, et n'écrivez jamais une vraie clé API dans les variables d'environnement front ou les fichiers du dépôt.

Pour plus de détails, voir l'[auto-hébergement](../self-hosting/) et la [checklist de production](../production-checklist/).
