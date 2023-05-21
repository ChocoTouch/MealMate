/* Import des modules nécessaires */
const express = require("express");
const check = require("../jsonwebtoken/check");
const ingredientController = require("../controllers/admin/ingredient");

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
router.put("", check.checkAdminTokenMW, ingredientController.addIngredient);

/* PATCH ID & BODY*/
router.patch(
  "/:id",
  check.checkAdminTokenMW,
  ingredientController.updateIngredient
);

/* POST UNTRASH */
router.post(
  "/untrash/:id",
  check.checkAdminTokenMW,
  ingredientController.untrashIngredient
);

/* SOFT DELETE TRASH */
router.delete(
  "/trash/:id",
  check.checkAdminTokenMW,
  ingredientController.trashIngredient
);

/* HARD DELETE ID*/
router.delete(
  "/:id",
  check.checkAdminTokenMW,
  ingredientController.deleteIngredient
);

module.exports = router;
