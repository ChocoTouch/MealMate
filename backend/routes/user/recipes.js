/* Import des modules nécessaires */
const express = require("express");
const recipeController = require("../../controllers/user/recipe");

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

/* GET */
router.get("/me", recipeController.getMyRecipes);

/* GET ID */
router.get("/:id", recipeController.getRecipe);

/* PUT */
router.put("/ingredient/:id", recipeController.addIngredientInMyRecipe);

/* PUT */
router.put("/diet/:id", recipeController.addDietInMyRecipe);

module.exports = router;
