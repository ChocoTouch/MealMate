/* Import des modules nécessaires */
const express = require("express");
const check = require("../jsonwebtoken/check");
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
router.get("/", check.checkAdminTokenMW, commentController.getAllComments);

/* GET ID */
router.get("/:id", check.checkAdminTokenMW, commentController.getComment);

/* PATCH ID & BODY*/
router.patch("/:id", check.checkAdminTokenMW, commentController.updateComment);

/* POST UNTRASH */
router.post(
  "/untrash/:id",
  check.checkAdminTokenMW,
  commentController.untrashComment
);

/* SOFT DELETE TRASH */
router.delete(
  "/trash/:id",
  check.checkAdminTokenMW,
  commentController.trashComment
);

/* HARD DELETE ID*/
router.delete("/:id", check.checkAdminTokenMW, commentController.deleteComment);

/* PUT */
router.put("/menu/:id", check.checkTokenMW, commentController.addCommentInMenu);

/* PUT */
router.put(
  "/recipe/:id",
  check.checkTokenMW,
  commentController.addCommentInRecipe
);

module.exports = router;
