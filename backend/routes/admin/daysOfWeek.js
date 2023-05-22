const express = require("express");
const check = require("../../jsonwebtoken/check");
const dayOfWeekController = require("../../controllers/admin/dayOfWeek");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("DAYOFWEEK Time", event.toString());
	next();
});

router.get("/", dayOfWeekController.getAllDayOfWeeks);

router.get("/:id", dayOfWeekController.getDayOfWeek);

router.put("", dayOfWeekController.addDayOfWeek);

router.patch("/:id", dayOfWeekController.updateDayOfWeek);

router.post("/untrash/:id", dayOfWeekController.untrashDayOfWeek);

router.delete("/trash/:id", dayOfWeekController.trashDayOfWeek);

router.delete("/:id", dayOfWeekController.deleteDayOfWeek);

module.exports = router;
