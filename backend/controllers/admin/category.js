const DB = require("../../db.config");
const slugify = require("slugify");
const Category = DB.Category;
const Ingredient = DB.Ingredient;
const { RequestError, CategoryError, RecipeError, IngredientError } = require("../../error/customError");

exports.getAllCategories = (req, res, next) => {
	Category.findAll()
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
			include: Ingredient,
		});

		if (category === null) {
			throw new CategoryError("Cette categorie n'existe pas .", 0);
		}

		return res.json({ data: category });
	} catch (err) {
		next(err);
	}
};

exports.addCategory = async (req, res, next) => {
	try {
		const { name } = req.body;

		if (!name) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let category = await Category.findOne({ where: { name: name } });

		if (category !== null) {
			throw new RequestError(`La catégorie ${name} existe déjà .`);
		}

		req.body.slug = slugify(name);

		let categoryc = await Category.create(req.body);

		return res.json({
			message: "La category a bien été créée .",
			data: categoryc,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateCategory = async (req, res, next) => {
	try {
		const { name } = req.body;
		let categoryID = parseInt(req.params.id);

		if (!categoryID || !name) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let category = await Category.findOne({
			where: { id: categoryID },
			raw: true,
		});

		if (category === null) {
			throw new CategoryError("Cette catégorie n'existe pas .", 0);
		}

		category = await Category.findOne({ where: { name: name } });

		if (category !== null) {
			throw new RequestError(`La catégorie ${name} existe déjà .`);
		}

		req.body.slug = slugify(name);

		await Category.update(req.body, { where: { id: categoryID } });

		return res.json({
			message: "La category à bien été modifiée ."
		});
	} catch (err) {
		next(err);
	}
};

exports.untrashCategory = async (req, res, next) => {
	try {
		let categoryID = parseInt(req.params.id);

		if (!categoryID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Category.restore({ where: { id: categoryID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.trashCategory = async (req, res, next) => {
	try {
		let categoryID = parseInt(req.params.id);

		if (!categoryID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Category.destroy({ where: { id: categoryID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.deleteCategory = async (req, res, next) => {
	try {
		let categoryID = parseInt(req.params.id);

		if (!categoryID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Category.destroy({ where: { id: categoryID }, force: true });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.addIngredientInCategory = async (req, res, next) => {
	try {
		let ingredientID = parseInt(req.params.id);
		const { category_id } = req.body;

		if (!category_id || !ingredientID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}
		let category = await Category.findOne({ where: { id: category_id } });

		if (category === null) {
			throw new RecipeError("Cette catégorie n'existe pas .", 0);
		}
		let ingredient = await Ingredient.findOne({ where: { id: ingredientID } });

		if (ingredient === null) {
			throw new IngredientError("Cette ingredient n'existe pas .", 0);
		}

		let categoryIngredient = await category.addIngredient(ingredient);

		return res.json({
			message: "L'ingrédient a bien été ajoutée à la catégorie .",
			data: categoryIngredient,
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteIngredientInCategory = async (req, res, next) => {
	try {
		let ingredientID = parseInt(req.params.id);
		const { category_id } = req.body;

		if (!category_id || !ingredientID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}
		let category = await Category.findOne({ where: { id: category_id } });

		if (category === null) {
			throw new RecipeError("Cette catégorie n'existe pas .", 0);
		}
		let ingredient = await Ingredient.findOne({ where: { id: ingredientID } });

		if (ingredient === null) {
			throw new IngredientError("Cette ingredient n'existe pas .", 0);
		}

		await category.removeIngredient(ingredient);

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};
