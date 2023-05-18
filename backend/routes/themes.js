/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const themeController = require("../controllers/theme");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Recipe Time", event.toString());
  next();
});

/* GET */
router.get("/", themeController.getAllThemes);

/* GET ID */
router.get("/:id", themeController.getTheme);

/* PUT */
router.put("", themeController.addTheme); //checkTokenMW

/* PATCH ID & BODY*/
router.patch("/:id", themeController.updateTheme); //checkTokenMW

/* POST UNTRASH */
router.post("/untrash/:id", themeController.untrashTheme); //checkTokenMW

/* SOFT DELETE TRASH */
router.delete("/trash/:id", themeController.trashTheme); //checkTokenMW

/* HARD DELETE ID*/
router.delete("/:id", themeController.deleteTheme); //checkTokenMW

/* GET ID */
router.get("/recipes/:id", themeController.getRecipesInTheme);


module.exports = router;
