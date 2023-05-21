/* Import des modules nécessaires */
const express = require("express");
const check = require("../jsonwebtoken/check");
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
router.put("", check.checkAdminTokenMW, menuController.addMenu);

/* PATCH ID & BODY*/
router.patch("/:id", check.checkAdminTokenMW, menuController.updateMenu);

/* POST UNTRASH */
router.post(
  "/untrash/:id",
  check.checkAdminTokenMW,
  menuController.untrashMenu
);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", check.checkAdminTokenMW, menuController.trashMenu);

/* HARD DELETE ID*/
router.delete("/:id", check.checkAdminTokenMW, menuController.deleteMenu);

/* PUT */
router.put("/meal/:id", check.checkTokenMW, menuController.addMealInMyMenu);

/* PUT */
router.put("/recipe/:id", check.checkTokenMW, menuController.addRecipeInMyMenu);

/* PUT */
router.put("/day/:id", check.checkTokenMW, menuController.addDayOfWeekInMyMenu);

/* PUT */
router.put("/course/:id", check.checkTokenMW, menuController.addCourseInMyMenu);

/* GET ID */
router.get("/recipes/:id", check.checkTokenMW, menuController.getRecipesInMenu);

module.exports = router;
