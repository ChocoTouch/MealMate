/* Import des modules nécessaires */
const DB = require("../../db.config");
const User = DB.User;
const Recipe = DB.Recipe;
const Menu = DB.Menu;
const { RequestError, UserError } = require("../../error/customError");

/* Récupération de l'ensemble des Utilisateurs */
exports.getAllUsers = (req, res, next) => {
  User.findAll({ attributes: ["name", "username", "email"] })
    .then((users) => res.json({ data: users }))
    .catch((err) => next());
};

/* Récupération d'un Utilisateur */
exports.getUser = async (req, res, next) => {
  try {
    let userUsername = req.params.username;

    // Verifie si le champ id est présent + cohérent
    if (!userUsername) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Récupération de l'utilisateur
    let user = await User.findOne({
      where: { username: userUsername },
      //raw: true,
      attributes: ["name", "username", "email"],
      include : [
        {model: Recipe},
        {model: Menu}
      ]
    });
    // Test de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError(`Cet utilisateur ${userUsername} n'existe pas .`, 0);
    }
    // Utilisateur trouvé
    return res.json({ data: user });
  } catch (err) {
    next(err);
  }
};
