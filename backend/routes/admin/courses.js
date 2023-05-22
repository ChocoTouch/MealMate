const express = require("express");
const courseController = require("../../controllers/admin/course");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("COURSE Time", event.toString());
	next();
});

router.get("/", courseController.getAllCourses);

router.get("/:id", courseController.getCourse);

router.put("", courseController.addCourse);

router.patch("/:id", courseController.updateCourse);

router.post("/untrash/:id", courseController.untrashCourse);

router.delete("/trash/:id", courseController.trashCourse);

router.delete("/:id", courseController.deleteCourse);

module.exports = router;
