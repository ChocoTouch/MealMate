/* Import des modules nécessaires */
const DB = require("../../db.config");
const User = DB.User;
const Recipe = DB.Recipe;
const Menu = DB.Menu;
const { RequestError, UserError } = require("../../error/customError");

/* Récupération de l'ensemble des Utilisateurs */
exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => res.json({ data: users }))
    .catch((err) => next());
};

/* Récupération d'un Utilisateur */
exports.getUser = async (req, res, next) => {
  let userID = parseInt(req.params.id);

  // Verifie si le champ id est présent + cohérent
  if (!userID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { id: userID }, raw: true });
    // Test de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }
    // Utilisateur trouvé
    return res.json({ data: user });
  } catch (err) {
    next(err);
  }
};

/* Récupération des Recipes d'un Utilisateur */
exports.getRecipesForUser = async (req, res, next) => {
    let userID = parseInt(req.params.id);
  
    try {
      // Récupération de l'utilisateur
      let recipes = await Recipe.findAll({
        where: { user_id: userID },
      });
      // Test de l'existance de l'utilisateur
      if (recipes === null) {
        throw new UserError("Cet utilisateur n'existe pas .", 0);
      }
      // Utilisateur trouvé
      return res.json({ data: recipes });
    } catch (err) {
      next(err);
    }
  };
  
  /* Récupération des menus d'un Utilisateur */
  exports.getMenusForUser = async (req, res, next) => {
    let userID = parseInt(req.params.id);
  
    try {
      // Récupération de l'utilisateur
      let menus = await Menu.findAll({
        where: { user_id: userID },
      });
      // Test de l'existance de l'utilisateur
      if (menus === null) {
        throw new UserError("Cet utilisateur n'existe pas .", 0);
      }
      // Utilisateur trouvé
      return res.json({ data: menus });
    } catch (err) {
      next(err);
    }
  };