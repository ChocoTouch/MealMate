const DB = require("../../db.config");
const Ingredient = DB.Ingredient;
const Recipe = DB.Recipe;
const Category = DB.Category;
const Theme = DB.Theme;
const Diet = DB.Diet;
const { RequestError, IngredientError } = require("../../error/customError");

exports.getAllIngredients = (req, res, next) => {
	Ingredient.findAll({ attributes: ["id", "name", "slug", "description", "calories", "price", "image"] })
		.then((ingredients) => res.json({ data: ingredients }))
		.catch((err) => next(err));
};

exports.getIngredient = async (req, res, next) => {
	try {
		let ingredientID = parseInt(req.params.id);

		if (!ingredientID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let ingredient = await Ingredient.findOne({
			where: { id: ingredientID },
			include: [
				{ model: Category, attributes: ["id", "name", "slug"], through: { attributes: [] } },
				{
					model: Recipe,
					attributes: ["id", "name", "slug", "user_username", "description", "difficulty", "image"],
					include: [
						{ model: Theme, attributes: ["id", "name", "slug", "description"] },
						{
							model: Diet,
							attributes: ["id", "name", "slug", "description"],
							through: {
								attributes: [],
							},
						},
					],
					through: {
						attributes: [],
					},
				},
			],
			attributes: ["id", "name", "slug", "description", "calories", "price", "image"],
		});

		if (ingredient === null) {
			throw new IngredientError("Cet ingrédient n'existe pas .", 0);
		}

		return res.json({ data: ingredient });
	} catch (err) {
		next(err);
	}
};
