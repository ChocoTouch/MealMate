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

/* Routage de la ressource Recette (Ensemble des Recettes) */
router.get("/", checkTokenMW, recetteController.getAllRecipes);

/* GET ID (Recette spécifique)*/
router.get("/:id", recetteController.getRecipe);

/* PUT */
router.put("", recetteController.addRecipe);

/* PATCH ID & BODY*/
router.patch("/:id", recetteController.updateRecipe);

/* POST UNTRASH */
router.post("/untrash/:id", recetteController.untrashRecipe);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", recetteController.trashRecipe);

/* HARD DELETE ID*/
router.delete("/:id", recetteController.deleteRecipe);

module.exports = router;
