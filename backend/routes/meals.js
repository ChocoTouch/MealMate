/* Import des modules nécessaires */
const express = require("express");
const check = require("../jsonwebtoken/check");
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
router.put("", check.checkAdminTokenMW, mealController.addMeal);

/* PATCH ID & BODY*/
router.patch("/:id", check.checkAdminTokenMW, mealController.updateMeal);

/* POST UNTRASH */
router.post(
  "/untrash/:id",
  check.checkAdminTokenMW,
  mealController.untrashMeal
);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", check.checkAdminTokenMW, mealController.trashMeal);

/* HARD DELETE ID*/
router.delete("/:id", check.checkAdminTokenMW, mealController.deleteMeal);

module.exports = router;
