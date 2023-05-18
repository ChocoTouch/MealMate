/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const mealController = require("../controllers/meal");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Recipe Time", event.toString());
  next();
});

/* GET */
router.get("/", mealController.getAllMeals);

/* GET ID */
router.get("/:id", mealController.getMeal);

/* PUT */
router.put("", mealController.addMeal); //checkTokenMW

/* PATCH ID & BODY*/
router.patch("/:id", mealController.updateMeal); //checkTokenMW

/* POST UNTRASH */
router.post("/untrash/:id", mealController.untrashMeal); //checkTokenMW

/* SOFT DELETE TRASH */
router.delete("/trash/:id", mealController.trashMeal); //checkTokenMW

/* HARD DELETE ID*/
router.delete("/:id", mealController.deleteMeal); //checkTokenMW

module.exports = router;
