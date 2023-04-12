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
router.put("/recettes", menuController.addMenuRecette); //checkTokenMW

/* GET ID */
router.get("/recettes/:id", menuController.getRecettesForMenu);

module.exports = router;
