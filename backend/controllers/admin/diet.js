const DB = require("../../db.config");
const slugify = require("slugify");
const Diet = DB.Diet;
const Recipe = DB.Recipe;
const Theme = DB.Theme;
const { RequestError, DietError } = require("../../error/customError");

exports.getAllDiets = (req, res, next) => {
	Diet.findAll()
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
			include: [{ model: Recipe,include: Theme }],
		});

		if (diet === null) {
			throw new DietError("Ce régime n'existe pas .", 0);
		}

		return res.json({ data: diet });
	} catch (err) {
		next(err);
	}
};

exports.addDiet = async (req, res, next) => {
	try {
		const { name, description } = req.body;

		if (!name || !description) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let diet = await Diet.findOne({ where: { name: name } });

		if (diet !== null) {
			throw new RequestError(`Le régime ${name} existe déjà .`);
		}

		req.body.slug = slugify(name);

		let dietc = await Diet.create(req.body);

		return res.json({
			message: "Le régime a bien été créé .",
			data: dietc,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateDiet = async (req, res, next) => {
	try {
		const { name } = req.body;
		let dietID = parseInt(req.params.id);

		if (!dietID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let diet = await Diet.findOne({
			where: { id: dietID },
			raw: true,
		});

		if (diet === null) {
			throw new DietError("Ce régime n'existe pas .", 0);
		}

		diet = await Diet.findOne({ where: { name: name } });

		if (diet !== null) {
			throw new RequestError(`Le régime ${name} existe déjà .`);
		}

		req.body.slug = slugify(name);

		await Diet.update(req.body, { where: { id: dietID } });

		return res.json({
			message: "Le régime à bien été modifié ."
		});
	} catch (err) {
		next(err);
	}
};

exports.untrashDiet = async (req, res, next) => {
	try {
		let dietID = parseInt(req.params.id);

		if (!dietID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Diet.restore({ where: { id: dietID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.trashDiet = async (req, res, next) => {
	try {
		let dietID = parseInt(req.params.id);

		if (!dietID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Diet.destroy({ where: { id: dietID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.deleteDiet = async (req, res, next) => {
	try {
		let dietID = parseInt(req.params.id);

		if (!dietID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Diet.destroy({ where: { id: dietID }, force: true });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};
