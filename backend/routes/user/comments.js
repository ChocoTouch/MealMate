/* Import des modules nécessaires */
const express = require("express");
const commentController = require("../../controllers/user/comment");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("COMMENT Time", event.toString());
  next();
});

/* GET */
router.get("/", commentController.getAllComments);

/* GET ID */
router.get("/:id", commentController.getComment);

/* PUT */
router.put("/menu/:id", commentController.addCommentInMenu);

/* PUT */
router.put("/recipe/:id", commentController.addCommentInRecipe);

module.exports = router;
