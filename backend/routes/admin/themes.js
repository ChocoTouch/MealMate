const express = require("express");
const themeController = require("../../controllers/admin/theme");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("THEME Time", event.toString());
	next();
});

router.get("/", themeController.getAllThemes);

router.get("/:id", themeController.getTheme);

router.put("", themeController.addTheme);

router.patch("/:id", themeController.updateTheme);

router.post("/untrash/:id", themeController.untrashTheme);

router.delete("/trash/:id", themeController.trashTheme);

router.delete("/:id", themeController.deleteTheme);

module.exports = router;
