const DB = require("../../db.config");
const Menu = DB.Menu;
const Recipe = DB.Recipe;
const Meal = DB.Meal;
const User = DB.User;
const Course = DB.Course;
const Theme = DB.Theme;
const DayOfWeek = DB.DayOfWeek;
const Comment = DB.Comment;
const Menu_Recipe = DB.Menu_recipe;
const { RequestError, MenuError} = require("../../error/customError");

exports.getAllMenus = (req, res, next) => {
	Menu.findAll({ attributes: ["id", "name", "slug", "description", "user_username", "createdAt", "image"],
	include: [
		{ model: User, attributes: ["id", "username", "slug", "image"] },
	],
})
		.then((menus) => res.json({ data: menus }))
		.catch((err) => next(err));
};

exports.getMenu = async (req, res, next) => {
	try {
		let menuSlug = req.params.slug;

		if (!menuSlug) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { slug: menuSlug },
			include: [
				{
					model: Recipe,
					attributes: ["id", "name", "slug", "description", "user_username", "createdAt", "image"],
					through: {
						attributes: [],
					},
					include: [
						{ model: Theme, attributes: ["id", "name", "slug", "description"] },
						{ model: User, attributes: ["id", "username", "slug", "image"] },
						{
							model: Menu_Recipe,
							attributes: ["id"],
							include: [
								{ model: Course, attributes: ["id", "name", "slug", "description"] },
								{ model: Meal, attributes: ["id", "name", "slug", "description"] },
								{ model: DayOfWeek, attributes: ["id", "name", "slug"] },
							],
						},
					],
				},

				{
					model: Comment,
					attributes: ["id", "message", "user_username"],
				},
				{ model: User, attributes: ["id", "username", "slug", "image"] },
			],
			attributes: ["id", "name", "slug", "description", "user_username", "createdAt", "image"],
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas .", 0);
		}

		return res.json({ data: menu });
	} catch (err) {
		next(err);
	}
};