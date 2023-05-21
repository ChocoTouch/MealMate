/***************** Import des modules nécessaires *****************/
const DB = require("../../db.config");
const Menu = DB.Menu;
const Recipe = DB.Recipe;
const User = DB.User;
const {
  RequestError,
  MenuError,
} = require("../error/customError");

/***************** Récupération de l'ensemble des Menus *****************/
exports.getAllMenus = (req, res, next) => {
  // Recherche des menus
  Menu.findAll()
    .then((menus) => res.json({ data: menus }))
    .catch((err) => next());
};

/****************** Récupération d'un Menu ******************/
exports.getMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);
    // Vérification de l'existance du champ
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Récupération du menu
    let menu = await Menu.findOne({
      where: { id: menuID },
      include: { model: User, attributes: ["id", "username", "email"] },
    });
    // Vérification de l'existance du menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas .", 0);
    }
    // Réponse du Menu Trouvé
    return res.json({ data: menu });
  } catch (err) {
    next(err);
  }
};

/****************** Récupération des Recettes d'un Menu ******************/
exports.getRecipesInMenu = async (req, res, next) => {
  let menuID = parseInt(req.params.id);
  // Verification de l'existance du champ
  if (!menuID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }
  try {
    // Récupération du menu
    let menu = await Menu.findOne({ where: { id: menuID }, include: Recipe });
    // Vérification de l'existance du menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas .", 0);
    }
    let recipes = menu.Recipes;
    // Réponse des Recettes et du Menu trouvés
    return res.json({ data: recipes });
  } catch (err) {
    next(err);
  }
};