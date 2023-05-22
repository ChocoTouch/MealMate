/* Import des modules nécessaires */
const express = require("express");
const mealController = require("../../controllers/admin/meal");

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

/* PUT */
router.put("", mealController.addMeal);

/* PATCH ID & BODY*/
router.patch("/:id", mealController.updateMeal);

/* POST UNTRASH */
router.post("/untrash/:id", mealController.untrashMeal);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", mealController.trashMeal);

/* HARD DELETE ID*/
router.delete("/:id", mealController.deleteMeal);

module.exports = router;
