const express = require("express");
const menuController = require("../../controllers/admin/menu");
const uploader = require("../../multer/multer")

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("MENU Time", event.toString());
	next();
});

router.get("/", menuController.getAllMenus);

router.get("/:id", menuController.getMenu);

router.put("", uploader.upload, menuController.addMenu);

router.patch("/:id", uploader.upload, menuController.updateMenu);

router.post("/untrash/:id", menuController.untrashMenu);

router.delete("/trash/:id", menuController.trashMenu);

router.delete("/:id", menuController.deleteMenu);

module.exports = router;
