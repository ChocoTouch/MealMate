const express = require("express");
const dayOfWeekController = require("../../controllers/user/dayOfWeek");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("DAYOFWEEK Time", event.toString());
	next();
});

router.get("/", dayOfWeekController.getAllDayOfWeeks);

router.get("/:id", dayOfWeekController.getDayOfWeek);

module.exports = router;
