/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const dayOfWeekController = require("../controllers/dayOfWeek");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Recipe Time", event.toString());
  next();
});

/* GET */
router.get("/", dayOfWeekController.getAllDayOfWeeks);

/* GET ID */
router.get("/:id", dayOfWeekController.getDayOfWeek);

/* PUT */
router.put("", dayOfWeekController.addDayOfWeek); //checkTokenMW

/* PATCH ID & BODY*/
router.patch("/:id", dayOfWeekController.updateDayOfWeek); //checkTokenMW

/* POST UNTRASH */
router.post("/untrash/:id", dayOfWeekController.untrashDayOfWeek); //checkTokenMW

/* SOFT DELETE TRASH */
router.delete("/trash/:id", dayOfWeekController.trashDayOfWeek); //checkTokenMW

/* HARD DELETE ID*/
router.delete("/:id", dayOfWeekController.deleteDayOfWeek); //checkTokenMW

module.exports = router;
