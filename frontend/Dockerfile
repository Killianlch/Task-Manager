# frontend/Dockerfile
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
