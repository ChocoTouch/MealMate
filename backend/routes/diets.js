/* Import des modules nécessaires */
const express = require("express");
const check = require("../jsonwebtoken/check");
const dietController = require("../controllers/admin/diet");

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
router.put("", check.checkAdminTokenMW, dietController.addDiet);

/* PATCH ID & BODY*/
router.patch("/:id", check.checkAdminTokenMW, dietController.updateDiet);

/* POST UNTRASH */
router.post(
  "/untrash/:id",
  check.checkAdminTokenMW,
  dietController.untrashDiet
);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", check.checkAdminTokenMW, dietController.trashDiet);

/* HARD DELETE ID*/
router.delete("/:id", check.checkAdminTokenMW, dietController.deleteDiet);

module.exports = router;
