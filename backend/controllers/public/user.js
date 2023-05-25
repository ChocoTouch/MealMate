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