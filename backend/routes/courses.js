/* Import des modules nécessaires */
const express = require("express");
const checkTokenMW = require("../jsonwebtoken/check");
const courseController = require("../controllers/course");

/* Récupération du router d'express */
let router = express.Router();

/* Middleware pour log les dates des req */
router.use((req, res, next) => {
  const event = new Date();
  console.log("Recipe Time", event.toString());
  next();
});

/* GET */
router.get("/", courseController.getAllCourses);

/* GET ID */
router.get("/:id", courseController.getCourse);

/* PUT */
router.put("", courseController.addCourse); //checkTokenMW

/* PATCH ID & BODY*/
router.patch("/:id", courseController.updateCourse); //checkTokenMW

/* POST UNTRASH */
router.post("/untrash/:id", courseController.untrashCourse); //checkTokenMW

/* SOFT DELETE TRASH */
router.delete("/trash/:id", courseController.trashCourse); //checkTokenMW

/* HARD DELETE ID*/
router.delete("/:id", courseController.deleteCourse); //checkTokenMW

module.exports = router;
