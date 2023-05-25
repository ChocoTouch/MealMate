const express = require("express");
const categoryController = require("../../controllers/user/category");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("CATEGORY Time", event.toString());
	next();
});

router.get("/", categoryController.getAllCategories);

router.get("/:id", categoryController.getCategory);

module.exports = router;
