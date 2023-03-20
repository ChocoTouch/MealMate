/* Import des modules nécessaires */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { AuthenticationError } = require("../error/customError");

/* Routage de la ressource auth (POST)*/
exports.login = async (req, res, next) => {
  try {
    const { Email, Password } = req.body;

    // Validation des données
    if (!Email || !Password) {
      throw new AuthenticationError("Bad email or password", 0);
    }

    // Vérification de l'éxistance de l'utilisateur
    let user = await User.findOne({ where: { Email: Email }, raw: true });
    if (user === null) {
      throw new AuthenticationError(
        "This email is not linked to an account .",
        1
      );
    }

    // Vérification du mot de passe
    let test = await bcrypt.compare(Password, user.Password);
    if (!test) {
      throw new AuthenticationError("Password is wrong .", 2);
    }

    // Génération du token et envoi
    const token = jwt.sign(
      {
        id: user.UserID,
        nom: user.Nom,
        prenom: user.Prenom,
        email: user.Email,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_DURING }
    );
    return res.json({ access_token: token });
  } catch (err) {
    next(err);
  }
};
