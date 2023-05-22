/* Import des modules nécessaires */
const express = require("express");
const dietController = require("../../controllers/public/diet");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("DIET Time", event.toString());
  next();
});

/* GET */
router.get("/", dietController.getAllDiets);

/* GET ID */
router.get("/:id", dietController.getDiet);

module.exports = router;
