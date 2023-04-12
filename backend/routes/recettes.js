/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const recetteController = require("../controllers/recette");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Recette Time", event.toString());
  next();
});

/* GET */
router.get("/", recetteController.getAllRecettes);

/* GET ID */
router.get("/:id", recetteController.getRecette);

/* PUT */
router.put("", recetteController.addRecette); //checkTokenMW

/* PATCH ID & BODY*/
router.patch("/:id", recetteController.updateRecette); //checkTokenMW

/* POST UNTRASH */
router.post("/untrash/:id", recetteController.untrashRecette); //checkTokenMW

/* SOFT DELETE TRASH */
router.delete("/trash/:id", recetteController.trashRecette); //checkTokenMW

/* HARD DELETE ID*/
router.delete("/:id", recetteController.deleteRecette); //checkTokenMW

/* GET ID */
router.get("/menus/:id", recetteController.getMenusForRecette);

/* PUT */
router.put("/ingredients", recetteController.addRecetteIngredient); //checkTokenMW

/* GET */
router.get("/ingredients/:id", recetteController.getIngredientsForRecette);

module.exports = router;
