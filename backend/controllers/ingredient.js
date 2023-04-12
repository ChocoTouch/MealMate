/* Import des modules nécessaires */
const DB = require("../db.config");
const Ingredient = DB.Ingredient;
const Recette = DB.Recette;
const { RequestError, IngredientError } = require("../error/customError");

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
exports.getRecettesForIngredient = async (req, res, next) => {
  let ingredientID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!ingredientID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }
  try {
    // Récupération de l'ingredient
    let ingredient = await Ingredient.findOne({
      where: { id: ingredientID },
      include: Recette,
    });
    // Test de l'existance de l'ingredient
    if (ingredient === null) {
      throw new IngredientError("Cet ingrédient n'existe pas .", 0);
    }
    let recettes = ingredient.Recettes;
    // Recettes et Ingredient trouvé
    return res.json({ data: recettes });
  } catch (err) {
    next(err);
  }
};

/* Création d'un Ingredient */
exports.addIngredient = async (req, res, next) => {
  try {
    const { nom, description, calories, prix } = req.body;
    // Validation des données reçues
    if (!nom || !description || !calories || !prix) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
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
    let ingredientID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!ingredientID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
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

    // Mise à jour de l'ingredient
    await Ingredient.update(req.body, { where: { id: ingredientID } });

    // Réponse de la mise à jour
    return res.json({
      message: "L'ingredient à bien été modifiée .",
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
