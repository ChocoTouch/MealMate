const DB = require("../../db.config");
const slugify = require("slugify");
const Meal = DB.Meal;
const { RequestError, MealError } = require("../../error/customError");

exports.getAllMeals = (req, res, next) => {
	Meal.findAll()
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
			raw: true,
		});

		if (meal === null) {
			throw new MealError("Ce repas n'existe pas .", 0);
		}

		return res.json({ data: meal });
	} catch (err) {
		next(err);
	}
};

exports.addMeal = async (req, res, next) => {
	try {
		const { name, description } = req.body;

		if (!name || !description) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let meal = await Meal.findOne({
			where: { name: name },
			raw: true,
		});

		if (meal !== null) {
			throw new RequestError(`Le Repas ${name} existe déjà.`, 1);
		}
		req.body.slug = slugify(name);

		await Meal.create(req.body);

		return res.json({
			message: "Le repas a bien été créé .",
			data: meal,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateMeal = async (req, res, next) => {
	try {
		let mealID = parseInt(req.params.id);
		const name = req.body.name;

		if (!mealID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let meal = await Meal.findOne({
			where: { id: mealID },
			raw: true,
		});

		if (meal === null) {
			throw new MealError("Ce repas n'existe pas .", 0);
		}

		meal = await Meal.findOne({
			where: { name: name },
			raw: true,
		});

		if (meal !== null) {
			throw new RequestError(`Le Repas ${name} existe déjà.`, 1);
		}

		req.body.slug = slugify(name);

		await Meal.update(req.body, { where: { id: mealID } });

		return res.json({
			message: "Le repas à bien été modifié .",
			data: meal,
		});
	} catch (err) {
		next(err);
	}
};

exports.untrashMeal = async (req, res, next) => {
	try {
		let mealID = parseInt(req.params.id);

		if (!mealID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let meal = await Meal.restore({ where: { id: mealID } });

		return res.status(204).json({
			message: "Le repas a bien été restauré .",
			data: meal,
		});
	} catch (err) {
		next(err);
	}
};

exports.trashMeal = async (req, res, next) => {
	try {
		let mealID = parseInt(req.params.id);

		if (!mealID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Meal.destroy({ where: { id: mealID } });

		return res.status(204).json({
			message: "Le repas a bien été mis dans la corbeille",
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteMeal = async (req, res, next) => {
	try {
		let mealID = parseInt(req.params.id);

		if (!mealID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Meal.destroy({ where: { id: mealID }, force: true });

		return res.status(204).json({
			message: "Le repas a bien été définitivement supprimé .",
		});
	} catch (err) {
		next(err);
	}
};
