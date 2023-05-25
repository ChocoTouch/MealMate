const express = require("express");
const mealController = require("../../controllers/user/meal");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("MEAL Time", event.toString());
	next();
});

router.get("/", mealController.getAllMeals);

router.get("/:id", mealController.getMeal);

module.exports = router;
