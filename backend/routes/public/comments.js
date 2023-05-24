/* Import des modules nécessaires */
const express = require("express");
const commentController = require("../../controllers/public/comment");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("COMMENT Time", event.toString());
  next();
});

/* GET ID */
router.get("/:id", commentController.getComment);

module.exports = router;
