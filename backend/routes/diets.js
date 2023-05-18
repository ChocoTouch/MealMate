/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const dietController = require("../controllers/diet");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Recipe Time", event.toString());
  next();
});

/* GET */
router.get("/", dietController.getAllDiets);

/* GET ID */
router.get("/:id", dietController.getDiet);

/* PUT */
router.put("", dietController.addDiet); //checkTokenMW

/* PATCH ID & BODY*/
router.patch("/:id", dietController.updateDiet); //checkTokenMW

/* POST UNTRASH */
router.post("/untrash/:id", dietController.untrashDiet); //checkTokenMW

/* SOFT DELETE TRASH */
router.delete("/trash/:id", dietController.trashDiet); //checkTokenMW

/* HARD DELETE ID*/
router.delete("/:id", dietController.deleteDiet); //checkTokenMW

module.exports = router;
