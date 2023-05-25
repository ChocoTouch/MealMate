const express = require("express");
const ingredientController = require("../../controllers/public/ingredient");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("INGREDIENT Time", event.toString());
	next();
});

router.get("/", ingredientController.getAllIngredients);

router.get("/:id", ingredientController.getIngredient);

module.exports = router;
