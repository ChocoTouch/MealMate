/* Import des modules nécessaires */
const DB = require("../../db.config");
const Ingredient = DB.Ingredient;
const Recipe = DB.Recipe;
const { RequestError, IngredientError } = require("../../error/customError");

/* Récupération de l'ensemble des Ingredients */
exports.getAllIngredients = (req, res, next) => {
  Ingredient.findAll()
    .then((ingredients) => res.json({ data: ingredients }))
    .catch((err) => next());
};

/* Récupération d'un Ingredient */
exports.getIngredient = async (req, res, next) => {
  let ingredientID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!ingredientID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération de l'ingredient
    let ingredient = await Ingredient.findOne({
      where: { id: ingredientID },
      raw: true,
    });
    // Test de l'existance de l'ingredient
    if (ingredient === null) {
      throw new IngredientError("Cet ingrédient n'existe pas .", 0);
    }
    // Ingredient trouvée
    return res.json({ data: ingredient });
  } catch (err) {
    next(err);
  }
};

/* Récupération des Recettes d'un Ingredient */
exports.getRecipesForIngredient = async (req, res, next) => {
  let ingredientID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!ingredientID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }
  try {
    // Récupération de l'ingredient
    let ingredient = await Ingredient.findOne({
      where: { id: ingredientID },
      include: Recipe,
    });
    // Test de l'existance de l'ingredient
    if (ingredient === null) {
      throw new IngredientError("Cet ingrédient n'existe pas .", 0);
    }
    let recipes = ingredient.Recipes;
    // Recettes et Ingredient trouvé
    return res.json({ data: recipes });
  } catch (err) {
    next(err);
  }
};
