/* Import des modules nécessaires */
const express = require("express");
const userController = require("../../controllers/user/user");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("USER Time", event.toString());
  next();
});

/* GET */
router.get("/", userController.getAllUsers);

/* GET ID */
router.get("/:id", userController.getUser);

module.exports = router;
