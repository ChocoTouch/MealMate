const DB = require("../../db.config");
const slugify = require("slugify");
const Menu = DB.Menu;
const Recipe = DB.Recipe;
const Meal = DB.Meal;
const User = DB.User;
const Course = DB.Course;
const Theme = DB.Theme;
const DayOfWeek = DB.DayOfWeek;
const Comment = DB.Comment;
const { RequestError, RecipeError, MenuError, CourseError } = require("../../error/customError");

exports.getAllMenus = (req, res, next) => {
	Menu.findAll({ attributes: ["id", "name", "slug", "description", "user_username", "createdAt"] })
		.then((menus) => res.json({ data: menus }))
		.catch((err) => next(err));
};

exports.getMyMenus = async (req, res, next) => {
	try {
		let menus = await Menu.findAll({
			where: {
				user_id: req.decodedToken.id,
			},
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
			],
			attributes: ["id", "name", "slug", "description", "user_username"],
		});

		return res.json({ data: menus });
	} catch (err) {
		next(err);
	}
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

exports.addMealInMyMenu = async (req, res, next) => {
	try {
		let mealID = parseInt(req.params.id);
		const { menu_id } = req.body;

		if (!mealID || !menu_id) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menu_id, user_id: req.decodedToken.id },
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
		}

		let meal = await Meal.findOne({ where: { id: mealID } });

		if (meal === null) {
			throw new RecipeError("Ce repas n'existe pas .", 0);
		}

		let menuMeal = await menu.addMeal(meal);

		return res.json({
			message: "Ce repas a bien été ajoutée à votre menu .",
			data: menuMeal,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteMealInMyMenu = async (req, res, next) => {
	try {
		let mealID = parseInt(req.params.id);
		const { menu_id } = req.body;

		if (!menu_id || !mealID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menu_id, user_id: req.decodedToken.id },
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas .", 0);
		}

		let meal = await Meal.findOne({ where: { id: mealID } });

		if (meal === null) {
			throw new MealError("Ce repas n'existe pas .", 0);
		}

		await menu.removeMeal(meal);

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.addDayOfWeekInMyMenu = async (req, res, next) => {
	try {
		let dayOfWeekID = parseInt(req.params.id);
		const { menu_id } = req.body;

		if (!dayOfWeekID || !menu_id) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menu_id, user_id: req.decodedToken.id },
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
		}

		let dayOfWeek = await DayOfWeek.findOne({ where: { id: dayOfWeekID } });

		if (dayOfWeek === null) {
			throw new RecipeError("Ce jour n'existe pas .", 0);
		}

		let menuDayOfWeek = await menu.addDayOfWeek(dayOfWeek);

		return res.json({
			message: "Ce jour a bien été ajoutée à votre menu .",
			data: menuDayOfWeek,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteDayOfWeekInMyMenu = async (req, res, next) => {
	try {
		let dayOfWeekID = parseInt(req.params.id);
		const { menu_id } = req.body;

		if (!menu_id || !dayOfWeekID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menu_id, user_id: req.decodedToken.id },
		});

		if (menu === null) {
			throw new MenuError("Ce Menu n'existe pas ou ne vous appartient pas .", 0);
		}
		let dayOfWeek = await DayOfWeek.findOne({ where: { id: dayOfWeekID } });

		if (dayOfWeek === null) {
			throw new DayOfWeekError("Ce Jour n'existe pas .", 0);
		}

		await menu.removeDayOfWeek(dayOfWeek);

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.addCourseInMyMenu = async (req, res, next) => {
	try {
		let courseID = parseInt(req.params.id);
		const { menu_id } = req.body;

		if (!courseID || !menu_id) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menu_id, user_id: req.decodedToken.id },
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
		}

		let course = await Course.findOne({ where: { id: courseID } });

		if (course === null) {
			throw new CourseError("Ce plat n'existe pas .", 0);
		}

		let menuCourse = await menu.addCourse(course);

		return res.json({
			message: "Ce plat a bien été ajoutée à votre menu .",
			data: menuCourse,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteCourseInMyMenu = async (req, res, next) => {
	try {
		let courseID = parseInt(req.params.id);
		const { menu_id } = req.body;

		if (!menu_id || !courseID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menu_id, user_id: req.decodedToken.id },
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas .", 0);
		}

		let course = await Course.findOne({ where: { id: courseID } });

		if (course === null) {
			throw new CourseError("Ce Plat n'existe pas .", 0);
		}

		await menu.removeCourse(course);

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.addRecipeInMyMenu = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);
		const { menu_id } = req.body;

		if (!recipeID || !menu_id) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menu_id, user_id: req.decodedToken.id },
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
		}

		let recipe = await Recipe.findOne({ where: { id: recipeID } });

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas .", 0);
		}

		let menuRecipe = await menu.addRecipe(recipe);

		return res.json({
			message: "La recette a bien été ajoutée à votre menu .",
			data: menuRecipe,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteRecipeInMyMenu = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);
		const { menu_id } = req.body;

		if (!menu_id || !recipeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menu_id, user_id: req.decodedToken.id },
		});

		if (menu === null) {
			throw new MenuError("Ce Menu n'existe pas ou ne vous appartient pas .", 0);
		}

		let recipe = await Recipe.findOne({ where: { id: recipeID } });

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas .", 0);
		}

		await menu.removeRecipe(recipe);

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.addMyMenu = async (req, res, next) => {
	try {
		const { name, description } = req.body;

		if (!name || !description) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({ where: { user_id: req.decodedToken.id, name: name } });

		if (menu !== null) {
			throw new RequestError(`Vous avez déjà un menu nommé ${name} .`, 0);
		}

		req.body.user_username = req.decodedToken.username;

		req.body.user_id = req.decodedToken.id;

		req.body.slug = slugify(name);

		let menuc = await Menu.create(req.body);

		return res.json({ message: "Votre menu a bien été crée .", data: menuc });
	} catch (err) {
		next(err);
	}
};

exports.updateMyMenu = async (req, res, next) => {
	try {
		const { name } = req.body;
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menuID, user_id: req.decodedToken },
			raw: true,
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
		}

		menu = await Menu.findOne({ where: { user_id: req.decodedToken.id, name: name } });

		if (menu !== null) {
			throw new RequestError(`Vous avez déjà un menu nommé ${name} .`, 0);
		}

		req.body.user_username = req.decodedToken.username;

		req.body.user_id = req.decodedToken.id;

		req.body.slug = slugify(name);

		await Menu.update(req.body, {
			where: { id: menuID },
		});

		return res.json({ message: "Votre menu à bien été modifié ." });
	} catch (err) {
		next(err);
	}
};

exports.trashMyMenu = async (req, res, next) => {
	try {
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menuID, user_id: req.decodedToken.id },
			raw: true,
		});

		if (menu === null) {
			throw new MenuError("Cette Menu n'existe pas ou ne vous appartient pas.", 0);
		}

		await Menu.destroy({ where: { id: menuID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.untrashMyMenu = async (req, res, next) => {
	try {
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menuID, user_id: req.decodedToken.id },
			raw: true,
		});

		if (menu === null) {
			throw new MenuError("Cette Menu n'existe pas ou ne vous appartient pas.", 0);
		}

		await Menu.destroy({ where: { id: menuID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};
