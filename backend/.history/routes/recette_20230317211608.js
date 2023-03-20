/* Import des modules nécessaires */
const express = require("express");
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
router.get("/", recetteController.getAllUsers);

/* GET ID (Recette spécifique)*/
router.get("/:id", recetteController.getUser);

/* PUT */
router.put("", recetteController.addUser);

/* PATCH ID & BODY*/
router.patch("/:id", recetteController.updateUser);

/* POST UNTRASH */
router.post("/untrash/:id", recetteController.untrashUser);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", recetteController.trashUser);

/* HARD DELETE ID*/
router.delete("/:id", recetteController.deleteUser);

module.exports = router;
