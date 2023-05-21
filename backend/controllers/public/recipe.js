/* Import des modules nécessaires */
const DB = require("../../db.config");
const Recipe = DB.Recipe;
const User = DB.User;
const Menu = DB.Menu;
const Ingredient = DB.Ingredient;
const Diet = DB.Diet;
const Theme = DB.Theme;
const {
  RequestError,
  RecipeError,
} = require("../../error/customError");

/* Récupération de l'ensemble des Recettes */
exports.getAllRecipes = (req, res, next) => {
  Recipe.findAll()
    .then((recipes) => res.json({ data: recipes }))
    .catch((err) => next());
};

/* Récupération d'une Recette */
exports.getRecipe = async (req, res, next) => {
  let recipeID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!recipeID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération de la Recette
    let recipe = await Recipe.findOne({
      where: { id: recipeID },
      include: [
        { model: User, attributes: ["id", "username", "email"] },
        { model: Theme, attributes: ["id", "name", "description"] },
        { model: Diet },
        { model: Ingredient },
      ],
    });
    // Test de l'existance de la Recette
    if (recipe === null) {
      throw new RecipeError("Cette recette n'existe pas .", 0);
    }
    // Recette trouvée
    return res.json({ data: recipe });
  } catch (err) {
    next(err);
  }
};

/* Récupération des Menus d'une Recette */
exports.getMenusForRecipe = async (req, res, next) => {
  let recipeID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!recipeID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }
  try {
    // Récupération de
    let recipe = await Recipe.findOne({
      where: { id: recipeID },
      include: Menu,
    });
    // Test de l'existance de la Recette
    if (recipe === null) {
      throw new RecipeError("Cette Recette n'existe pas .", 0);
    }
    let menus = recipe.Menus;
    // Recipe et Menus trouvé
    return res.json({ data: menus });
  } catch (err) {
    next(err);
  }
};
