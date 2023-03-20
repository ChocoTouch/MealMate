/* Import des modules nécessaires */
const express = require("express");
const authController = require("../controllers/auth");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("AUTH Time", event.toString());
  next();
});

/* Routage de la ressource auth (POST)*/
router.post("/login", authController.login);

module.exports = router;
