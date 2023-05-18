/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const categoryController = require("../controllers/category");

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

/* PUT */
router.put("", categoryController.addCategory); //checkTokenMW

/* PATCH ID & BODY*/
router.patch("/:id", categoryController.updateCategory); //checkTokenMW

/* POST UNTRASH */
router.post("/untrash/:id", categoryController.untrashCategory); //checkTokenMW

/* SOFT DELETE TRASH */
router.delete("/trash/:id", categoryController.trashCategory); //checkTokenMW

/* HARD DELETE ID*/
router.delete("/:id", categoryController.deleteCategory); //checkTokenMW

/* PUT */
router.put("/ingredient/:id", categoryController.addIngredientInCategory); //checkTokenMW

module.exports = router;
