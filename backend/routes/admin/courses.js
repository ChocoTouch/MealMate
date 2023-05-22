/* Import des modules nécessaires */
const express = require("express");
const courseController = require("../../controllers/admin/course");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("COURSE Time", event.toString());
  next();
});

/* GET */
router.get("/", courseController.getAllCourses);

/* GET ID */
router.get("/:id", courseController.getCourse);

/* PUT */
router.put("", courseController.addCourse);

/* PATCH ID & BODY*/
router.patch("/:id", courseController.updateCourse);

/* POST UNTRASH */
router.post("/untrash/:id", courseController.untrashCourse);

/* SOFT DELETE TRASH */
router.delete("/trash/:id", courseController.trashCourse);

/* HARD DELETE ID*/
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
