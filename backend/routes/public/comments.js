const express = require("express");
const commentController = require("../../controllers/public/comment");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("COMMENT Time", event.toString());
	next();
});

router.get("/:id", commentController.getComment);

module.exports = router;
