const DB = require("../../db.config");
const slugify = require("slugify");
const Ingredient = DB.Ingredient;
const Recipe = DB.Recipe;
const Category = DB.Category;
const { RequestError, IngredientError } = require("../../error/customError");

exports.getAllIngredients = (req, res, next) => {
	Ingredient.findAll()
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
			include: [{ model: Category }, { model: Recipe }],
		});

		if (ingredient === null) {
			throw new IngredientError("Cet ingrédient n'existe pas .", 0);
		}

		return res.json({ data: ingredient });
	} catch (err) {
		next(err);
	}
};

exports.addIngredient = async (req, res, next) => {
	try {
		const { name, description, calories, price } = req.body;

		if (!name || !description || !calories || !price) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}
		if (price < 0) {
			throw new RequestError("Le prix ne peut pas être négatif", 0);
		}
		if (calories < 0) {
			throw new RequestError("Les calories ne peuvent pas être négatif", 0);
		}

		let ingredient = await Ingredient.findOne({ where: { name: name } });

		if (ingredient !== null) {
			throw new RequestError(`L'ingrédient ${name} existe déjà .`);
		}

		req.body.slug = slugify(name);

		req.body.image = req.file.path || null;

		let ingredientc = await Ingredient.create(req.body);

		return res.json({
			message: "L'ingredient a bien été créé .",
			data: ingredientc,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateIngredient = async (req, res, next) => {
	try {
		const { name, price } = req.body;
		let ingredientID = parseInt(req.params.id);

		if (!ingredientID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		if (price < 0) {
			throw new RequestError("Le prix ne peut être négatif", 0);
		}

		let ingredient = await Ingredient.findOne({
			where: { id: ingredientID },
			raw: true,
		});

		if (ingredient === null) {
			throw new IngredientError("Cet ingredient n'existe pas .", 0);
		}

		req.body.slug = slugify(name);

		req.body.image = req.file.path || null;
		
		await Ingredient.update(req.body, { where: { id: ingredientID } });

		return res.json({
			message: "L'ingredient à bien été modifié .",
		});
	} catch (err) {
		next(err);
	}
};

exports.untrashIngredient = async (req, res, next) => {
	try {
		let ingredientID = parseInt(req.params.id);

		if (!ingredientID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Ingredient.restore({ where: { id: ingredientID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.trashIngredient = async (req, res, next) => {
	try {
		let ingredientID = parseInt(req.params.id);

		if (!ingredientID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Ingredient.destroy({ where: { id: ingredientID } });

		return res.status(204).json({
			message: "L'ingrédient a bien été mis dans la corbeille",
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteIngredient = async (req, res, next) => {
	try {
		let ingredientID = parseInt(req.params.id);

		if (!ingredientID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Ingredient.destroy({ where: { id: ingredientID }, force: true });

		return res.status(204).json({
			message: "L'ingrédient a bien été définitivement supprimé .",
		});
	} catch (err) {
		next(err);
	}
};
