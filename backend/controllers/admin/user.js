const DB = require("../../db.config");
const slugify = require("slugify");
const User = DB.User;
const Recipe = DB.Recipe;
const Menu = DB.Menu;
const { RequestError, UserError } = require("../../error/customError");

exports.getAllUsers = (req, res, next) => {
	User.findAll()
		.then((users) => res.json({ data: users }))
		.catch((err) => next(err));
};

exports.getUser = async (req, res, next) => {
	try {
		let userID = parseInt(req.params.id);

		if (!userID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let user = await User.findOne({
			where: { id: userID },
			include: [{ model: Recipe }, { model: Menu }],
		});

		if (user === null) {
			throw new UserError("Cet utilisateur n'existe pas .", 0);
		}

		return res.json({ data: user });
	} catch (err) {
		next(err);
	}
};

exports.addUser = async (req, res, next) => {
	try {
		const { name, firstname, username, email, password, roles } = req.body;

		if (!name || !firstname || !username || !email || !password || !roles) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}
		req.body.slug = slugify(username);

		let user = await User.findOne({ where: { email: email }, raw: true });

		if (user !== null) {
			throw new RequestError(`L'adresse email ${email} est déjà utilisée.`, 1);
		}

		user = await User.findOne({ where: { username: username }, raw: true });

		if (user !== null) {
			throw new RequestError(`Le pseudo ${username} est déjà utilisé.`, 1);
		}
		// A tester
		if (roles !== "ROLE_USER" || roles !== "ROLE_ADMIN") {
			throw new RequestError(`Le format du rôle est incohérent.`, 1);
		}
		let userc = await User.create(req.body);

		return res.json({
			message: "L'utilisateur à bien été créé .",
			data: userc,
		});
	} catch (err) {
		next(err);
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		let userID = parseInt(req.params.id);
		const { username, email, roles } = req.body;

		if (username) {
			let user = await User.findOne({ where: { username: username }, raw: true });
			if (user === null) {
				throw new UserError(`Le pseudo ${username} est déjà utilisé .`, 0);
			}
		}

		if (email) {
			let user = await User.findOne({ where: { email: email }, raw: true });
			if (user === null) {
				throw new UserError(`L'adresse e-mail ${email} est déjà utilisée .`, 0);
			}
		}

		if (!userID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let user = await User.findOne({ where: { id: userID }, raw: true });

		if (user === null) {
			throw new UserError("Cet utilisateur n'existe pas .", 0);
		}
		// A tester
		if (roles !== "ROLE_USER" || roles !== "ROLE_ADMIN") {
			throw new RequestError(`Le format du rôle est incohérent.`, 1);
		}

		req.body.slug = slugify(req.body.name);

		let useru = await User.update(req.body, { where: { id: userID } });

		return res.json({
			message: "L'utilisateur à bien été modifié .",
			data: useru,
		});
	} catch (err) {
		next(err);
	}
};

exports.untrashUser = async (req, res, next) => {
	try {
		let userID = parseInt(req.params.id);

		if (!userID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let user = await User.restore({ where: { id: userID } });

		return res.status(204).json({
			message: "L'utilisateur a bien été restauré .",
			data: user,
		});
	} catch (err) {
		next(err);
	}
};

exports.trashUser = async (req, res, next) => {
	try {
		let userID = parseInt(req.params.id);

		if (!userID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await User.destroy({ where: { id: userID } });

		return res.status(204).json({
			message: "L'utilisateur a bien été mis dans la corbeille",
		});
	} catch (err) {
		next(err);
	}
};

exports.deleteUser = async (req, res, next) => {
	try {
		let userID = parseInt(req.params.id);

		if (!userID) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		await User.destroy({ where: { id: userID }, force: true });

		return res.status(204).json({
			message: "L'utilisateur a bien été définitivement supprimé .",
		});
	} catch (err) {
		next(err);
	}
};
