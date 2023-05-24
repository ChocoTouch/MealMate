const DB = require("../../db.config");
const Menu = DB.Menu;
const Recipe = DB.Recipe;
const Meal = DB.Meal;
const User = DB.User;
const Course = DB.Course;
const Theme = DB.Theme;
const DayOfWeek = DB.DayOfWeek;
const Comment = DB.Comment;
const { RequestError, MenuError} = require("../../error/customError");

exports.getAllMenus = (req, res, next) => {
	Menu.findAll({ attributes: ["id", "name", "slug", "description", "user_username", "createdAt"] })
		.then((menus) => res.json({ data: menus }))
		.catch((err) => next(err));
};

exports.getMenu = async (req, res, next) => {
	try {
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menuID },
			include: [
				{
					model: Recipe,
					attributes: ["id", "name", "slug", "description", "user_username", "createdAt"],
					through: {
						attributes: [],
					},
					include: [{ model: Theme, attributes: ["id", "name", "slug", "description"] }],
				},
				{
					model: Meal,
					attributes: ["id", "name", "slug", "description"],
					through: {
						attributes: [],
					},
				},
				{
					model: DayOfWeek,
					attributes: ["id", "name", "slug"],
					through: {
						attributes: [],
					},
				},
				{
					model: Course,
					attributes: ["id", "name", "slug", "description"],
					through: {
						attributes: [],
					},
				},
				{
					model: Comment,
					attributes: ["id", "message", "user_username"],
				},
				{ model: User, attributes: ["id", "username", "slug"] },
			],
			attributes: ["id", "name", "slug", "description", "user_username", "createdAt"],
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas .", 0);
		}

		return res.json({ data: menu });
	} catch (err) {
		next(err);
	}
};