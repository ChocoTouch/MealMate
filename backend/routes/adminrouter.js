const express = require("express");
const user_router = require("./admin/users");
const recipes_router = require("./admin/recipes");
const menus_router = require("./admin/menus");
const categories_router = require("./admin/categories");
const comments_router = require("./admin/comments");
const courses_router = require("./admin/courses");
const daysOfWeek_router = require("./admin/daysOfWeek");
const diets_router = require("./admin/diets");
const ingredients_router = require("./admin/ingredients");
const meals_router = require("./admin/meals");
const themes_router = require("./admin/themes");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("ADMIN ROUTER Time", event.toString());
	next();
});

router.get("/", (req, res) => res.send(`Welcome to the Admin Router !`));
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
