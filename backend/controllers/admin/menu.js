const DB = require("../../db.config");
const slugify = require("slugify");
const Menu = DB.Menu;
const Recipe = DB.Recipe;
const Meal = DB.Meal;
const User = DB.User;
const Course = DB.Course;
const DayOfWeek = DB.DayOfWeek;
const Comment = DB.Comment;
const Menu_Recipe = DB.Menu_recipe;
const {
	RequestError,
	RecipeError,
	MenuError,
	UserError,
	CourseError,
	MealError,
	DayOfWeekError,
} = require("../../error/customError");

exports.getAllMenus = (req, res, next) => {
	Menu.findAll()
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
					include: [{ model: Menu_Recipe, include: [Course, Meal, DayOfWeek] }],
					through: {
						attributes: [],
					},
				},
				{ model: Comment },
			],
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
				{ model: User },
				{
					model: Recipe,
					include: [{ model: Menu_Recipe, include: [Course, Meal] }],
					through: {
						attributes: [],
					},
				},
				{ model: Comment },
			],
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas .", 0);
		}

		return res.json({ data: menu });
	} catch (err) {
		next(err);
	}
};

exports.addMenu = async (req, res, next) => {
	try {
		const { name, description, user_id } = req.body;

		if (!name || !description || !user_id) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let user = await User.findOne({ where: { id: user_id } });

		if (user === null) {
			throw new UserError("Cet utilisateur n'existe pas .", 0);
		}

		req.body.user_username = user.username;
		req.body.image = req.file.path || null;
		req.body.slug = slugify(name);

		let menuc = await Menu.create(req.body);

		return res.json({ message: "Le menu a bien été créé .", data: menuc });
	} catch (err) {
		next(err);
	}
};

exports.updateMenu = async (req, res, next) => {
	try {
		const { name, user_id } = req.body;
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({ where: { id: menuID }, raw: true });

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas .", 0);
		}

		if (user_id) {
			let user = await User.findOne({ where: { id: user_id } });

			if (user === null) {
				throw new UserError("Cet utilisateur n'existe pas .", 0);
			}

			req.body.user_username = user.username;
		}

		if (name) {
			req.body.slug = slugify(name);
		}
		
		req.body.image = req.file.path || null;

		await Menu.update(req.body, { where: { id: menuID } });

		return res.json({ message: "Le menu à bien été modifié ." });
	} catch (err) {
		next(err);
	}
};

exports.untrashMenu = async (req, res, next) => {
	try {
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Menu.restore({ where: { id: menuID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.trashMenu = async (req, res, next) => {
	try {
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Menu.destroy({ where: { id: menuID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.deleteMenu = async (req, res, next) => {
	try {
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Menu.destroy({ where: { id: menuID }, force: true });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.addRecipeInMyMenu = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);
		const { menu_id, course_id, meal_id, day_id } = req.body;

		if (!recipeID || !menu_id || !course_id || !meal_id || !day_id) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menu_id, user_id: req.decodedToken.id },
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
		}

		let course = await Course.findOne({
			where: { id: course_id },
		});

		if (course === null) {
			throw new CourseError("Ce Plat n'existe pas .", 0);
		}

		let meal = await Meal.findOne({
			where: { id: meal_id },
		});

		if (meal === null) {
			throw new MealError("Ce Repas n'existe pas .", 0);
		}

		let day = await DayOfWeek.findOne({
			where: { id: day_id },
		});

		if (day === null) {
			throw new DayOfWeekError("Ce Jour n'existe pas .", 0);
		}

		let recipe = await Recipe.findOne({ where: { id: recipeID } });

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas .", 0);
		}

		let menuRecipe = await menu.addRecipe(recipe, {
			through: {
				day_id: day_id,
				course_id: course_id,
				meal_id: meal_id,
			},
		});

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
