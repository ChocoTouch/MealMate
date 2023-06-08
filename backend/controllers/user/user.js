const DB = require("../../db.config");
const jwt = require("jsonwebtoken");
const slugify = require("slugify");
const User = DB.User;
const Recipe = DB.Recipe;
const Menu = DB.Menu;
const Theme = DB.Theme;
const { RequestError, AuthenticationError, UserError } = require("../../error/customError");

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

exports.getMyUser = async (req, res, next) => {
	try {
		let userID = req.decodedToken.id;

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
			attributes: ["id", "name", "slug", "email", "firstname", "username", "telephone"],
		});

		if (user === null) {
			throw new UserError("Cet utilisateur n'existe pas . ?????????", 0);
		}

		return res.json({ data: user });
	} catch (err) {
		next(err);
	}
};

exports.updateMyProfile = async (req, res, next) => {
	try {
		const { username, email, password, name, firstname, telephone } = req.body;

		// Validation des données envoyées
		if (!password) {
			throw new AuthenticationError("Veuillez entrer votre mot de passe .", 0);
		}

		// Récupération des données de l'utilisateur connecté
		let loggedUser = await User.findOne({ where: { id: req.decodedToken.id }, raw: true });
    	
		// Vérification du mot de passe
		let test = await User.checkPassword(password, loggedUser.password);
		if (!test) {
			throw new AuthenticationError("Mot de passe incorrect .", 0);
		}

		// Vérification du pseudo envoyé
		if (username) {
			if (username !== loggedUser.username) {
				let user = await User.findOne({ where: { username: username }, raw: true });
				if (user !== null) {
					throw new UserError(`Le pseudo ${username} est déjà utilisé .`, 0);
				}
			}
		}

		// Vérification de l'email envoyé
		if (email) {
			if (email !== loggedUser.email) {
				let user = await User.findOne({ where: { email: email }, raw: true });
				if (user !== null) {
					throw new UserError(`L'adresse e-mail ${email} est déjà utilisée .`, 0);
				}
			}
		}

		// Nouvelles données de l'utilisateur
		updatedUser = {
			id: loggedUser.id,
			name: name,
			firstname: firstname,
			telephone: telephone,
			email: email,
			username: username,
			roles: loggedUser.roles,
			image: req.file.path || null
		};

		// Mise à jour de l'utilisateur
		await User.update(updatedUser, { where: { id: req.decodedToken.id } });

		// Génération du nouveau token
		const token = jwt.sign(updatedUser, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_DURING,
		});

		// Envoi du token et du rôle
		return res.json({ access_token: token, roles: updatedUser.roles, message: "Votre profil à bien été modifié" });
	} catch (err) {
		console.log(err)
		next(err);
	}
};
