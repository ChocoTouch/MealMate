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
db.Recipe = require("./models/recipe")(sequelize);
db.Ingredient = require("./models/ingredient")(sequelize);
db.Menu = require("./models/menu")(sequelize);
db.Category = require("./models/category")(sequelize);
db.Comment = require("./models/comment")(sequelize);
db.Theme = require("./models/theme")(sequelize);
db.Diet = require("./models/diet")(sequelize);
db.Recipe_diet = require("./models/recipe_diet")(sequelize);
db.Course = require("./models/course")(sequelize);
//db.Course_menu = require("./models/course_menu")(sequelize);
db.DayOfWeek = require("./models/dayOfWeek")(sequelize);
//db.DayOfWeek_menu = require("./models/dayOfWeek_menu")(sequelize);
db.Meal = require("./models/meal")(sequelize);
//db.Meal_menu = require("./models/meal_menu")(sequelize);
db.Recipe_ingredient = require("./models/recipe_ingredient")(sequelize);
db.Menu_recipe = require("./models/menu_recipe")(sequelize);
db.Ingredient_category = require("./models/ingredient_category")(sequelize);


/* ManyToOne Course Menu_Recipe */
db.Course.hasMany(db.Menu_recipe, { foreignKey: "course_id" });
db.Menu_recipe.belongsTo(db.Course, { foreignKey: "course_id" });

/* ManyToOne DayOfWeek Menu_Recipe */
db.DayOfWeek.hasMany(db.Menu_recipe, { foreignKey: "day_id" });
db.Menu_recipe.belongsTo(db.DayOfWeek, { foreignKey: "day_id" });

/* ManyToOne Meal Menu_Recipe */
db.Meal.hasMany(db.Menu_recipe, { foreignKey: "meal_id" });
db.Menu_recipe.belongsTo(db.Meal, { foreignKey: "meal_id" });

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

/* Super ManyToMany Category Ingredient */
db.Ingredient.belongsToMany(db.Category, { through: db.Ingredient_category });
db.Category.belongsToMany(db.Ingredient, { through: db.Ingredient_category });
db.Ingredient_category.belongsTo(db.Ingredient);
db.Ingredient_category.belongsTo(db.Category);
db.Ingredient.hasMany(db.Ingredient_category);
db.Category.hasMany(db.Ingredient_category);

/* ManyToOne Recipe Comment */
db.Recipe.hasMany(db.Comment, { foreignKey: "recipe_id" });
db.Comment.belongsTo(db.Recipe, { foreignKey: "recipe_id" });

/* ManyToOne Menu Comment */
db.Menu.hasMany(db.Comment, { foreignKey: "menu_id" });
db.Comment.belongsTo(db.Menu, { foreignKey: "menu_id" });


/* Super ManyToMany Menu Course */
// db.Course.belongsToMany(db.Menu, { through: db.Course_menu });
// db.Menu.belongsToMany(db.Course, { through: db.Course_menu });
// db.Course_menu.belongsTo(db.Course);
// db.Course_menu.belongsTo(db.Menu);
// db.Course.hasMany(db.Course_menu);
// db.Menu.hasMany(db.Course_menu);

/* Super ManyToMany DayOfWeek Menu */
// db.DayOfWeek.belongsToMany(db.Menu, { through: db.DayOfWeek_menu });
// db.Menu.belongsToMany(db.DayOfWeek, { through: db.DayOfWeek_menu });
// db.DayOfWeek_menu.belongsTo(db.DayOfWeek);
// db.DayOfWeek_menu.belongsTo(db.Menu);
// db.DayOfWeek.hasMany(db.DayOfWeek_menu);
// db.Menu.hasMany(db.DayOfWeek_menu);

/* Super ManyToMany Meal Menu */
// db.Meal.belongsToMany(db.Menu, { through: db.Meal_menu });
// db.Menu.belongsToMany(db.Meal, { through: db.Meal_menu });
// db.Meal_menu.belongsTo(db.Meal);
// db.Meal_menu.belongsTo(db.Menu);
// db.Meal.hasMany(db.Meal_menu);
// db.Menu.hasMany(db.Meal_menu);

/* Super ManyToMany Recipe Diet */
db.Recipe.belongsToMany(db.Diet, { through: db.Recipe_diet });
db.Diet.belongsToMany(db.Recipe, { through: db.Recipe_diet });
db.Recipe_diet.belongsTo(db.Recipe);
db.Recipe_diet.belongsTo(db.Diet);
db.Recipe.hasMany(db.Recipe_diet);
db.Diet.hasMany(db.Recipe_diet);

/* Synchronisation des modèles */
//{alter:true}{force:true}
sequelize.sync();

module.exports = db;
