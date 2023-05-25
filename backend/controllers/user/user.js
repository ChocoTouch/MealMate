const DB = require("../../db.config");
const User = DB.User;
const Recipe = DB.Recipe;
const Menu = DB.Menu;
const Theme = DB.Theme;
const { RequestError, UserError } = require("../../error/customError");

exports.getAllUsers = (req, res, next) => {
	User.findAll({ attributes: ["id", "name", "slug", "firstname", "username"] })
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
			include: [
				{
					model: Recipe,
					attributes: ["id", "name", "slug", "description"],
					include: [{ model: Theme, attributes: ["id", "name", "slug", "description"] }],
				},
				{ model: Menu, attributes: ["id", "user_id", "name", "slug", "description"] },
			],
			attributes: ["id", "name", "slug", "firstname", "username"],
		});

		if (user === null) {
			throw new UserError("Cet utilisateur n'existe pas .", 0);
		}

		return res.json({ data: user });
	} catch (err) {
		next(err);
	}
};
exports.updateMyProfile = async (req, res, next) => {
	try {
		const { username, email } = req.body;

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

		req.body.roles = "ROLE_USER";
		req.body.slug = slugify(req.body.username);

		await User.update(req.body, { where: { id: req.decodedToken.id } });

		return res.json({
			message: "Votre profil à bien été modifié .",
		});
	} catch (err) {
		next(err);
	}
};
