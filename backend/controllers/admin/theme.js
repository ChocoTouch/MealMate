const DB = require("../../db.config");
const slugify = require("slugify");
const Theme = DB.Theme;
const Recipe = DB.Recipe;
const { RequestError, ThemeError } = require("../../error/customError");

exports.getAllThemes = (req, res, next) => {
	Theme.findAll()
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
			include: Recipe,
		});

		if (theme === null) {
			throw new ThemeError("Ce Theme n'existe pas .", 0);
		}

		return res.json({ data: theme });
	} catch (err) {
		next(err);
	}
};

exports.addTheme = async (req, res, next) => {
	try {
		const { name, description } = req.body;

		if (!name || !description) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let theme = await Theme.findOne({ where: { name: name } });

		if (theme !== null) {
			throw new RequestError(`Le Thème ${name} existe déjà .`);
		}

		req.body.slug = slugify(name);

		let themec = await Theme.create(req.body);

		return res.json({
			message: "Le Theme a bien été créé .",
			data: themec,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateTheme = async (req, res, next) => {
	try {
		let themeID = parseInt(req.params.id);
		const name = req.body.name;

		if (!themeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let theme = await Theme.findOne({
			where: { id: themeID },
			raw: true,
		});

		if (theme === null) {
			throw new ThemeError("Ce Theme n'existe pas .", 0);
		}

		theme = await Theme.findOne({ where: { name: name } });

		if (theme !== null) {
			throw new RequestError(`Le Thème ${name} existe déjà .`);
		}

		req.body.slug = slugify(name);

		await Theme.update(req.body, { where: { id: themeID } });

		return res.json({
			message: "Le Theme à bien été modifié .",
		});
	} catch (err) {
		next(err);
	}
};

exports.untrashTheme = async (req, res, next) => {
	try {
		let themeID = parseInt(req.params.id);

		if (!themeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Theme.restore({ where: { id: themeID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.trashTheme = async (req, res, next) => {
	try {
		let themeID = parseInt(req.params.id);

		if (!themeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Theme.destroy({ where: { id: themeID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.deleteTheme = async (req, res, next) => {
	try {
		let themeID = parseInt(req.params.id);

		if (!themeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Theme.destroy({ where: { id: themeID }, force: true });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};
