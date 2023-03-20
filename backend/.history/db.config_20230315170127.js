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
db.sequelize = sequelize;
db.User = require("./models/user")(sequelize);
db.Recette = require("./models/recette")(sequelize);
db.Ingredient = require("./models/ingredient")(sequelize);
db.Menu = require("./models/menu")(sequelize);
db.Categorie = require("./models/categorie")(sequelize);
db.Recette_ingredient = require("./models/recette_ingredient")(sequelize);
/* ManyToOne User Recette */
db.User.hasMany(db.Recette, { foreignKey: "user_id" });
db.Recette.belongsTo(db.User, { foreignKey: "user_id" });

/* ManyToOne like Recette */
db.Recette.hasMany(db.User, { foreignKey: "nombrelike" });
db.User.belongsTo(db.Recette, { foreignKey: "nombrelike" });

/* ManyToOne User Recette */
db.User.hasMany(db.Menu, { foreignKey: "user_id" });
db.Menu.belongsTo(db.User, { foreignKey: "user_id" });

/* ManyToMany Recette Ingredient */
db.Recette.belongsToMany(db.Ingredient, { through: db.Recette_ingredient });
db.Ingredient.belongsToMany(db.Recette, { through: db.Recette_ingredient });

/* ManyToOne Categorie Categorie */
db.Categorie.hasMany(db.Categorie, { foreignKey: "parent_id" });
db.Categorie.belongsTo(db.Categorie, { foreignKey: "parent_id" });

/* ManyToOne */
db.

/* Synchronisation des modèles */
sequelize.sync((err) => {
    console.log("Database Sync Error", err);
});

module.exports = db;
