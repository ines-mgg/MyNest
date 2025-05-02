# KittyChat

![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

KittyChat est une application de chat en temps réel développée avec **NestJS** et **Remix**. Ce projet est actuellement en cours de développement.

## Fonctionnalités prévues

- **Inscription et connexion** : Les utilisateurs peuvent créer un compte et se connecter.  
- **Chat en temps réel** : Les utilisateurs connectés peuvent discuter entre eux.  
- **Personnalisation du profil** : Chaque utilisateur peut choisir une couleur personnalisée pour son profil, visible par les autres utilisateurs.  

## Technologies utilisées

- **NestJS** : Framework backend pour la gestion des API et de la logique métier.  
- **Remix.js** : Framework frontend pour une expérience utilisateur fluide.  
- **Docker** : Conteneurisation de l'application pour un déploiement simplifié.  
- **PostgreSQL** : Base de données relationnelle pour stocker les informations des utilisateurs et les messages.  
- **Adminer** : Interface web pour la gestion de la base de données.  
- **MailDev** : Outil pour tester les emails envoyés par l'application.  

## Installation et utilisation

1. **Cloner le dépôt** :  

    ```bash
    git clone https://github.com/ines-mgg/KittyChat
    cd KittyChat
    ```

2. **Créer le fichier .env (voir .env.local)**

    ```plaintext
    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=
    DATABASE_URL=
    JWT_SECRET=
    ```

3. **Lancer l'application avec Docker** :  
    Assurez-vous d'avoir Docker installé sur votre machine.  

    ```bash
    docker compose down -v // si besoin
    docker compose up --build -d
    ```

4. **Initialiser la base de données avec Prisma** :  
    Une fois les conteneurs Docker démarrés, exécutez la commande suivante pour synchroniser le schéma de la base de données :  

    ```bash
    docker-compose exec kittybackend npx prisma db push
    ```

    Cette commande applique les migrations Prisma et prépare la base de données pour l'application.

5. **Ajouter des données** :  
    Pour gérer et ajouter des données à la base de données, vous avez deux options :  

- **Utiliser Adminer** : Accédez à l'interface web d'Adminer pour manipuler les données directement.  
- **Utiliser Prisma Studio** : Lancez Prisma Studio, un outil visuel pour gérer vos données, avec la commande suivante :  

    ```bash
    docker-compose exec kittybackend npx prisma studio
    Prisma schema loaded from prisma/schema.prisma
    Prisma Studio is up on <http://localhost:5555>
    ```

- **Utiliser les seeders** : Ajouter des données, avec la commande suivante :

    ```bash
    docker-compose exec kittybackend npm run seed
    ```

## Statut du projet

Ce projet est **en cours de développement**.
