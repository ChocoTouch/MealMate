const express = require("express");
const user_router = require("./public/users");
const recipes_router = require("./public/recipes");
const menus_router = require("./public/menus");
const categories_router = require("./public/categories");
const comments_router = require("./public/comments");
const courses_router = require("./public/courses");
const daysOfWeek_router = require("./public/daysOfWeek");
const diets_router = require("./public/diets");
const ingredients_router = require("./public/ingredients");
const meals_router = require("./public/meals");
const themes_router = require("./public/themes");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("PUBLIC ROUTER Time", event.toString());
	next();
});

router.get("/", (req, res) => res.send(`Welcome to the Public Router !`));
router.use("/users", user_router);
router.use("/recipes", recipes_router);
router.use("/ingredients", ingredients_router);
router.use("/categories", categories_router);
router.use("/comments", comments_router);
router.use("/courses", courses_router);
router.use("/daysofweek", daysOfWeek_router);
router.use("/diets", diets_router);
router.use("/menus", menus_router);
router.use("/meals", meals_router);
router.use("/themes", themes_router);

module.exports = router;
