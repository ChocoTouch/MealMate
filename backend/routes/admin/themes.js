/* Import des modules nécessaires */
const express = require("express");
const themeController = require("../../controllers/admin/theme");

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

/* PUT */
router.put("", themeController.addTheme);

/* PATCH ID & BODY*/
router.patch("/:id", themeController.updateTheme);

/* POST UNTRASH */
router.post(
  "/untrash/:id",
  themeController.untrashTheme
);

/* SOFT DELETE TRASH */
router.delete(
  "/trash/:id",
  themeController.trashTheme
);

/* HARD DELETE ID*/
router.delete("/:id", themeController.deleteTheme);

/* GET ID */
router.get("/recipes/:id", themeController.getRecipesForTheme);

module.exports = router;
