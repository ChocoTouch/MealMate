const DB = require("../../db.config");
const Theme = DB.Theme;
const Recipe = DB.Recipe;
const { RequestError, ThemeError } = require("../../error/customError");

exports.getAllThemes = (req, res, next) => {
	Theme.findAll({ attributes: ["id", "name", "slug", "description"] })
		.then((themes) => res.json({ data: themes }))
		.catch((err) => next(err));
};

exports.getTheme = async (req, res, next) => {
	try {
		let themeID = parseInt(req.params.id);

		if (!themeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let theme = await Theme.findOne({
			where: { id: themeID },
			attributes: ["id", "name", "slug", "description"],
			include: [{ model: Recipe, attributes: ["id", "user_username", "name", "slug", "description"] }],
		});

		if (theme === null) {
			throw new ThemeError("Ce Theme n'existe pas .", 0);
		}

		return res.json({ data: theme });
	} catch (err) {
		next(err);
	}
};
