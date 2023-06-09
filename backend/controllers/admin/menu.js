const DB = require("../../db.config");
const slugify = require("slugify");
const Menu = DB.Menu;
const Recipe = DB.Recipe;
const Meal = DB.Meal;
const User = DB.User;
const Course = DB.Course;
const DayOfWeek = DB.DayOfWeek;
const Comment = DB.Comment;
const Menu_Recipe = DB.Menu_recipe;
const {
	RequestError,
	MenuError,
	UserError,
} = require("../../error/customError");

exports.getAllMenus = (req, res, next) => {
	Menu.findAll()
		.then((menus) => res.json({ data: menus }))
		.catch((err) => next(err));
};

exports.getMenu = async (req, res, next) => {
	try {
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({
			where: { id: menuID },
			include: [
				{ model: User },
				{
					model: Recipe,
					include: [{ model: Menu_Recipe, include: [Course, Meal] }],
					through: {
						attributes: [],
					},
				},
				{ model: Comment },
			],
		});

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas .", 0);
		}

		return res.json({ data: menu });
	} catch (err) {
		next(err);
	}
};

exports.addMenu = async (req, res, next) => {
	try {
		const { name, description, user_id } = req.body;

		if (!name || !description || !user_id) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let user = await User.findOne({ where: { id: user_id } });

		if (user === null) {
			throw new UserError("Cet utilisateur n'existe pas .", 0);
		}

		req.body.user_username = user.username;
		if(req.file){
			req.body.image = req.file.path;
		}
		req.body.slug = slugify(name);

		let menuc = await Menu.create(req.body);

		return res.json({ message: "Le menu a bien été créé .", data: menuc });
	} catch (err) {
		next(err);
	}
};

exports.updateMenu = async (req, res, next) => {
	try {
		const { name, user_id } = req.body;
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let menu = await Menu.findOne({ where: { id: menuID }, raw: true });

		if (menu === null) {
			throw new MenuError("Ce menu n'existe pas .", 0);
		}

		if (user_id) {
			let user = await User.findOne({ where: { id: user_id } });

			if (user === null) {
				throw new UserError("Cet utilisateur n'existe pas .", 0);
			}

			req.body.user_username = user.username;
		}

		if (name) {
			req.body.slug = slugify(name);
		}
		
		if(req.file){
			req.body.image = req.file.path;
		}

		await Menu.update(req.body, { where: { id: menuID } });

		return res.json({ message: "Le menu à bien été modifié ." });
	} catch (err) {
		next(err);
	}
};

exports.untrashMenu = async (req, res, next) => {
	try {
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Menu.restore({ where: { id: menuID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.trashMenu = async (req, res, next) => {
	try {
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Menu.destroy({ where: { id: menuID } });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};

exports.deleteMenu = async (req, res, next) => {
	try {
		let menuID = parseInt(req.params.id);

		if (!menuID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await Menu.destroy({ where: { id: menuID }, force: true });

		return res.status(204).json({});
	} catch (err) {
		next(err);
	}
};