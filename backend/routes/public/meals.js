/* Import des modules nécessaires */
const express = require("express");
const mealController = require("../../controllers/public/meal");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("MEAL Time", event.toString());
  next();
});

/* GET */
router.get("/", mealController.getAllMeals);

/* GET ID */
router.get("/:id", mealController.getMeal);

module.exports = router;
