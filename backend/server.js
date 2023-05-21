/* Import des modules */
const express = require("express");
const cors = require("cors");
const checkTokenMW = require("./jsonwebtoken/check");
const checkAdminTokenMW = require("./jsonwebtoken/checkadmin");
const errorHandler = require("./error/errorHandler");

/* Import de la connexion à la base de données */
let DB = require("./db.config");

/* Initialisation de l'API */
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Import des modules de routage */
const user_router = require("./routes/users");
const auth_router = require("./routes/auth");
const recipes_router = require("./routes/recipes");
const menus_router = require("./routes/menus");
const categories_router = require("./routes/categories");
const comments_router = require("./routes/comments");
const courses_router = require("./routes/courses");
const daysOfWeek_router = require("./routes/daysOfWeek");
const diets_router = require("./routes/diets");
const ingredients_router = require("./routes/ingredients");
const meals_router = require("./routes/meals");
const themes_router = require("./routes/themes");

/* Mise en place du routage */
app.get("/", (req, res) =>
  res.send(`Welcome to the MealMate API by Bauchet Anthony`)
);
app.use("/users",user_router); //checkAdminTokenMW,
app.use("/auth", auth_router);
app.use("/recipes", recipes_router); //checkTokenMW
app.use("/ingredients", ingredients_router);
app.use("/categories", categories_router);
app.use("/comments", comments_router);
app.use("/courses", courses_router);
app.use("/daysofweek", daysOfWeek_router);
app.use("/diets", diets_router);
app.use("/menus", menus_router);
app.use("/meals", meals_router);
app.use("/themes", themes_router);
app.get("*", (req, res) => res.status(501).send("Ressource non existant"));
app.use(errorHandler);

/* Demarrage serveur avec test DB*/
DB.sequelize
  .authenticate()
  .then(() => console.log("Database connection OK"))
  .then(() => {
    app.listen(process.env.SERVER_PORT, () => {
      console.log(
        `Server running on ${process.env.SERVER_PORT}. Enjoy your stay !`
      );
    });
  })
  .catch((err) => console.log("Database Error", err));
