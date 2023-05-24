/* Import des modules nécessaires */
const express = require("express");
const ingredientController = require("../../controllers/user/ingredient");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("INGREDIENT Time", event.toString());
  next();
});

/* GET */
router.get("/", ingredientController.getAllIngredients);

/* GET ID */
router.get("/:id", ingredientController.getIngredient);

module.exports = router;
