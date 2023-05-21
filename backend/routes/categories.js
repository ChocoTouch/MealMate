/* Import des modules nécessaires */
const express = require("express");
const check = require("../jsonwebtoken/check");
const categoryController = require("../controllers/admin/category");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Recipe Time", event.toString());
  next();
});

/* GET */
router.get("/", categoryController.getAllCategories);

/* GET ID */
router.get("/:id", categoryController.getCategory);

/* GET ID */
router.get("/ingredients/:id", categoryController.getIngredientsInCategory);

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

module.exports = router;
