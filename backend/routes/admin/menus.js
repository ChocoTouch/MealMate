/* Import des modules nécessaires */
const express = require("express");
const menuController = require("../../controllers/admin/menu");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("MENU Time", event.toString());
  next();
});

/* GET */
router.get("/", menuController.getAllMenus);

/* GET ID */
router.get("/me", menuController.getMyMenus);

/* GET ID */
router.get("/:id", menuController.getMenu);

/* PUT */
router.put("", menuController.addMenu);

/* PATCH ID & BODY*/
router.patch("/:id", menuController.updateMenu);

/* POST UNTRASH */
router.post("/untrash/:id", menuController.untrashMenu);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", menuController.trashMenu);

/* HARD DELETE ID*/
router.delete("/:id", menuController.deleteMenu);

/* PUT */
router.put("/meal/:id", menuController.addMealInMyMenu);

/* PUT */
router.put("/recipe/:id", menuController.addRecipeInMyMenu);

/* PUT */
router.put("/day/:id", menuController.addDayOfWeekInMyMenu);

/* PUT */
router.put("/course/:id", menuController.addCourseInMyMenu);

module.exports = router;
