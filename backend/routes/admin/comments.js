const express = require("express");
const commentController = require("../../controllers/admin/comment");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("COMMENT Time", event.toString());
	next();
});

router.get("/", commentController.getAllComments);

router.get("/:id", commentController.getComment);

router.post("/untrash/:id", commentController.untrashComment);

router.delete("/trash/:id", commentController.trashComment);

router.delete("/:id", commentController.deleteComment);

router.put("/me/menu/:id", commentController.addMyCommentInMenu);

router.put("/me/recipe/:id", commentController.addMyCommentInRecipe);

router.delete("/me/:id", commentController.deleteMyComment);

module.exports = router;
