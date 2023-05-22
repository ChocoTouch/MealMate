/* Import des modules nécessaires */
const express = require("express");
const categoryController = require("../../controllers/admin/category");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("CATEGORY Time", event.toString());
  next();
});

/* GET */
router.get("/", categoryController.getAllCategories);

/* GET ID */
router.get("/:id", categoryController.getCategory);

/* PUT */
router.put("", categoryController.addCategory);

/* PATCH ID & BODY*/
router.patch("/:id", categoryController.updateCategory);

/* POST UNTRASH */
router.post("/untrash/:id", categoryController.untrashCategory);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", categoryController.trashCategory);

/* HARD DELETE ID*/
router.delete("/:id", categoryController.deleteCategory);

/* PUT */
router.put("/ingredient/:id", categoryController.addIngredientInCategory);

/* PUT */
router.delete("/ingredient/:id", categoryController.deleteIngredientInCategory);

module.exports = router;
