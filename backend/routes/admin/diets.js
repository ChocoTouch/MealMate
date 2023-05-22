/* Import des modules nécessaires */
const express = require("express");
const dietController = require("../../controllers/admin/diet");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("DIET Time", event.toString());
  next();
});

/* GET */
router.get("/", dietController.getAllDiets);

/* GET ID */
router.get("/:id", dietController.getDiet);

/* PUT */
router.put("", dietController.addDiet);

/* PATCH ID & BODY*/
router.patch("/:id", dietController.updateDiet);

/* POST UNTRASH */
router.post("/untrash/:id", dietController.untrashDiet);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", dietController.trashDiet);

/* HARD DELETE ID*/
router.delete("/:id", dietController.deleteDiet);

module.exports = router;
