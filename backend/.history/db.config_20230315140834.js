/* Import des modules nécessaires */
const { Sequelize } = require("sequelize");

/* Connexion à la base de données */
let sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);


/* Mise en relation des modèles SEQUELIZE */
const db = {};
db.User = require('./models/user')(sequelize)
db.Recette = require('./models/recette')(sequelize)


/* Synchronisation des modèles */
sequelize.sync(err => {
  console.log('Database Sync Error', err)
})

module.exports = sequelize;
