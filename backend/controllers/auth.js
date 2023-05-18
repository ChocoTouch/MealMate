/* Import des modules nécessaires */
const jwt = require("jsonwebtoken");
const DB = require("../db.config");
const User = DB.User;
const { AuthenticationError } = require("../error/customError");

/* Routage de la ressource auth (POST)*/
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validation des données
    if (!email || !password) {
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
    }
    // Génération du token et envoi
    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_DURING }
    );
    return res.json({ access_token: token });
  } catch (err) {
    next(err);
  }
};
