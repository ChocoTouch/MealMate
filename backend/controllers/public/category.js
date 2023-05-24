const DB = require("../../db.config");
const Category = DB.Category;
const Ingredient = DB.Ingredient;
const { RequestError, CategoryError } = require("../../error/customError");

exports.getAllCategories = (req, res, next) => {
	Category.findAll({ attributes: ["id", "name", "slug"] })
		.then((categories) => res.json({ data: categories }))
		.catch((err) => next(err));
};

exports.getCategory = async (req, res, next) => {
	try {
		let categoryID = parseInt(req.params.id);

		if (!categoryID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let category = await Category.findOne({
			where: { id: categoryID },
			include: {
				model: Ingredient,
				attributes: ["id", "name", "slug", "description", "calories", "price"],
				through: { attributes: [] },
			},
			attributes: ["id", "name", "slug"],
		});

		if (category === null) {
			throw new CategoryError("Cette categorie n'existe pas .", 0);
		}

		return res.json({ data: category });
	} catch (err) {
		next(err);
	}
};
