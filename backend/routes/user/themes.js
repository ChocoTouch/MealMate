const express = require("express");
const themeController = require("../../controllers/user/theme");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("THEME Time", event.toString());
	next();
});

router.get("/", themeController.getAllThemes);

router.get("/:id", themeController.getTheme);

module.exports = router;
