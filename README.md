```markdown
# Application de Gestion de Tâches

## Introduction

Il s'agit d'une application de gestion de tâches full-stack construite avec un frontend React, un backend Express et MongoDB comme base de données. L'application est conteneurisée à l'aide de Docker.

## Prérequis

- Docker et Docker Compose installés sur votre machine
- Git installé sur votre machine

## Démarrage

### Étape 1 : Cloner le Dépôt

```bash
git clone <URL_DU_DÉPÔT>
cd task-manager
```

### Étape 2 : Configuration des Conteneurs Docker

Assurez-vous que les fichiers `Dockerfile` et `docker-compose.yml` sont correctement configurés.

#### Dockerfile pour le Backend

Créez un fichier `Dockerfile` dans le répertoire `backend/` avec le contenu suivant :

```Dockerfile
# Utiliser une image Node officielle comme image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port sur lequel l'application va écouter
EXPOSE 5000

# Définir la commande pour démarrer l'application
CMD ["node", "server.js"]
```

#### Dockerfile pour le Frontend

Créez un fichier `Dockerfile` dans le répertoire `frontend/` avec le contenu suivant :

```Dockerfile
# Utiliser une image Node officielle comme image de base
FROM node:14

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installer les dépendances de l'application
RUN npm install

# Copier le reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Exposer le port sur lequel l'application va écouter
EXPOSE 3000

# Définir la commande pour démarrer l'application
CMD ["npm", "start"]
```

#### docker-compose.yml

Créez un fichier `docker-compose.yml` à la racine de votre projet avec le contenu suivant :

```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    container_name: task_manager_backend
    restart: unless-stopped
    environment:
      - MONGO_URI=mongodb://mongo:27017/taskmanager
    ports:
      - "5000:5000"
    depends_on:
      - mongo

  frontend:
    build: ./frontend
    container_name: task_manager_frontend
    restart: unless-stopped
    ports:
      - "3000:3000"

  mongo:
    image: mongo:latest
    container_name: mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### Étape 3 : Construire et Démarrer les Conteneurs Docker

1. **Arrêter les conteneurs en cours d'exécution (s'il y en a) :**
   ```bash
   docker-compose down
   ```

2. **Construire et démarrer les conteneurs :**
   ```bash
   docker-compose up --build
   ```

3. **Surveiller les logs en temps réel pour identifier tout problème :**
   ```bash
   docker-compose logs -f
   ```

### Étape 4 : Tester l'API Backend

1. **Utiliser `curl` pour tester l'API backend :**

   - Récupérer les tâches :
     ```bash
     curl http://localhost:5000/tasks
     ```

   - Ajouter une tâche :
     ```bash
     curl -X POST -H "Content-Type: application/json" -d '{"title": "New Task", "description": "Task description"}' http://localhost:5000/tasks
     ```

   - Mettre à jour une tâche :
     ```bash
     curl -X PUT -H "Content-Type: application/json" -d '{"title": "Updated Task", "description": "Updated description"}' http://localhost:5000/tasks/<task_id>
     ```

   - Supprimer une tâche :
     ```bash
     curl -X DELETE http://localhost:5000/tasks/<task_id>
     ```

### Étape 5 : Accéder au Frontend

1. **Ouvrez votre navigateur et accédez à :**
   ```http://localhost:3000```

### Remarques

- Assurez-vous que les ports `5000` et `3000` ne sont pas utilisés par d'autres services sur votre machine.
- Si vous rencontrez des problèmes de connexion, vérifiez les logs des conteneurs avec `docker-compose logs`.

En suivant ces étapes, vous devriez être en mesure de cloner le dépôt, configurer les conteneurs Docker, et lancer l'application de gestion de tâches.
```