const DB = require("../../db.config");
const Diet = DB.Diet;
const Recipe = DB.Recipe;
const Theme = DB.Theme;
const { RequestError, DietError } = require("../../error/customError");

exports.getAllDiets = (req, res, next) => {
	Diet.findAll({ attributes: ["id", "name", "description", "slug"] })
		.then((diets) => res.json({ data: diets }))
		.catch((err) => next(err));
};

exports.getDiet = async (req, res, next) => {
	try {
		let dietID = parseInt(req.params.id);

		if (!dietID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let diet = await Diet.findOne({
			where: { id: dietID },
			include: [
				{
					model: Recipe,
					attributes: ["id", "name", "description", "slug", "difficulty", "user_username"],
					through: { attributes: [] },
					include: { model: Theme, attributes: ["id", "name", "slug", "description"] },
				},
			],
			attributes: ["id", "name", "description", "slug"],
		});

		if (diet === null) {
			throw new DietError("Ce régime n'existe pas .", 0);
		}

		return res.json({ data: diet });
	} catch (err) {
		next(err);
	}
};
