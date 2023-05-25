const express = require("express");
const recipeController = require("../../controllers/public/recipe");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("RECIPE Time", event.toString());
	next();
});

router.get("/", recipeController.getAllRecipes);

router.get("/:id", recipeController.getRecipe);

module.exports = router;
