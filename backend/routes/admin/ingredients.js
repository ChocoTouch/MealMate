const express = require("express");
const ingredientController = require("../../controllers/admin/ingredient");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("INGREDIENT Time", event.toString());
	next();
});

router.get("/", ingredientController.getAllIngredients);

router.get("/:id", ingredientController.getIngredient);

router.put("", ingredientController.addIngredient);

router.patch("/:id", ingredientController.updateIngredient);

router.post("/untrash/:id", ingredientController.untrashIngredient);

router.delete("/trash/:id", ingredientController.trashIngredient);

router.delete("/:id", ingredientController.deleteIngredient);

module.exports = router;
