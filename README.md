Lourdes Lazo

Groupomania - API REST
Réseau social d’entreprise.

Avant de démarrer: clonez le dépot: https://github.com/lourdeslazo/LazoLourdes_17082021

BACKEND: Fait avec MySQL, SEQUELIZE, NodeJS, ESPRESS

1. Paramétrer .env

Créer un fichier .env à la racine du dossier backend.

Copier le contenu du fichier .env_default dans le fichier .env en remplacant par les informations qui se trouvent dans le fichier config, c'est à dire :

SECRETTOKEN = Token secret
DB_HOST= 127.0.0.1
DB_USER= Nom d'utilisateur dans la bdd
DB_PASSWORD= Mot de passe de la bdd
DB_NAME= Nom du projet

2. Allez sur le dossier backend et sur le terminal tapez npm install
   Créez un dossier images dans le dossier backend

3. Utilisez un serveur de Base de Données type LARAGON
   Créez les bases de donées : development, test, production

4. Utilisez SEQUELIZE pour créer les tables à l'aide des commandes :
   Sequelize-cli db:generate
   Sequelize-cli db:migrate

5. Pour lancer l'application tapez sur le terminal node server (le serveur fonctionne via le port 3000)

FRONTEND : Fait avec VUE, VUEX

Lancer le frontend

Allez sur le dossier Frontend/Groupomania, ouvrez le terminal et executer npm install
Ensuite lancez la commande npm init
Pour lancer le serveur tapez la commande npm run serve (le serveur fonctionne via le port 8080)
