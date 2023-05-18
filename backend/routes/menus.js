/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const menuController = require("../controllers/menu");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Menu Time", event.toString());
  next();
});

/* GET */
router.get("/", menuController.getAllMenus);

/* GET ID */
router.get("/:id", menuController.getMenu);

/* PUT */
router.put("", menuController.addMenu); //checkTokenMW

/* PATCH ID & BODY*/
router.patch("/:id", menuController.updateMenu); //checkTokenMW

/* POST UNTRASH */
router.post("/untrash/:id", menuController.untrashMenu); //checkTokenMW

/* SOFT DELETE TRASH */
router.delete("/trash/:id", menuController.trashMenu); //checkTokenMW

/* HARD DELETE ID*/
router.delete("/:id", menuController.deleteMenu); //checkTokenMW

/* PUT */
router.put("/meal/:id", menuController.addMealInMenu); //checkTokenMW

/* PUT */
router.put("/recipe/:id", menuController.addRecipeInMenu); //checkTokenMW

/* PUT */
router.put("/day/:id", menuController.addDayOfWeekInMenu); //checkTokenMW

/* PUT */
router.put("/course/:id", menuController.addCourseInMenu); //checkTokenMW

/* GET ID */
router.get("/recipes/:id", menuController.getRecipesInMenu);

module.exports = router;
