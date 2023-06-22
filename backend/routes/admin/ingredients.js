const express = require("express");
const ingredientController = require("../../controllers/admin/ingredient");
const uploader = require("../../multer/multer")

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("INGREDIENT Time", event.toString());
	next();
});

router.get("/", ingredientController.getAllIngredients);

router.get("/:id", ingredientController.getIngredient);

router.put("", uploader.upload.single('image'), ingredientController.addIngredient);

router.patch("/:id", uploader.upload.single('image'), ingredientController.updateIngredient);

router.post("/untrash/:id", ingredientController.untrashIngredient);

router.delete("/trash/:id", ingredientController.trashIngredient);

router.delete("/:id", ingredientController.deleteIngredient);

module.exports = router;
