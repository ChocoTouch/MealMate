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
db.Menu_recette = require("./models/menu_recette")(sequelize);
db.Ingredient_categorie = require("./models/ingredient_categorie")(sequelize);
db.Liker_menu = require("./models/liker_menu")(sequelize);
db.Liker_recette = require("./models/liker_recette")(sequelize);
db.Liker_commentaire = require("./models/liker_commentaire")(sequelize);

/* ManyToOne User Recette */
db.User.hasMany(db.Recette, { foreignKey: "user_id" });
db.Recette.belongsTo(db.User, { foreignKey: "user_id" });

/* ManyToOne User Menu */
db.User.hasMany(db.Menu, { foreignKey: "user_id" });
db.Menu.belongsTo(db.User, { foreignKey: "user_id" });

/* ManyToOne User Commentaire */
db.User.hasMany(db.Commentaire, { foreignKey: "user_id" });
db.Commentaire.belongsTo(db.User, { foreignKey: "user_id" });

/* Super ManyToMany User Like Recette */
db.User.belongsToMany(db.Recette, { through: db.Liker_recette });
db.Recette.belongsToMany(db.User, { through: db.Liker_recette });
db.Liker_recette.belongsTo(db.User);
db.Liker_recette.belongsTo(db.Recette);
db.User.hasMany(db.Liker_recette);
db.Recette.hasMany(db.Liker_recette);

/* Super ManyToMany User Like Menu */
db.User.belongsToMany(db.Menu, { through: db.Liker_menu });
db.Menu.belongsToMany(db.User, { through: db.Liker_menu });
db.Liker_menu.belongsTo(db.User);
db.Liker_menu.belongsTo(db.Menu);
db.User.hasMany(db.Liker_menu);
db.Menu.hasMany(db.Liker_menu);

/* ManyToOne User Like Commentaire */
db.User.belongsToMany(db.Commentaire, { through: db.Liker_commentaire });
db.Commentaire.belongsToMany(db.User, { through: db.Liker_commentaire });
db.Liker_commentaire.belongsTo(db.User);
db.Liker_commentaire.belongsTo(db.Commentaire);
db.User.hasMany(db.Liker_commentaire);
db.Commentaire.hasMany(db.Liker_commentaire);

/* Super ManyToMany Recette Ingredient */
db.Recette.belongsToMany(db.Ingredient, { through: db.Recette_ingredient });
db.Ingredient.belongsToMany(db.Recette, { through: db.Recette_ingredient });
db.Recette_ingredient.belongsTo(db.Ingredient);
db.Recette_ingredient.belongsTo(db.Recette);
db.Ingredient.hasMany(db.Recette_ingredient);
db.Recette.hasMany(db.Recette_ingredient);

/* Super ManyToMany Menu Recette */
db.Menu.belongsToMany(db.Recette, { through: db.Menu_recette });
db.Recette.belongsToMany(db.Menu, { through: db.Menu_recette });
db.Menu_recette.belongsTo(db.Recette);
db.Menu_recette.belongsTo(db.Menu);
db.Recette.hasMany(db.Menu_recette);
db.Menu.hasMany(db.Menu_recette);

/* Super ManyToMany Categorie Ingredient */
db.Ingredient.belongsToMany(db.Categorie, { through: db.Ingredient_categorie });
db.Categorie.belongsToMany(db.Ingredient, { through: db.Ingredient_categorie });
db.Ingredient_categorie.belongsTo(db.Ingredient);
db.Ingredient_categorie.belongsTo(db.Categorie);
db.Ingredient.hasMany(db.Ingredient_categorie);
db.Categorie.hasMany(db.Ingredient_categorie);

/* ManyToOne Recette Commentaire */
db.Recette.hasMany(db.Commentaire, { foreignKey: "recette_id" });
db.Commentaire.belongsTo(db.Recette, { foreignKey: "recette_id" });

/* ManyToOne Menu Commentaire */
db.Menu.hasMany(db.Commentaire, { foreignKey: "menu_id" });
db.Commentaire.belongsTo(db.Menu, { foreignKey: "menu_id" });

/* Synchronisation des modèles */
//{alter:true}{force:true}
sequelize.sync({ alter: true });

module.exports = db;
