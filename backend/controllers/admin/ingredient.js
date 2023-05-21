/***** DONE ******/
/* Import des modules nécessaires */
const DB = require("../../db.config");
const slugify = require("slugify");
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

/* Création d'un Ingredient */
exports.addIngredient = async (req, res, next) => {
  try {
    const { name, description, calories, price } = req.body;
    // Validation des données reçues
    if (!name || !description || !calories || !price) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    if (price < 0) {
      throw new RequestError("Le prix ne peut être négatif", 0);
    }

    req.body.slug = slugify(name);
    // Création de l'ingredient
    let ingredient = await Ingredient.create(req.body);

    // Réponse de l'ingredient créé.
    return res.json({
      message: "L'ingredient a bien été créé .",
      data: ingredient,
    });
  } catch (err) {
    next(err);
  }
};

/* Modification d'un Ingredient */
exports.updateIngredient = async (req, res, next) => {
  try {
    const { name, price } = req.body;
    let ingredientID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!ingredientID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    if (price < 0) {
      throw new RequestError("Le prix ne peut être négatif", 0);
    }

    // Recherche de l'ingredient
    let ingredient = await Ingredient.findOne({
      where: { id: ingredientID },
      raw: true,
    });

    // Vérification de l'existance de l'ingredient
    if (ingredient === null) {
      throw new IngredientError("Cet ingredient n'existe pas .", 0);
    }
    req.body.slug = slugify(name);
    // Mise à jour de l'ingredient
    await Ingredient.update(req.body, { where: { id: ingredientID } });

    // Réponse de la mise à jour
    return res.json({
      message: "L'ingredient à bien été modifié .",
      data: ingredient,
    });
  } catch (err) {
    next(err);
  }
};

/* Annulation de suppression d'un Ingredient (Soft Delete) */
exports.untrashIngredient = async (req, res, next) => {
  try {
    let ingredientID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!ingredientID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration de l'ingredient
    await Ingredient.restore({ where: { id: ingredientID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Ingredient (Soft Delete) */
exports.trashIngredient = async (req, res, next) => {
  try {
    let ingredientID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!ingredientID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de l'ingredient (soft delete without force: true)
    await Ingredient.destroy({ where: { id: ingredientID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Ingredient (Hard Delete) */
exports.deleteIngredient = async (req, res, next) => {
  try {
    let ingredientID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!ingredientID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de l'ingredient (hard delete with force: true)
    await Ingredient.destroy({ where: { id: ingredientID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
