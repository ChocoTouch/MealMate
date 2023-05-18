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

/* GET ID */
router.get("/menus/:id", recipeController.getMenusForRecipe);

/* GET */
router.get("/ingredients/:id", recipeController.getIngredientsInRecipe);

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

/* PUT */
router.put("/ingredient/:id", recipeController.addIngredientInRecipe); //checkTokenMW

/* PUT */
router.put("/diet/:id", recipeController.addDietInRecipe); //checkTokenMW



module.exports = router;
