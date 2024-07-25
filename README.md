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
   http://localhost:3000

### Remarques

- Assurez-vous que les ports `5000` et `3000` ne sont pas utilisés par d'autres services sur votre machine.
- Si vous rencontrez des problèmes de connexion, vérifiez les logs des conteneurs avec `docker-compose logs`.

## Version Mobile

### Prérequis

- Expo CLI installé globalement (ou utiliser npx)
- Un appareil physique ou un émulateur pour tester l'application mobile

### Étape 1 : Initialiser un Nouveau Projet Mobile

1. **Créer un nouveau projet Expo** :
   - Ouvrez un terminal dans le répertoire `task-manager` et exécutez la commande suivante pour créer un nouveau projet React Native.
   ```bash
   npx create-expo-app mobile
   ```

2. **Naviguer vers le répertoire du projet mobile** :
   ```bash
   cd mobile
   ```

3. **Installer les dépendances** :
   ```bash
   npm install
   ```

### Étape 2 : Créer les Composants de l'Application Mobile

1. **Créer un composant pour la liste des tâches** :
   - Créez un fichier `TaskList.js` dans le répertoire `components` et ajoutez le code suivant :
   ```javascript
   // mobile/components/TaskList.js
   import React, { useEffect, useState } from 'react';
   import { View, Text, StyleSheet, FlatList } from 'react-native';
   import axios from 'axios';

   const TaskList = () => {
     const [tasks, setTasks] = useState([]);

     useEffect(() => {
       fetchTasks();
     }, []);

     const fetchTasks = async () => {
       try {
         const response = await axios.get('http://<votre-adresse-ip>:5000/tasks');
         setTasks(response.data);
       } catch (error) {
         console.error(error);
       }
     };

     return (
       <View style={styles.container}>
         <FlatList
           data={tasks}
           keyExtractor={(item) => item._id}
           renderItem={({ item }) => (
             <View style={styles.taskContainer}>
               <Text style={styles.taskTitle}>{item.title}</Text>
               <Text>{item.description}</Text>
             </View>
           )}
         />
       </View>
     );
   };

   const styles = StyleSheet.create({
     container: {
       flex: 1,
       justifyContent: 'center',
       alignItems: 'center',
     },
     taskContainer: {
       padding: 10,
       borderBottomWidth: 1,
       borderColor: '#ccc',
     },
     taskTitle: {
       fontSize: 18,
       fontWeight: 'bold',
     },
   });

   export default TaskList;
   ```

2. **Créer un composant pour ajouter une tâche** :
   - Créez un fichier `TaskForm.js` dans le répertoire `components` et ajoutez le code suivant :
   ```javascript
   // mobile/components/TaskForm.js
   import React, { useState } from 'react';
   import { View, TextInput, Button, StyleSheet } from 'react-native';
   import axios from 'axios';

   const TaskForm = ({ fetchTasks }) => {
     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');

     const handleSubmit = async () => {
       try {
         await axios.post('http://<votre-adresse-ip>:5000/tasks', { title, description });
         fetchTasks();
         setTitle('');
         setDescription('');
       } catch (error) {
         console.error(error);
       }
     };

     return (
       <View style={styles.container}>
         <TextInput
           style={styles.input}
           placeholder="Title"
           value={title}
           onChangeText={setTitle}
         />
         <TextInput
           style={styles.input}
           placeholder="Description"
           value={description}
           onChangeText={setDescription}
         />
         <Button title="Add Task" onPress={handleSubmit} />
       </View>
     );
   };

   const styles = StyleSheet.create({
     container: {
       padding: 20,
     },
     input: {
       height: 40,
       borderColor: '#ccc',
       borderWidth: 1,
       marginBottom: 10,
       paddingLeft: 8,
     },
   });

   export default TaskForm;
   ```

### Étape 3 : Intégrer les Composants dans l'Application Mobile

1. **Mettre à jour le fichier `App.js`** :
   - Ouvrez le fichier `App.js` dans le répertoire

 `mobile` et remplacez son contenu par le suivant :
   ```javascript
   // mobile/App.js
   import React from 'react';
   import { StyleSheet, View } from 'react-native';
   import TaskList from './components/TaskList';
   import TaskForm from './components/TaskForm';

   export default function App() {
     return (
       <View style={styles.container}>
         <TaskForm />
         <TaskList />
       </View>
     );
   }

   const styles = StyleSheet.create({
     container: {
       flex: 1,
       backgroundColor: '#fff',
       alignItems: 'center',
       justifyContent: 'center',
     },
   });
   ```

### Étape 4 : Démarrer et Tester l'Application Mobile

1. **Démarrer le serveur de développement Expo** :
   ```bash
   npx expo start
   ```

2. **Ouvrir l'application Expo Go sur votre téléphone ou émulateur** :
   - Scannez le code QR affiché dans votre terminal avec l'application Expo Go sur votre téléphone.
   - Vous pouvez également utiliser un émulateur Android ou iOS pour tester l'application.

### Remarque

Assurez-vous que votre backend est accessible à partir de l'application mobile. Si vous testez sur un appareil physique, remplacez `localhost` par l'adresse IP de votre machine de développement.
```

Vous pouvez copier et coller ce contenu directement dans votre fichier `README.md`. Si vous avez des questions ou avez besoin d'aide supplémentaire, n'hésitez pas à demander.
