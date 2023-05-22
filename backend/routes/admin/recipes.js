/* Import des modules nécessaires */
const express = require("express");
const recipeController = require("../../controllers/admin/recipe");

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

/* GET ID */
router.get("/menus/:id", recipeController.getMenusForRecipe);

/* PUT */
router.put("", recipeController.addRecipe);

/* PATCH ID & BODY*/
router.patch("/:id", recipeController.updateRecipe);

/* POST UNTRASH */
router.post("/untrash/:id", recipeController.untrashRecipe);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", recipeController.trashRecipe);

/* HARD DELETE ID*/
router.delete("/:id", recipeController.deleteRecipe);

/* PUT */
router.put("/ingredient/:id", recipeController.addIngredientInMyRecipe);

/* PUT */
router.put("/diet/:id", recipeController.addDietInMyRecipe);

module.exports = router;
