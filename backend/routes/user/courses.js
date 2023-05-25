const express = require("express");
const courseController = require("../../controllers/user/course");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("COURSE Time", event.toString());
	next();
});

router.get("/", courseController.getAllCourses);

router.get("/:id", courseController.getCourse);

module.exports = router;
