/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const recipeController = require("../controllers/recipe");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Recipe Time", event.toString());
  next();
});

/* GET */
router.get("/", recipeController.getAllRecipes);

/* GET ID */
router.get("/:id", recipeController.getRecipe);

/* PUT */
router.put("", recipeController.addRecipe); //checkTokenMW

/* PATCH ID & BODY*/
router.patch("/:id", recipeController.updateRecipe); //checkTokenMW

/* POST UNTRASH */
router.post("/untrash/:id", recipeController.untrashRecipe); //checkTokenMW

/* SOFT DELETE TRASH */
router.delete("/trash/:id", recipeController.trashRecipe); //checkTokenMW

/* HARD DELETE ID*/
router.delete("/:id", recipeController.deleteRecipe); //checkTokenMW

/* GET ID */
router.get("/menus/:id", recipeController.getMenusForRecipe);

/* PUT */
router.put("/ingredients", recipeController.addIngredientInRecipe); //checkTokenMW

/* GET */
router.get("/ingredients/:id", recipeController.getIngredientsInRecipe);

module.exports = router;
