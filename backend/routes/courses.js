/* Import des modules nécessaires */
const express = require("express");
const check = require("../jsonwebtoken/check");
const courseController = require("../controllers/course");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Course Time", event.toString());
  next();
});

/* GET */
router.get("/", courseController.getAllCourses);

/* GET ID */
router.get("/:id", courseController.getCourse);

/* PUT */
router.put("", check.checkAdminTokenMW, courseController.addCourse);

/* PATCH ID & BODY*/
router.patch("/:id", check.checkAdminTokenMW, courseController.updateCourse);

/* POST UNTRASH */
router.post(
  "/untrash/:id",
  check.checkAdminTokenMW,
  courseController.untrashCourse
);

/* SOFT DELETE TRASH */
router.delete(
  "/trash/:id",
  check.checkAdminTokenMW,
  courseController.trashCourse
);

/* HARD DELETE ID*/
router.delete("/:id", check.checkAdminTokenMW, courseController.deleteCourse);

module.exports = router;
