/* Import des modules nécessaires */
const express = require("express");
const categoryController = require("../../controllers/public/category");

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

module.exports = router;
