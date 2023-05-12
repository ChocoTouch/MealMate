/* Import des modules nécesss */
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
db.Recipe = require("./models/recipe")(sequelize);
db.Ingredient = require("./models/ingredient")(sequelize);
db.Menu = require("./models/menu")(sequelize);
db.category = require("./models/category")(sequelize);
db.Comment = require("./models/comment")(sequelize);
db.Theme = require("./models/theme")(sequelize);
db.Diet = require("./models/diet")(sequelize);
db.Recipe_ingredient = require("./models/recipe_ingredient")(sequelize);
db.Menu_recipe = require("./models/menu_recipe")(sequelize);
db.Ingredient_category = require("./models/ingredient_category")(sequelize);
db.Liker_menu = require("./models/like_menu")(sequelize);
db.Liker_recipe = require("./models/like_recipe")(sequelize);
db.Liker_comment = require("./models/like_comment")(sequelize);

/* ManyToOne Theme Recipe */
db.Theme.hasMany(db.Recipe, { foreignKey: "theme_id" });
db.Recipe.belongsTo(db.Theme, { foreignKey: "theme_id" });

/* ManyToOne User Recipe */
db.User.hasMany(db.Recipe, { foreignKey: "user_id" });
db.Recipe.belongsTo(db.User, { foreignKey: "user_id" });

/* ManyToOne User Menu */
db.User.hasMany(db.Menu, { foreignKey: "user_id" });
db.Menu.belongsTo(db.User, { foreignKey: "user_id" });

/* ManyToOne User Comment */
db.User.hasMany(db.Comment, { foreignKey: "user_id" });
db.Comment.belongsTo(db.User, { foreignKey: "user_id" });

/* Super ManyToMany User Like Recipe */
db.User.belongsToMany(db.Recipe, { through: db.Liker_recipe });
db.Recipe.belongsToMany(db.User, { through: db.Liker_recipe });
db.Liker_recipe.belongsTo(db.User);
db.Liker_recipe.belongsTo(db.Recipe);
db.User.hasMany(db.Liker_recipe);
db.Recipe.hasMany(db.Liker_recipe);

/* Super ManyToMany User Like Menu */
db.User.belongsToMany(db.Menu, { through: db.Liker_menu });
db.Menu.belongsToMany(db.User, { through: db.Liker_menu });
db.Liker_menu.belongsTo(db.User);
db.Liker_menu.belongsTo(db.Menu);
db.User.hasMany(db.Liker_menu);
db.Menu.hasMany(db.Liker_menu);

/* ManyToOne User Like Comment */
db.User.belongsToMany(db.Comment, { through: db.Liker_comment });
db.Comment.belongsToMany(db.User, { through: db.Liker_comment });
db.Liker_comment.belongsTo(db.User);
db.Liker_comment.belongsTo(db.Comment);
db.User.hasMany(db.Liker_comment);
db.Comment.hasMany(db.Liker_comment);

/* Super ManyToMany Recipe Ingredient */
db.Recipe.belongsToMany(db.Ingredient, { through: db.Recipe_ingredient });
db.Ingredient.belongsToMany(db.Recipe, { through: db.Recipe_ingredient });
db.Recipe_ingredient.belongsTo(db.Ingredient);
db.Recipe_ingredient.belongsTo(db.Recipe);
db.Ingredient.hasMany(db.Recipe_ingredient);
db.Recipe.hasMany(db.Recipe_ingredient);

/* Super ManyToMany Menu Recipe */
db.Menu.belongsToMany(db.Recipe, { through: db.Menu_recipe });
db.Recipe.belongsToMany(db.Menu, { through: db.Menu_recipe });
db.Menu_recipe.belongsTo(db.Recipe);
db.Menu_recipe.belongsTo(db.Menu);
db.Recipe.hasMany(db.Menu_recipe);
db.Menu.hasMany(db.Menu_recipe);

/* Super ManyToMany category Ingredient */
db.Ingredient.belongsToMany(db.category, { through: db.Ingredient_category });
db.category.belongsToMany(db.Ingredient, { through: db.Ingredient_category });
db.Ingredient_category.belongsTo(db.Ingredient);
db.Ingredient_category.belongsTo(db.category);
db.Ingredient.hasMany(db.Ingredient_category);
db.category.hasMany(db.Ingredient_category);

/* ManyToOne Recipe Comment */
db.Recipe.hasMany(db.Comment, { foreignKey: "recipe_id" });
db.Comment.belongsTo(db.Recipe, { foreignKey: "recipe_id" });

/* ManyToOne Menu Comment */
db.Menu.hasMany(db.Comment, { foreignKey: "menu_id" });
db.Comment.belongsTo(db.Menu, { foreignKey: "menu_id" });

/* Synchronisation des modèles */
//{alter:true}{force:true}
sequelize.sync();

module.exports = db;
