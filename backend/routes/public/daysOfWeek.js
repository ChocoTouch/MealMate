/* Import des modules nécessaires */
const express = require("express");
const dayOfWeekController = require("../../controllers/public/dayOfWeek");

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

module.exports = router;
