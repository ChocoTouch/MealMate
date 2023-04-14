# MealMate
Application web de gestion de recettes et de menus.

# Lancement rapide de l'API

- Ouvrir le projet dans un terminal et lancer npm install dans le dossier backend.
- Créer un fichier .env dans le projet avec les variables d'environnements correspondantes aux informations de connexion vers la base de données, le port de l'API, les informations du jsonwebtoken ainsi que le sallage bcrypt. (JWT_DURING=1 hour,BCRYPT_SALT_ROUND=10,JWT_SECRET,JWT_SECRETADMIN,SERVER_PORT,DB_HOST,DB_PORT,DB_NAME,DB_USER ,DB_PASS)
- Lancer l'API avec la commande npm run dev
