const express = require("express");
const menuController = require("../../controllers/user/menu");
const uploader = require("../../multer/multer")

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("MENU Time", event.toString());
	next();
});

router.get("/", menuController.getAllMenus);

router.get("/me", menuController.getMyMenus);

router.get("/:id", menuController.getMenu);

router.put("/recipe/:id", menuController.addRecipeInMyMenu);

router.delete("/recipe/:id", menuController.deleteRecipeInMyMenu);

router.put("/me", menuController.addMyMenu);

router.patch("/me/:id", uploader.upload, menuController.updateMyMenu);

router.delete("/me/trash/:id", menuController.trashMyMenu);

router.post("/me/untrash/:id", menuController.untrashMyMenu);

module.exports = router;
