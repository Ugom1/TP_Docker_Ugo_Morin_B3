## TP Docker – Générateur de blagues

Petit projet de démonstration pour le module Docker / Conteneurisation.

Stack :
- `frontend` : page HTML/CSS statique (bouton pour demander une blague), servie par Node en dev puis par Nginx en “prod locale”.
- `backend` : API Node/Express qui retourne une blague depuis PostgreSQL (`/joke`) et un healthcheck simple (`/health`).
- `db` : PostgreSQL avec initialisation via `DB/init.sql` (création de la table `jokes` + quelques blagues par défaut).

---

## 1. Prérequis

- Docker Desktop installé et démarré.
- `docker compose` disponible.

Créer un fichier `.env` à la racine (non commité) sur le modèle suivant :

```bash
POSTGRES_USER=user_app
POSTGRES_DB=jokes_db
POSTGRES_PASSWORD=HelloTest123
DB_HOST=db
```

Le mot de passe réel ne doit pas être versionné.

---

## 2. Lancement en mode développement

Depuis le dossier du projet :

```bash
docker compose up --build
```

Accès :
- Frontend : `http://localhost:8080`
- Backend : `http://localhost:3000/health` et `http://localhost:3000/joke`

Le frontend appelle directement le backend sur `http://localhost:3000/joke`.

Arrêt :

```bash
docker compose down
```

---

## 3. Lancement en “prod locale”

```bash
docker compose -f compose.prod.yaml up --build -d
```

- Frontend (Nginx) : `http://localhost:8080`

Arrêt :

```bash
docker compose -f compose.prod.yaml down
```

---

## 4. Base de données & persistance

- La base est initialisée à partir de `DB/init.sql` :
  - table `jokes(id SERIAL, phrase TEXT NOT NULL)`,
  - plusieurs blagues insérées au démarrage.
- Les données sont stockées dans le volume Docker nommé `db_data`.

Tester la persistance :

```bash
docker compose exec db psql -U user_app -d jokes_db -c "INSERT INTO jokes(phrase) VALUES ('Test persistance');"
docker compose restart db
docker compose exec db psql -U user_app -d jokes_db -c "SELECT * FROM jokes;"
```

La ligne `Test persistance` doit toujours être présente après le redémarrage.

---

## 5. Structure du projet

```text
backend/
  Dockerfile
  package.json
  src/
    server.js
    healthcheck.js
frontend/
  Dockerfile
  package.json
  src/
    index.html
    style.css
DB/
  init.sql
nginx/
  nginx.conf
compose.yaml
compose.prod.yaml
secrets/
  db_password.txt.example
README.md
```

---

## 6. Remarques

- Les conteneurs applicatifs n’utilisent pas l’utilisateur root.
- Le backend expose un endpoint `/health` pour les vérifications.
- Le projet reste volontairement simple (pas de tests auto, pas de framework front lourd) afin de se concentrer sur la partie Docker / Compose.