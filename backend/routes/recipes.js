/* Import des modules nécessaires */
const express = require("express");
const recipeController = require("../controllers/recipe");
const check = require("../jsonwebtoken/check");

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

/* GET */
router.get("/me", check.checkTokenMW, recipeController.getMyRecipes);

/* GET ID */
router.get("/:id", recipeController.getRecipe);

/* GET ID */
router.get(
  "/menus/:id",
  check.checkTokenMW,
  recipeController.getMenusForRecipe
);

/* GET */
router.get("/ingredients/:id", recipeController.getIngredientsInRecipe);

/* GET */
router.get("/diets/:id", recipeController.getDietsInRecipe);

/* PUT */
router.put("", check.checkAdminTokenMW, recipeController.addRecipe);

/* PATCH ID & BODY*/
router.patch("/:id", check.checkAdminTokenMW, recipeController.updateRecipe);

/* POST UNTRASH */
router.post(
  "/untrash/:id",
  check.checkAdminTokenMW,
  recipeController.untrashRecipe
);

/* SOFT DELETE TRASH */
router.delete(
  "/trash/:id",
  check.checkAdminTokenMW,
  recipeController.trashRecipe
);

/* HARD DELETE ID*/
router.delete("/:id", check.checkAdminTokenMW, recipeController.deleteRecipe);

/* PUT */
router.put(
  "/ingredient/:id",
  check.checkTokenMW,
  recipeController.addIngredientInMyRecipe
);

/* PUT */
router.put("/diet/:id", check.checkTokenMW, recipeController.addDietInMyRecipe);

module.exports = router;
