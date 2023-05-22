/* Import des modules nécessaires */
const express = require("express");
const user_router = require("./users");
const recipes_router = require("./recipes");
const menus_router = require("./menus");
const categories_router = require("./categories");
const comments_router = require("./comments");
const courses_router = require("./courses");
const daysOfWeek_router = require("./daysOfWeek");
const diets_router = require("./diets");
const ingredients_router = require("./ingredients");
const meals_router = require("./meals");
const themes_router = require("./themes");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("USER ROUTER Time", event.toString());
  next();
});

router.use("/users", user_router);
router.use("/recipes", recipes_router);
router.use("/ingredients", ingredients_router);
router.use("/categories", categories_router);
router.use("/comments", comments_router);
router.use("/courses", courses_router);
router.use("/daysofweek", daysOfWeek_router);
router.use("/diets", diets_router);
router.use("/menus", menus_router);
router.use("/meals", meals_router);
router.use("/themes", themes_router);

module.exports = router;
