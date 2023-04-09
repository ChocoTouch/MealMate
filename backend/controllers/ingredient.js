/* Import des modules nécessaires */
const DB = require('../db.config')
const Ingredient = DB.Ingredient
const { RequestError, RecetteError } = require("../error/customError");

/* Routage de la ressource Ingredient (Ensemble des Ingredients) */
exports.getAllIngredients = (req, res, next) => {
    Ingredient.findAll()
    .then((ingredients) => res.json({ data: ingredients }))
    .catch((err) => next());
};

/* GET ID (Ingredient spécifique)*/
exports.getIngredient = async (req, res, next) => {
  let ingredientID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!ingredientID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération de l'ingredient
    let ingredient = await Ingredient.findOne({ where: { id: ingredientID }, raw: true });
    // Test de l'existance de l'ingredient
    if (ingredient === null) {
      throw new RecetteError("Cet ingredient n'existe pas .", 0);
    }
    // Ingredient trouvée
    return res.json({ data: ingredient });
  } catch (err) {
    next(err);
  }
};

/* PUT */
exports.addIngredient = async (req, res, next) => {
  try {

    const { nom, description, calories, prix } = req.body;
    // Validation des données reçues
    if (!nom || !description || !calories || !prix ) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Création de l'ingredient
    let ingredient = await Ingredient.create(req.body);

    // Réponse de l'ingredient créé.
    return res.json({ message: "L'ingredient a bien été créé .", data: ingredient });
  } catch (err) {
    next(err);
  }
};

/* PATCH ID & BODY*/
exports.updateIngredient = async (req, res, next) => {
  try {
    let ingredientID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!ingredientID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche de l'ingredient
    let ingredient = await Ingredient.findOne({ where: { id: ingredientID }, raw: true });

    // Vérification de l'existance de l'ingredient
    if (ingredient === null) {
      throw new RecetteError("Cet ingredient n'existe pas .", 0);
    }

    // Mise à jour de l'ingredient
    await Ingredient.update(req.body, { where: { id: ingredientID } });

    // Réponse de la mise à jour
    return res.json({ message: "L'ingredient à bien été modifiée .", data: ingredient });
  } catch (err) {
    next(err);
  }
};

/* POST UNTRASH */
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

/* SOFT DELETE TRASH */
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

/* HARD DELETE ID*/
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
