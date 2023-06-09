const express = require("express");
const recipeController = require("../../controllers/user/recipe");
const uploader = require("../../multer/multer")

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("RECIPE Time", event.toString());
	next();
});

router.get("/", recipeController.getAllRecipes);

router.get("/me", recipeController.getMyRecipes);

router.get("/:id", recipeController.getRecipe);

router.put("/ingredient/:id", recipeController.addIngredientInMyRecipe);

router.delete("/ingredient/:id", recipeController.deleteIngredientInMyRecipe);

router.put("/diet/:id", recipeController.addDietInMyRecipe);

router.delete("/diet/:id", recipeController.deleteDietInMyRecipe);

router.put("/me", uploader.upload, recipeController.addMyRecipe);

router.patch("/me/:id", uploader.upload, recipeController.updateMyRecipe);

router.delete("/me/trash/:id", recipeController.trashMyRecipe);

router.post("/me/untrash/:id", recipeController.untrashMyRecipe);

module.exports = router;
