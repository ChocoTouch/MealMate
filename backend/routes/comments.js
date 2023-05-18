/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const commentController = require("../controllers/comment");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Recipe Time", event.toString());
  next();
});

/* GET */
router.get("/", commentController.getAllComments);

/* GET ID */
router.get("/:id", commentController.getComment);

/* PUT */
router.put("", commentController.addComment); //checkTokenMW

/* PATCH ID & BODY*/
router.patch("/:id", commentController.updateComment); //checkTokenMW

/* POST UNTRASH */
router.post("/untrash/:id", commentController.untrashComment); //checkTokenMW

/* SOFT DELETE TRASH */
router.delete("/trash/:id", commentController.trashComment); //checkTokenMW

/* HARD DELETE ID*/
router.delete("/:id", commentController.deleteComment); //checkTokenMW

/* PUT */
router.put("/menu/:id", commentController.addCommentInMenu); //checkTokenMW

/* PUT */
router.put("/recipe/:id", commentController.addCommentInRecipe); //checkTokenMW

module.exports = router;
