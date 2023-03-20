/* Import des modules nécessaires */
const express = require("express");
const userController = require("../controllers/user");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("User Time", event.toString());
  next();
});

/* Routage de la ressource User (Ensemble des Users) */
router.get("/",checkTokenMW , userController.getAllUsers);

/* GET ID (User spécifique)*/
router.get("/:id", userController.getUser);

/* PUT */
router.put("", userController.addUser);

/* PATCH ID & BODY*/
router.patch("/:id", userController.updateUser);

/* POST UNTRASH */
router.post("/untrash/:id", userController.untrashUser);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", userController.trashUser);

/* HARD DELETE ID*/
router.delete("/:id", userController.deleteUser);

module.exports = router;
