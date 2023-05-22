/* Import des modules nécessaires */
const express = require("express");
const themeController = require("../../controllers/user/theme");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("THEME Time", event.toString());
  next();
});

/* GET */
router.get("/", themeController.getAllThemes);

/* GET ID */
router.get("/:id", themeController.getTheme);

/* GET ID */
router.get("/recipes/:id", themeController.getRecipesForTheme);

module.exports = router;
