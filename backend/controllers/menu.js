/* Import des modules nécessaires */
const DB = require("../db.config");
const Menu = DB.Menu;
const Recipe = DB.Recipe;
const User = DB.User;
const {
  RequestError,
  RecipeError,
  MenuError,
  UserError,
} = require("../error/customError");

/* Récupération de l'ensemble des Menus */
exports.getAllMenus = (req, res, next) => {
  Menu.findAll()
    .then((menus) => res.json({ data: menus }))
    .catch((err) => next());
};

/* Récupération d'un Menu */
exports.getMenu = async (req, res, next) => {
  let menuID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!menuID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération du menu
    let menu = await Menu.findOne({
      where: { id: menuID },
      include: { model: User, attributes: ["id", "username", "email"] },
    });
    // Test de l'existance du menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas .", 0);
    }
    // Menu trouvé
    return res.json({ data: menu });
  } catch (err) {
    next(err);
  }
};

/* Récupération des Recipes d'un Menu */
exports.getRecipesInMenu = async (req, res, next) => {
  let menuID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!menuID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }
  try {
    // Récupération du menu
    let menu = await Menu.findOne({ where: { id: menuID }, include: Recipe });
    // Test de l'existance du menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas .", 0);
    }
    let recipes = menu.Recipes;
    // Recettes et Menu trouvé
    return res.json({ data: recipes });
  } catch (err) {
    next(err);
  }
};

/* Création d'un Menu */
exports.addMenu = async (req, res, next) => {
  try {
    const { name, description, user_id } = req.body;
    // Validation des données reçues
    if (!name || !description || !user_id) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { id: user_id } });
    // Test de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }
    // Création du menu
    let menu = await Menu.create(req.body, {
      include: [
        {
          model: User,
        },
      ],
    });

    // Réponse du menu créé.
    return res.json({ message: "Le menu a bien été crée .", data: menu });
  } catch (err) {
    next(err);
  }
};

/* Ajout d'une Recipe dans un Menu */
exports.addRecipeInMenu = async (req, res, next) => {
  try {
    const { recipe_id, menu_id, count, course } = req.body;
    // Validation des données reçues
    if (!recipe_id || !menu_id || !count || !course ) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let menu = await Menu.findOne({ where: { id: menu_id, user_id: decodedToken.id } });
    // Vérification de l'existance du menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
    }
    let recipe = await Recipe.findOne({ where: { id: recipe_id } });
    // Vérification de l'existance de la Recipe
    if (recipe === null) {
      throw new RecipeError("Cette Recipe n'existe pas .", 0);
    }
    // Ajout de la Recipe dans le menu
    let menuRecipe = await menu.addRecipe(recipe, {
      through: { count: count },
    });
    // Réponse du menu créé.
    return res.json({
      message: "La Recette a bien été ajoutée au menu .",
      data: menuRecipe,
    });
  } catch (err) {
    next(err);
  }
};

/* Modification d'un Menu */
exports.updateMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche du menu
    let menu = await Menu.findOne({ where: { id: menuID }, raw: true });

    // Vérification de l'existance du menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas .", 0);
    }

    // Mise à jour du menu
    await Menu.update(req.body, { where: { id: menuID } });

    // Réponse de la mise à jour
    return res.json({ message: "Le menu à bien été modifiée .", data: menu });
  } catch (err) {
    next(err);
  }
};

/* Annulation de suppression d'un Menu (Soft Delete) */
exports.untrashMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration du menu
    await Menu.restore({ where: { id: menuID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Menu (Soft Delete) */
exports.trashMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du menu (soft delete without force: true)
    await Menu.destroy({ where: { id: menuID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Menu (Hard Delete) */
exports.deleteMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du menu (hard delete with force: true)
    await Menu.destroy({ where: { id: menuID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
