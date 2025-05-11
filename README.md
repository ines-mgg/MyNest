# MyNest

MyNest est un réseau social rétro inspiré de **MySpace** et de l'esthétique classique de **Windows 98**. Connectez-vous, personnalisez votre profil, et vivez une expérience nostalgique unique.

## Fonctionnalités

- **Inscription et connexion** : Créez un compte et connectez-vous pour accéder à votre espace personnel.
- **Personnalisation du profil** : Ajoutez une photo de profil, choisissez une couleur personnalisée et personnalisez votre espace.
- **Conversations en temps réel** : Discutez avec vos amis dans des salles de chat rétro.
- **Exploration de la communauté** : Découvrez des groupes et des profils d'autres utilisateurs.
- **Interface nostalgique** : Profitez d'une interface utilisateur inspirée de Windows 98.

## Technologies utilisées

- **NestJS** : Framework backend pour la gestion des API et de la logique métier.
- **Next.js** : Framework frontend pour une expérience utilisateur fluide et moderne.
- **Docker** : Conteneurisation de l'application pour un déploiement simplifié.
- **PostgreSQL** : Base de données relationnelle pour stocker les informations des utilisateurs et les messages.
- **Prisma** : ORM pour gérer les interactions avec la base de données.
- **Adminer** : Interface web pour la gestion de la base de données.
- **MailDev** : Outil pour tester les emails envoyés par l'application.

## Installation et utilisation

1. **Cloner le dépôt** :  

    ```bash
    git clone https://github.com/ines-mgg/MyNest
    cd MyNest
    ```

2. **Créer le fichier `.env` (voir `.env.local`)** :

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
    docker compose down -v # si besoin
    docker compose up --build -d
    ```

4. **Initialiser la base de données avec Prisma** :  
    Une fois les conteneurs Docker démarrés, exécutez la commande suivante pour synchroniser le schéma de la base de données :  

    ```bash
    docker-compose exec mynestbackend npx prisma db push
    ```

5. **Ajouter des données** :  
    Pour gérer et ajouter des données à la base de données, vous avez plusieurs options :  

    - **Utiliser Adminer** : Accédez à l'interface web d'Adminer pour manipuler les données directement.  
    - **Utiliser Prisma Studio** : Lancez Prisma Studio, un outil visuel pour gérer vos données, avec la commande suivante :  

        ```bash
        docker-compose exec mynestbackend npx prisma studio
        ```

    - **Utiliser les seeders** : Ajoutez des données avec la commande suivante :

        ```bash
        docker-compose exec mynestbackend npm run seed
        ```

## Statut du projet

Ce projet est **en cours de développement**. Rejoignez-nous pour revivre l'âge d'or de l'informatique avec une touche moderne !
