const express = require("express");
const commentController = require("../../controllers/user/comment");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("COMMENT Time", event.toString());
	next();
});

router.get("/:id", commentController.getComment);

router.put("/menu/:id", commentController.addMyCommentInMenu);

router.put("/recipe/:id", commentController.addMyCommentInRecipe);

module.exports = router;
