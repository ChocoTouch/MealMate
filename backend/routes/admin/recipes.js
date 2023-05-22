const express = require("express");
const recipeController = require("../../controllers/admin/recipe");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("RECIPE Time", event.toString());
	next();
});

router.get("/", recipeController.getAllRecipes);

router.get("/me", recipeController.getMyRecipes);

router.get("/:id", recipeController.getRecipe);

router.put("", recipeController.addRecipe);

router.patch("/:id", recipeController.updateRecipe);

router.post("/untrash/:id", recipeController.untrashRecipe);

router.delete("/trash/:id", recipeController.trashRecipe);

router.delete("/:id", recipeController.deleteRecipe);

router.put("/ingredient/:id", recipeController.addIngredientInMyRecipe);

router.delete("/ingredient/:id", recipeController.deleteIngredientInMyRecipe);

router.put("/diet/:id", recipeController.addDietInMyRecipe);

router.put("/diet/:id", recipeController.deleteDietInMyRecipe);

router.put("/me", recipeController.addMyRecipe);

router.patch("/me/:id", recipeController.updateMyRecipe);

router.delete("/me/trash/:id", recipeController.trashMyRecipe);

router.post("/me/untrash/:id", recipeController.untrashMyRecipe);

module.exports = router;
