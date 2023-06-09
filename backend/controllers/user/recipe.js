const DB = require("../../db.config");
const slugify = require("slugify");
const Recipe = DB.Recipe;
const User = DB.User;
const Menu = DB.Menu;
const Ingredient = DB.Ingredient;
const Diet = DB.Diet;
const Theme = DB.Theme;
const Comment = DB.Comment;
const { RequestError, RecipeError, IngredientError, DietError } = require("../../error/customError");

exports.getAllRecipes = (req, res, next) => {
	Recipe.findAll({
		include: [{ model: Theme, attributes: ["id", "name", "slug", "description"] }],
		attributes: ["id", "name", "slug", "description", "difficulty", "user_username", "createdAt", "image"],
	})
		.then((recipes) => res.json({ data: recipes }))
		.catch((err) => next(err));
};

exports.getMyRecipes = async (req, res, next) => {
	try {
		let recipes = await Recipe.findAll({
			where: { user_id: req.decodedToken.id },
			include: [
				{
					model: Ingredient,
					attributes: ["id", "name", "slug", "description", "calories", "price", "image"],
					through: {
						attributes: ["count"],
					},
				},
				{
					model: Menu,
					attributes: ["id", "name", "slug", "description", "user_username", "createdAt", "image"],
					through: {
						attributes: [],
					},
				},
				{ model: Comment, attributes: ["id", "message", "user_username"] },
				{ model: Theme, attributes: ["id", "name", "description"] },
				{
					model: Diet,
					attributes: ["id", "name", "description", "slug"],
					through: {
						attributes: [],
					},
				},
			],

			attributes: ["id", "name", "slug", "description", "difficulty", "instructions", "createdAt", "image"],
		});
		return res.json({ data: recipes });
	} catch (err) {
		next(err);
	}
};

exports.getRecipe = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);

		if (!recipeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let recipe = await Recipe.findOne({
			where: { id: recipeID },
			include: [
				{ model: User, attributes: ["id", "username", "slug", "image"] },
				{ model: Theme, attributes: ["id", "name", "slug", "description"] },
				{ model: Comment, attributes: ["id", "message", "user_username"] },
				{
					model: Ingredient,
					attributes: ["id", "name", "slug", "description", "calories", "price", "image"],
					through: {
						attributes: ["count"],
					},
				},
				{
					model: Menu,
					attributes: ["id", "name", "slug", "description", "user_username", "createdAt", "image"],
					through: {
						attributes: [],
					},
				},
				{
					model: Diet,
					attributes: ["id", "name", "slug", "description"],
					through: {
						attributes: [],
					},
				},
			],
			attributes: ["id", "name", "slug", "description", "difficulty", "theme_id", "instructions", "createdAt", "image"],
		});

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas .", 0);
		}

		return res.json({ data: recipe });
	} catch (err) {
		next(err);
	}
};

exports.addIngredientInMyRecipe = async (req, res, next) => {
	try {
		let ingredientID = parseInt(req.params.id);
		const { recipe_id, count } = req.body;

		if (!recipe_id || !ingredientID || !count) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}
		let recipe = await Recipe.findOne({
			where: { id: recipe_id, user_id: req.decodedToken.id },
		});

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas ou ne vous appartient pas .", 0);
		}
		let ingredient = await Ingredient.findOne({ where: { id: ingredientID } });

		if (ingredient === null) {
			throw new IngredientError("Cet ingredient n'existe pas .", 0);
		}

		let recipeIngredient = await recipe.addIngredient(ingredient, {
			through: { count: count },
		});

		return res.json({
			message: "L'ingrédient a bien été ajoutée à votre recette .",
			data: recipeIngredient,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteIngredientInMyRecipe = async (req, res, next) => {
	try {
		let ingredientID = parseInt(req.params.id);
		const { recipe_id } = req.body;

		if (!recipe_id || !ingredientID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}
		let recipe = await Recipe.findOne({
			where: { id: recipe_id, user_id: req.decodedToken.id },
		});

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas ou ne vous appartient pas.", 0);
		}
		let ingredient = await Ingredient.findOne({ where: { id: ingredientID } });

		if (ingredient === null) {
			throw new IngredientError("Cet Ingredient n'existe pas .", 0);
		}

		let ringredient = await recipe.removeIngredient(ingredient);

		return res.status(204).json({
			message: "L'ingrédient a bien été supprimé de votre recette .",
			data: ringredient,
		});
	} catch (err) {
		next(err);
	}
};

exports.addDietInMyRecipe = async (req, res, next) => {
	try {
		let dietID = parseInt(req.params.id);
		const { recipe_id } = req.body;

		if (!recipe_id || !dietID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let recipe = await Recipe.findOne({
			where: { id: recipe_id, user_id: req.decodedToken.id },
		});

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas ou ne vous appartient pas .", 0);
		}
		let diet = await Diet.findOne({ where: { id: dietID } });

		if (diet === null) {
			throw new DietError("Ce régime n'existe pas .", 0);
		}

		let recipeDiet = await recipe.addDiet(diet);

		return res.json({
			message: "Le régime a bien été ajoutée à votre recette .",
			data: recipeDiet,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteDietInMyRecipe = async (req, res, next) => {
	try {
		let dietID = parseInt(req.params.id);
		const { recipe_id } = req.body;

		if (!recipe_id || !dietID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}
		let recipe = await Recipe.findOne({
			where: { id: recipe_id, user_id: req.decodedToken.id },
		});

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas ou ne vous appartient pas.", 0);
		}
		let diet = await Diet.findOne({ where: { id: dietID } });

		if (diet === null) {
			throw new DietError("Ce régime n'existe pas .", 0);
		}

		await recipe.removeDiet(diet);

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.addMyRecipe = async (req, res, next) => {
	try {
		const { name, description, instructions, difficulty, theme_id } = req.body;

		if (!name || !description || !instructions || !difficulty) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		if (!theme_id) {
			req.body.theme_id = 1;
		} else {
			let theme = await Theme.findOne({ where: { id: theme_id } });
			if (!theme) {
				throw new RequestError("Ce thème n'existe pas .", 0);
			}
		}

		if (difficulty < 1 || difficulty > 5) {
			throw new RequestError("La difficulté est incohérente .", 0);
		}

		let recipe = await Recipe.findOne({ where: { user_id: req.decodedToken.id, name: name } });

		if (recipe !== null) {
			throw new RequestError(`Vous avez déjà une recette nommée ${name} .`, 0);
		}

		req.body.user_id = req.decodedToken.id;
		if(req.file){
			req.body.image = req.file.path;
		}
		req.body.user_username = req.decodedToken.username;

		req.body.slug = slugify(name);

		let recipec = await Recipe.create(req.body);

		return res.json({
			message: "Votre recette a bien été créée .",
			data: recipec,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateMyRecipe = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);
		const { name, theme_id, difficulty } = req.body;

		if (!recipeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		if (!theme_id) {
			req.body.theme_id = 1;
		} else {
			let theme = await Theme.findOne({ where: { id: theme_id } });
			if (!theme) {
				throw new RequestError("Ce thème n'existe pas .", 0);
			}
		}

		if (difficulty < 1 || difficulty > 5) {
			throw new RequestError("La difficulté est incohérente .", 0);
		}

		let recipe = await Recipe.findOne({
			where: { id: recipeID, user_id: req.decodedToken.id },
			raw: true,
		});

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas ou ne vous appartient pas.", 0);
		}

		if(name){
			req.body.slug = slugify(name);
		}

		if(req.file){
			req.body.image = req.file.path;
		}
		req.body.user_id = req.decodedToken.id;
		req.body.user_username = req.decodedToken.username;


		await Recipe.update(req.body, {
			where: { id: recipeID },
		});

		return res.json({
			message: "Votre recette à bien été modifiée .",
		});
	} catch (err) {
		console.log(err)
		next(err);
	}
};

exports.trashMyRecipe = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);

		if (!recipeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let recipe = await Recipe.findOne({
			where: { id: recipeID, user_id: req.decodedToken.id },
			raw: true,
		});

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas ou ne vous appartient pas.", 0);
		}

		await Recipe.destroy({
			where: { id: recipeID, user_id: req.decodedToken.id },
		});

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.untrashMyRecipe = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);

		if (!recipeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let recipe = await Recipe.findOne({
			where: { id: recipeID, user_id: req.decodedToken.id },
			raw: true,
		});

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas ou ne vous appartient pas.", 0);
		}

		await Recipe.restore({
			where: { id: recipeID },
		});

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};
