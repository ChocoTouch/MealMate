const express = require("express");
const user_router = require("./user/users");
const recipes_router = require("./user/recipes");
const menus_router = require("./user/menus");
const categories_router = require("./user/categories");
const comments_router = require("./user/comments");
const courses_router = require("./user/courses");
const daysOfWeek_router = require("./user/daysOfWeek");
const diets_router = require("./user/diets");
const ingredients_router = require("./user/ingredients");
const meals_router = require("./user/meals");
const themes_router = require("./user/themes");

let router = express.Router();

router.use((req, res, next) => {
	const event = new Date();
	console.log("USER ROUTER Time", event.toString());
	next();
});

router.get("/", (req, res) => res.send(`Welcome to the User Router !`));
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
