# Groupomania

7eme et dernier projet de mon parcours Développeur web chez OpenClassroom. L'objectif est de créer un réseau social d'entreprise.

## Scénario

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

### Fonctionnalités importantes

. Identifier / créer un compte
. Editer / supprimer un compte
. Créer des post / les afficher
. Modifier / supprimer un post
. Création d'un compte admin pour gérer les utilisateurs (gestion avec postgreSQL pour le changement)

## Technologies utilisées

Développement Backend en Javascript

- Serveur **Node.js**
- Framework **Express**
- Base de données **PostgreSQL**
- **API REST**

Développement Frontend en React/Redux

- Bibliothèque **React JS**
- **Redux**

## Pour tester l'application

Cloner [ce repository frontend](https://github.com/Cynthiacrn/caroncynthia_7_200202022.git), et le lancer :

### Backend :

Connectez-vous à postgreSQL avec vos identifiants et mot de passe habituels, une fois connecté, créer la base de données P7:

CREATE DATABASE P7;

Puis créer une table "users":

CREATE TABLE users(

id SERIAL PRIMARY KEY,

firstname VARCHAR(150) NOT NULL,

lastname VARCHAR(150) NOT NULL,

username VARCHAR(50) NOT NULL,

email VARCHAR(255) NOT NULL,

password VARCHAR(255) NOT NULL,

bio TEXT,

isadmin BOOLEAN DEFAULT FALSE

);

Et enfin la table "posts":

CREATE TABLE posts(

id SERIAL PRIMARY KEY,

title TEXT NOT NULL,

content TEXT NOT NULL,

created_at TIMESTAMP NOT NULL DEFAULT NOW(),

user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE

);

- Dans le terminal, accéder au dossier backend: `cd backend`
- Installer les dépendances `npm install`
- Créer un fichier .env dans lequel on va mettre nos variables d'environnement:

PORT= 'port sur lequel vous souhaitez lancer le serveur'
CLIENT_URL='http://localhost:3000'

Ici entrez bien évidemment vos identifiants lors de la création de votre base de données dans postgreSQL

DB_HOST='localhost'

DB_USER='postgreSQL user'

DB_PORT=5432

DB_PSWRD='postgreSQL password'

DB='P7'

JWTSECRET = 'créer votre propre token'

- Installer `npm install -g nodemon` et lancer le serveur avec `nodemon server`

Le backend est fonctionnel !

### Frontend :

- Dans le terminal, accéder au dossier backend: `cd frontend`
- Installer React, Redux et le package node
- Créer un dossier .env dans lequel on ajoutera: REACT_APP_API_URL=http://localhost:5000/
- Lancer le serveur `npm run start`

Pour créer un compte admin:

Créer un compte normal en vous inscrivant sur l'application
ensuite dans la base de données sql taper la commande sql suivante :
UPDATE user SET isAdmin = ‘1’ WHERE id = ‘(l’id du compte à transformer en admin)’;
Par défaut le serveur client est accessible en local via le port 3000: http://localhost:3000/

Bonne navigation !
