/* Import des modules nécessaires */
const express = require("express");
const commentController = require("../../controllers/admin/comment");

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

/* PATCH ID & BODY*/
router.patch("/:id", commentController.updateComment);

/* POST UNTRASH */
router.post("/untrash/:id", commentController.untrashComment);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", commentController.trashComment);

/* HARD DELETE ID*/
router.delete("/:id", commentController.deleteComment);

/* PUT */
router.put("/menu/:id", commentController.addCommentInMenu);

/* PUT */
router.put("/recipe/:id", commentController.addCommentInRecipe);

module.exports = router;
