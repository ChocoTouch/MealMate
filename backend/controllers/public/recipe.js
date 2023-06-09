const DB = require("../../db.config");
const Recipe = DB.Recipe;
const User = DB.User;
const Menu = DB.Menu;
const Ingredient = DB.Ingredient;
const Diet = DB.Diet;
const Theme = DB.Theme;
const Comment = DB.Comment;
const { RequestError, RecipeError } = require("../../error/customError");

exports.getAllRecipes = (req, res, next) => {
	Recipe.findAll({
		include: [{ model: Theme, attributes: ["id", "name", "slug", "description"] }],
		attributes: ["id", "name", "slug", "description", "difficulty", "user_username", "createdAt", "image"],
	})
		.then((recipes) => res.json({ data: recipes }))
		.catch((err) => next(err));
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
				{ model: User, attributes: ["id", "username", "slug"] },
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
			attributes: ["id", "name", "slug", "description", "difficulty", "instructions", "createdAt", "image"],
		});

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas .", 0);
		}

		return res.json({ data: recipe });
	} catch (err) {
		next(err);
	}
};