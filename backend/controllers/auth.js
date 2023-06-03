/* Import des modules nécessaires */
const jwt = require("jsonwebtoken");
const DB = require("../db.config");
const slugify = require("slugify");
const User = DB.User;
const {
  AuthenticationError,
  RequestError,
} = require("../error/customError");

/* Authentification */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation des données
    if (!email || !password ) {
      throw new AuthenticationError("Vos identifiants sont incorrects .", 0);
    }

    // Vérification de l'existance de l'utilisateur
    let user = await User.findOne({ where: { email: email }, raw: true });
    if (user === null) {
      throw new AuthenticationError(
        "Cette adresse email n'est pas reliée à un compte .",
        1
      );
    }
    // Vérification du mot de passe
    let test = await User.checkPassword(password, user.password);
    if (!test) {
      throw new AuthenticationError("Mot de passe incorrect .", 2);
    }
    // Charge Utile
    const payload = {
      id: user.id,
      name: user.name,
      firstname: user.firstname,
      email: user.email,
      roles: user.roles,
      username: user.username,
      telephone: user.telephone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    // Génération et envoi du token 
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_DURING,
    });
    return res.json({ access_token: token, roles: user.roles });
  } catch (err) {
    next(err);
  }
};

/* Inscription */
exports.register = async (req, res, next) => {
  try {
    const { name, firstname, username, email, password, confirmedPassword  } = req.body;

    // Validation des données reçues
    if (!name || !firstname || !username || !email || !password || !confirmedPassword) {
      throw new RequestError("Paramètre(s) manquant(s) .",0);
    }

    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { email: email }, raw: true });

    // Vérification de l'existance de l'utilisateur
    if (user !== null) {
      throw new RequestError(`L'adresse email ${email} est déjà utilisée.`, 1);
    }

    // Récupération de l'utilisateur
    user = await User.findOne({ where: { username: username }, raw: true });
    // Vérification de l'existance de l'utilisateur
    if (user !== null) {
      throw new RequestError(`Le pseudo ${username} est déjà utilisé.`, 1);
    }

    // Vérification des mots de passe soumis
    if (confirmedPassword !== password) {
      throw new RequestError("Les mots de passe sont différents", 2);
    }
    // Attribution du Role
    req.body.roles = "ROLE_USER";

    // Génération du Slug
    req.body.slug = slugify(username);

    // Création de l'utilisateur
    await User.create(req.body);

    // Réponse de l'utilisateur créé.
    return res.json({
      message: "Votre compte a bien été créé .",
    });
  } catch (err) {
    next(err);
  }
};
