const DB = require("../../db.config");
const slugify = require("slugify");
const Recipe = DB.Recipe;
const User = DB.User;
const Menu = DB.Menu;
const Ingredient = DB.Ingredient;
const Diet = DB.Diet;
const Theme = DB.Theme;
const Comment = DB.Comment;
const { RequestError, RecipeError, UserError } = require("../../error/customError");

exports.getAllRecipes = (req, res, next) => {
	Recipe.findAll({ include: Theme })
		.then((recipes) => res.json({ data: recipes }))
		.catch((err) => next(err));
};

exports.getMyRecipes = async (req, res, next) => {
	try {
		let recipes = await Recipe.findAll({
			where: { user_id: req.decodedToken.id },
			include: [{ model: Ingredient }, { model: Comment }, { model: Theme }, { model: Diet }],
		});
		return res.json({ data: recipes });
	} catch (err) {
		next(err);
	}
};

exports.getRecipe = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);

		if (!recipeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let recipe = await Recipe.findOne({
			where: { id: recipeID },
			include: [{ model: User }, { model: Theme }, { model: Ingredient }, { model: Menu }, { model: Diet }, { model: Comment }],
		});

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas .", 0);
		}

		return res.json({ data: recipe });
	} catch (err) {
		next(err);
	}
};

exports.addRecipe = async (req, res, next) => {
	try {
		const { name, user_id, description, instructions, difficulty, theme_id } = req.body;

		if (!name || !user_id || !description || !instructions || !difficulty) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		if (difficulty < 1 || difficulty > 5) {
			throw new RequestError("La difficulté est incohérente .", 0);
		}
		
		if(req.file){
			req.body.image = req.file.path;
		}

		if (!theme_id) {
			req.body.theme_id = 1;
		} else {
			let theme = await Theme.findOne({ where: { id: theme_id } });
			if (!theme) {
				throw new RequestError("Ce thème n'existe pas .", 0);
			}
		}

		let user = await User.findOne({ where: { id: user_id } });

		if (user === null) {
			throw new UserError("Cet utilisateur n'existe pas .", 0);
		}

		req.body.user_username = user.username;

		req.body.slug = slugify(name);

		let recipec = await Recipe.create(req.body);

		return res.json({
			message: "La recette a bien été créée .",
			data: recipec,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateRecipe = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);
		const { name, user_id, theme_id, difficulty } = req.body;

		if (!recipeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		if (!theme_id) {
			req.body.theme_id = 1;
		} else {
			let theme = await Theme.findOne({ where: { id: theme_id } });
			if (!theme) {
				throw new RequestError("Ce thème n'existe pas .", 0);
			}
		}

		if (difficulty < 1 || difficulty > 5) {
			throw new RequestError("La difficulté est incohérente .", 0);
		}
		
		if(req.file){
			req.body.image = req.file.path;
		}

		let recipe = await Recipe.findOne({
			where: { id: recipeID },
			raw: true,
		});

		if (recipe === null) {
			throw new RecipeError("Cette recette n'existe pas .", 0);
		}

		if(user_id){
			let user = await User.findOne({ where: { id: user_id } });

			if (user === null) {
				throw new UserError("Cet utilisateur n'existe pas .", 0);
			}
			req.body.user_username = user.username;
		}

		if(name){
			req.body.slug = slugify(name);
		}
		
		await Recipe.update(req.body, { where: { id: recipeID } });

		return res.json({
			message: "La recette à bien été modifiée .",
		});
	} catch (err) {
		console.log(err)
		next(err);
	}
};

exports.untrashRecipe = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);

		if (!recipeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Recipe.restore({ where: { id: recipeID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.trashRecipe = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);

		if (!recipeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Recipe.destroy({ where: { id: recipeID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.deleteRecipe = async (req, res, next) => {
	try {
		let recipeID = parseInt(req.params.id);

		if (!recipeID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Recipe.destroy({ where: { id: recipeID }, force: true });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};
