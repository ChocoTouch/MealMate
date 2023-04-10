/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const menuRecetteController = require("../controllers/menu_recette");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Recette Time", event.toString());
  next();
});

/* Routage de la ressource Recette (Ensemble des Recettes) */
router.get("/:id", menuRecetteController.getAllMenusForRecette);

/* GET ID (Recette spécifique)*/
//router.get("/:id", menuRecetteController.getRecette);

/* PUT */
//router.put("", checkTokenMW, menuRecetteController.addRecette);

/* PATCH ID & BODY*/
//router.patch("/:id", checkTokenMW, menuRecetteController.updateRecette);

/* POST UNTRASH */
//router.post("/untrash/:id", checkTokenMW, menuRecetteController.untrashRecette);

/* SOFT DELETE TRASH */
//router.delete("/trash/:id", checkTokenMW, menuRecetteController.trashRecette);

/* HARD DELETE ID*/
//router.delete("/:id", checkTokenMW, menuRecetteController.deleteRecette);

module.exports = router;
