/* Import des modules nécessaires */
const express = require("express");
const recipeController = require("../../controllers/public/recipe");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("RECIPE Time", event.toString());
  next();
});

/* GET */
router.get("/", recipeController.getAllRecipes);

/* GET ID */
router.get("/:id", recipeController.getRecipe);

/* GET ID */
router.get("/menus/:id", recipeController.getMenusForRecipe);

module.exports = router;
