/* Import des modules nécessaires */
const express = require("express");
const menuController = require("../../controllers/public/menu");

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
router.get("/:id", menuController.getMenu);

module.exports = router;
