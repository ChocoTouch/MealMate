# **MealMate**
Application web de gestion de recettes et de menus.

## Fonctionnalités

- Créer et partager vos menus et recettes
- Rechercher et revisiter les créations d'autres utilisateurs
- Enregistrer et préparer les plats à l'avance
- Extraire sa liste de courses et calculer ses calories et son prix total
- Commenter les menus et les plats des autres amateurs de cuisines

# Installation

Ouvrir le projet dans un terminal dans le dossier backend et installer les modules.
```sh
npm install
```

Créer un fichier .env dans le projet avec les variables d'environnements correspondantes aux informations de connexion vers la base de données, le port de l'API, les informations du jsonwebtoken ainsi que le sallage bcrypt. 
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

Entrer dans le terminal dans le dossier backend.
```
npm i sequelize-cli
npx sequelize-cli db:seed:all
``` 

Créer votre administrateur en vous connectant avec l'admin créé. (route: /auth/login, authorization: bearer)

Annuler la seed :
```sh
npx sequelize-cli db:seed:undo
``` 

# **Utilisation de l'API (avec l'utilitaire Postman)**

Installer l'utilitaire Postman.

Une fois l'API configurée, lancer Postman.

Entrer la route à utiliser.
****
# Liste des routes :
### Liste des Router :
```
/
```
```
/admin
```
```
/user
```
```
/public
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
#### admin
##### get
getAll
```
/
```
getOne
```
/:id
```
##### put
add
```
/
```
##### patch
update
```
/:id
```
##### post
untrash
```
/untrash/:id
```
##### delete
trash
```
/trash/:id
```
delete
```
/:id
```
#### user
##### **get**
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
##### **put**
add
```
/me
```
addIn
```
/route/:id
```
##### **patch**
update
```
/me/:id
```
##### **post**
untrash
```
/me/untrash/:id
```
##### **delete**
trash
```
/me/trash/:id
```
delete
```
/:id
```
deleteIn
```
/route/:id
```
#### public
##### **get**
getAll
```
/
```
getOne
```
/:id
```
****
# EXEMPLE
```http://localhost:8888/admin/menus/recipe/10``` en **PUT** permet d'ajouter la recette avec l'id ```10``` à un menu.

**Attention !** 
Certains paramètres comme ```menu_id``` sont à entrer dans le body (x-www-form-urlencoded)