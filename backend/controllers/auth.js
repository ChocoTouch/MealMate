/* Import des modules nécessaires */
const jwt = require("jsonwebtoken");
const DB = require("../db.config");
const User = DB.User;
const { AuthenticationError } = require("../error/customError");

/* Routage de la ressource auth (POST)*/
exports.login = async (req, res, next) => {
  try {
    const { email, motdepasse } = req.body;

    // Validation des données
    if (!email || !motdepasse) {
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
    let test = await User.checkPassword(motdepasse, user.motdepasse);
    if (!test) {
      throw new AuthenticationError("Mot de passe incorrect .", 2);
    }

    // Génération du token et envoi
    const token = jwt.sign(
      {
        id: user.id,
        nom: user.nom,
        prenom: user.prenom,
        email: user.email,
        roles: user.roles,
        pseudo: user.pseudo,
        telephone: user.telephone,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_DURING }
    );
    return res.json({ access_token: token });
  } catch (err) {
    next(err);
  }
};
