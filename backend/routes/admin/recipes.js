const express = require("express");
const recipeController = require("../../controllers/admin/recipe");
const uploader = require("../../multer/multer")

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("RECIPE Time", event.toString());
	next();
});

router.get("/", recipeController.getAllRecipes);

router.get("/:id", recipeController.getRecipe);

router.put("", uploader.upload, recipeController.addRecipe);

router.patch("/:id", uploader.upload, recipeController.updateRecipe);

router.post("/untrash/:id", recipeController.untrashRecipe);

router.delete("/trash/:id", recipeController.trashRecipe);

router.delete("/:id", recipeController.deleteRecipe);

module.exports = router;
