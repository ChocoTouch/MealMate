const express = require("express");
const mealController = require("../../controllers/admin/meal");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("MEAL Time", event.toString());
	next();
});

router.get("/", mealController.getAllMeals);

router.get("/:id", mealController.getMeal);

router.put("", mealController.addMeal);

router.patch("/:id", mealController.updateMeal);

router.post("/untrash/:id", mealController.untrashMeal);

router.delete("/trash/:id", mealController.trashMeal);

router.delete("/:id", mealController.deleteMeal);

module.exports = router;
