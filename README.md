# **MealMate**
Application web de gestion de recettes et de menus.

## Fonctionnalités

- Créer et partager vos menus et recettes
- Rechercher et revisiter les créations d'autres utilisateurs
- Enregistrer et préparer les plats à l'avance
- Extraire sa liste de courses et calculer ses calories et son prix total
- Commenter les menus et les plats des autres amateurs de cuisines

# Installation de l'API
MealMate nécessite [Node.js](https://nodejs.org/) 18 et une SGBD MySQL au fonctionnement.

Ouvrir le projet dans un terminal dans le dossier backend et installer les dépendances et lancer le serveur.
```sh
cd backend
npm install
```

Créer un fichier .env dans le projet avec les variables d'environnements correspondantes aux informations de connexion vers la base de données, le port de l'API, les configurations jsonwebtoken et bcrypt. 
```sh
SERVER_PORT=8888
DB_HOST
DB_PORT=3306
DB_NAME=mealmate
DB_USER=root
DB_PASS=
JWT_DURING=1 hour
BCRYPT_SALT_ROUND=10
JWT_SECRET=yoursecretphraseblablabla
```



Lancer l'API
```sh
npm run dev
```

# Lancer la seed avec l'admin par défaut
Ouvrir et configurer le fichier config.json comprenant les environnements.

Entrer dans le terminal dans le dossier backend pour générer un administrateur par défaut.
```
npm i sequelize-cli
npx sequelize-cli db:seed:all
``` 

Créer votre administrateur en vous connectant avec l'admin créé. (authorization: bearer)
```
/auth/login
```

Annuler la seed :
```sh
npx sequelize-cli db:seed:undo
``` 

# Utilisation de l'API (avec l'utilitaire Postman)

Installer l'utilitaire Postman.

Une fois l'API configurée, lancer Postman.

Entrer la route à utiliser.
****
# Routage API :
### Liste des Router :
#### Home API
```
/
```
#### admin
```
/admin
```
#### user
```
/user
```
#### public
```
/public
```
```
/auth/login
```
```
/auth/register
```
### Liste des Routes :
```
/categories
```
```
/comments
```
```
/courses
```
```
/daysofweek
```
```
/diets
```
```
/ingredients
```
```
/meals
```
```
/menus
```
```
/recipes
```
```
/themes
```
```
/users
```
### Liste des Controllers :
### get
getAll
```
/
```
getOne
```
/:id
```
getMe
```
/me
```
### put
add
```
/
```

addMy
```
/me
```

addIn
```
/route/:id
```
### patch
update
```
/:id
```
updateMy
```
/me/:id
```
### post
untrash
```
/untrash/:id
```
untrashMy
```
/me/untrash/:id
```
### delete
trash
```
/trash/:id
```
delete
```
/:id
```
trashMy
```
/me/trash/:id
```
deleteMy
```
/me/:id
```
deleteIn
```
/route/:id
```
****
# EXEMPLE
```http://localhost:8888/admin/menus/recipe/10``` en **PATCH** permet d'éditer la recette avec l'id ```10``` à un menu.

**Attention !** 
Certains paramètres sont à entrer dans le body avec le type de contenu (x-www-form-urlencoded)

# Installation de la partie front end

Ouvrir le projet dans un terminal dans le dossier front end et installer les dépendances et lancer le site avec le script starto.
```sh
cd frontend
npm install
npm run starto
```
# **Profitez de votre expérience et découvrez les fonctionnalités du sites!**
