/* Import des modules nécessaires */
const express = require("express");
const check = require("../../jsonwebtoken/check");
const dayOfWeekController = require("../../controllers/admin/dayOfWeek");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("DAYOFWEEK Time", event.toString());
  next();
});

/* GET */
router.get("/", dayOfWeekController.getAllDayOfWeeks);

/* GET ID */
router.get("/:id", dayOfWeekController.getDayOfWeek);

/* PUT */
router.put("", dayOfWeekController.addDayOfWeek);

/* PATCH ID & BODY*/
router.patch("/:id", dayOfWeekController.updateDayOfWeek);

/* POST UNTRASH */
router.post("/untrash/:id", dayOfWeekController.untrashDayOfWeek);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", dayOfWeekController.trashDayOfWeek);

/* HARD DELETE ID*/
router.delete("/:id", dayOfWeekController.deleteDayOfWeek);

module.exports = router;
