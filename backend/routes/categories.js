/* Import des modules nécessaires */
const express = require("express");
const check = require("../jsonwebtoken/check");
const categoryController = require("../controllers/category");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("INGREDIENT Time", event.toString());
  next();
});

/* GET */
router.get("/", categoryController.getAllCategories);

/* GET ID */
router.get("/ingredients/:id", categoryController.getIngredientsInCategory);

/* GET ID */
router.get("/:id", categoryController.getCategory);



/* PUT */
router.put("", check.checkAdminTokenMW, categoryController.addCategory);

/* PATCH ID & BODY*/
router.patch(
  "/:id",
  check.checkAdminTokenMW,
  categoryController.updateCategory
);

/* POST UNTRASH */
router.post(
  "/untrash/:id",
  check.checkAdminTokenMW,
  categoryController.untrashCategory
);

/* SOFT DELETE TRASH */
router.delete(
  "/trash/:id",
  check.checkAdminTokenMW,
  categoryController.trashCategory
);

/* HARD DELETE ID*/
router.delete(
  "/:id",
  check.checkAdminTokenMW,
  categoryController.deleteCategory
);

/* PUT */
router.put(
  "/ingredient/:id",
  check.checkAdminTokenMW,
  categoryController.addIngredientInCategory
);

/* PUT */
router.delete(
  "/ingredient/:id",
  check.checkAdminTokenMW,
  categoryController.deleteIngredientInCategory
);

module.exports = router;
