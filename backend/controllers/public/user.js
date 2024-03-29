const DB = require("../../db.config");
const User = DB.User;
const Recipe = DB.Recipe;
const Menu = DB.Menu;
const Theme = DB.Theme;
const { RequestError, UserError } = require("../../error/customError");

exports.getAllUsers = (req, res, next) => {
	User.findAll({
		include: [
			{
				model: Recipe,
				attributes: ["id", "name", "slug", "description", "image"],
				include: [{ model: Theme, attributes: ["id", "name", "slug", "description"] }],
			},
			{ model: Menu, attributes: ["id", "user_id", "name", "slug", "description", "image"] },
		],
		attributes: ["id", "name", "slug", "firstname", "username", "image"]
	})
		.then((users) => res.json({ data: users }))
		.catch((err) => next(err));
};

exports.getUser = async (req, res, next) => {
	try {
		let userSlug = parseInt(req.params.slug);

		if (!userSlug) {
			throw new RequestError("Paramètre(s) manquant(s) .");
		}

		let user = await User.findOne({
			where: { slug: userSlug },
			include: [
				{
					model: Recipe,
					attributes: ["id", "name", "slug", "description", "image"],
					include: [{ model: Theme, attributes: ["id", "name", "slug", "description"] }],
				},
				{ model: Menu, attributes: ["id", "user_id", "name", "slug", "description", "image"] },
			],
			attributes: ["id", "name", "slug", "firstname", "username", "image"],
		});

		if (user === null) {
			throw new UserError("Cet utilisateur n'existe pas .", 0);
		}

		return res.json({ data: user });
	} catch (err) {
		next(err);
	}
};
