const express = require("express");
const menuController = require("../../controllers/public/menu");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("MENU Time", event.toString());
	next();
});

router.get("/", menuController.getAllMenus);

router.get("/:id", menuController.getMenu);

module.exports = router;
