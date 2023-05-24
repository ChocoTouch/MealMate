const DB = require("../../db.config");
const Meal = DB.Meal;
const { RequestError, MealError } = require("../../error/customError");

exports.getAllMeals = (req, res, next) => {
	Meal.findAll({ attributes: ["id", "name", "slug", "description"] })
		.then((meals) => res.json({ data: meals }))
		.catch((err) => next(err));
};

exports.getMeal = async (req, res, next) => {
	try {
		let mealID = parseInt(req.params.id);

		if (!mealID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let meal = await Meal.findOne({
			where: { id: mealID },
			attributes: ["id", "name", "slug", "description"],
		});

		if (meal === null) {
			throw new MealError("Ce repas n'existe pas .", 0);
		}

		return res.json({ data: meal });
	} catch (err) {
		next(err);
	}
};
