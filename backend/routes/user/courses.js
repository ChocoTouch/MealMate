/* Import des modules nécessaires */
const express = require("express");
const courseController = require("../../controllers/user/course");

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

module.exports = router;
