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
db.Commentaire = require("./models/commentaire")(sequelize);
db.Recette_ingredient = require("./models/recette_ingredient")(sequelize);

/* ManyToOne User Recette */
db.User.hasMany(db.Recette, { foreignKey: "user_id" });
db.Recette.belongsTo(db.User, { foreignKey: "user_id" });

/* ManyToOne User Recette */
db.User.hasMany(db.Menu, { foreignKey: "user_id" });
db.Menu.belongsTo(db.User, { foreignKey: "user_id" });

/* ManyToOne like Recette */
db.User.hasMany(db.Recette, { foreignKey: "nombrelike" });
db.Recette.belongsTo(db.User, { foreignKey: "nombrelike" });

/* ManyToOne like Menu */
db.User.hasMany(db.Menu, { foreignKey: "nombrelike" });
db.Menu.belongsTo(db.User, { foreignKey: "nombrelike" });

/* ManyToOne User Recette */
db.User.hasMany(db.Menu, { foreignKey: "user_id" });
db.Menu.belongsTo(db.User, { foreignKey: "user_id" });

/* Super ManyToMany Recette Ingredient */
db.Recette.belongsToMany(db.Ingredient, { through: db.Recette_ingredient });
db.Ingredient.belongsToMany(db.Recette, { through: db.Recette_ingredient });
db.Recette_ingredient.belongsTo(db.Ingredient);
db.Recette_ingredient.belongsTo(db.Recette);
db.Ingredient.hasMany(db.Recette_ingredient);
db.Recette.hasMany(db.Recette_ingredient);

/* ManyToOne Categorie Categorie */
db.Categorie.hasMany(db.Categorie, { foreignKey: "parent_id" });
db.Categorie.belongsTo(db.Categorie, { foreignKey: "parent_id" });

/* ManyToOne Categorie Ingredient */
db.Categorie.hasMany(db.Ingredient, { foreignKey: "categorie_id" });
db.Ingredient.belongsTo(db.Categorie, { foreignKey: "categorie_id" });

/* ManyToOne User Commentaire */
db.User.hasMany(db.Commentaire, { foreignKey: "user_id" });
db.Commentaire.belongsTo(db.User, { foreignKey: "user_id" });

/* ManyToOne Recette Commentaire */
db.Recette.hasMany(db.Commentaire, { foreignKey: "recette_id" });
db.Commentaire.belongsTo(db.Recette, { foreignKey: "recette_id" });

/* ManyToOne Menu Commentaire */
db.Menu.hasMany(db.Commentaire, { foreignKey: "menu_id" });
db.Commentaire.belongsTo(db.Menu, { foreignKey: "menu_id" });

/* ManyToOne like Commentaire */
db.User.hasMany(db.Commentaire, { foreignKey: "nombrelike" });
db.Commentaire.belongsTo(db.User, { foreignKey: "nombrelike" });

/* Synchronisation des modèles */
sequelize.sync({alter : true},{force: true});

module.exports = db;
