/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const ingredientController = require("../controllers/ingredient");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Ingredients Time", event.toString());
  next();
});

/* GET */
router.get("/", ingredientController.getAllIngredients);

/* GET ID */
router.get("/:id", ingredientController.getIngredient);

/* GET ID */
router.get("/recipes/:id", ingredientController.getRecipesForIngredient);

/* PUT */
router.put("", ingredientController.addIngredient); //checkTokenMW

/* PATCH ID & BODY*/
router.patch("/:id", ingredientController.updateIngredient); //checkTokenMW

/* POST UNTRASH */
router.post("/untrash/:id", ingredientController.untrashIngredient); //checkTokenMW

/* SOFT DELETE TRASH */
router.delete("/trash/:id", ingredientController.trashIngredient); //checkTokenMW

/* HARD DELETE ID*/
router.delete("/:id", ingredientController.deleteIngredient); //checkTokenMW

module.exports = router;
