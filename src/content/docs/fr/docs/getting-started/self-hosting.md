---
title: Auto-hébergement
description: Exécutez qtable-web, l'API, PostgreSQL, Redis et le stockage objet via Docker Compose dans qtable-server.
---

Le chemin d'auto-hébergement standard de QTable utilise deux dépôts côte à côte : `qtable-server` et `qtable-web`.

```text
qingzone/
├── qtable-server/
└── qtable-web/
```

Dans `qtable-server` :

```bash
cp .env.example .env
```

Changez le contexte de build web dans `.env` vers le répertoire du dépôt courant :

```dotenv
QTABLE_UI_CONTEXT=../qtable-web
```

Puis exécutez :

```bash
docker compose up --build -d
```

Ports par défaut : web `9100`, API `9000`, PostgreSQL `5432`, Redis `6379`, MinIO API `9001`, MinIO Console `9002`. Hormis le web, le Compose standard lie les ports de données et d'administration à `127.0.0.1`.

## Environnement de production

- Définissez `APP_ENV=production` ;
- utilisez un `SECRET_KEY` fort et une `ENCRYPTION_KEY` Fernet stable et valide ;
- changez les identifiants PostgreSQL et stockage objet ;
- configurez TLS, redirection HTTPS et HSTS au niveau du reverse proxy ;
- gardez OAuth plain PKCE, l'enregistrement dynamique des clients et le jeton de débogage de réinitialisation désactivés ;
- réalisez de vrais exercices de sauvegarde / restauration pour PostgreSQL, le stockage objet et les configurations sensibles ;
- enregistrez le commit / tag réellement déployé de qtable-server et qtable-web.

Un code source public ne signifie pas qu'un tag de conteneur est publié. Avant d'utiliser une image préconstruite, vérifiez que cette version exacte existe dans le registry correspondant et qu'elle correspond au code prévu.
