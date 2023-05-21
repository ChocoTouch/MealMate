/* Import des modules nécessaires */
const express = require("express");
const themeController = require("../controllers/admin/theme");
const check = require("../jsonwebtoken/check");

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
router.put("", check.checkAdminTokenMW, themeController.addTheme);

/* PATCH ID & BODY*/
router.patch("/:id", check.checkAdminTokenMW, themeController.updateTheme);

/* POST UNTRASH */
router.post(
  "/untrash/:id",
  check.checkAdminTokenMW,
  themeController.untrashTheme
);

/* SOFT DELETE TRASH */
router.delete(
  "/trash/:id",
  check.checkAdminTokenMW,
  themeController.trashTheme
);

/* HARD DELETE ID*/
router.delete("/:id", check.checkAdminTokenMW, themeController.deleteTheme);

/* GET ID */
router.get("/recipes/:id", themeController.getRecipesInTheme);

module.exports = router;
