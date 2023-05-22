/* Import des modules nécessaires */
const DB = require("../../db.config");
const Meal = DB.Meal;
const { RequestError, MealError } = require("../../error/customError");

/* Récupération de l'ensemble des Repas */
exports.getAllMeals = (req, res, next) => {
  Meal.findAll()
    .then((meals) => res.json({ data: meals }))
    .catch((err) => next());
};

/* Récupération d'un Repas */
exports.getMeal = async (req, res, next) => {
  let mealID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!mealID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération du Repas
    let meal = await Meal.findOne({
      where: { id: mealID },
      raw: true,
    });
    // Test de l'existance du Repas
    if (meal === null) {
      throw new MealError("Ce repas n'existe pas .", 0);
    }
    // Repas trouvé
    return res.json({ data: meal });
  } catch (err) {
    next(err);
  }
};

/* Création d'un Repas */
exports.addMeal = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    // Validation des données reçues
    if (!name || !description) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Création du Repas
    let meal = await Meal.create(req.body);

    // Réponse du Repas créé.
    return res.json({
      message: "Le repas a bien été créé .",
      data: meal,
    });
  } catch (err) {
    next(err);
  }
};

/* Modification d'un Repas */
exports.updateMeal = async (req, res, next) => {
  try {
    let mealID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!mealID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche du Repas
    let meal = await Meal.findOne({
      where: { id: mealID },
      raw: true,
    });

    // Vérification de l'existance du Repas
    if (meal === null) {
      throw new MealError("Ce repas n'existe pas .", 0);
    }

    // Mise à jour du Repas
    await Meal.update(req.body, { where: { id: mealID } });

    // Réponse de la mise à jour
    return res.json({
      message: "Le repas à bien été modifié .",
      data: meal,
    });
  } catch (err) {
    next(err);
  }
};

/* Annulation de suppression d'un Repas (Soft Delete) */
exports.untrashMeal = async (req, res, next) => {
  try {
    let mealID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!mealID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration du Repas
    await Meal.restore({ where: { id: mealID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Repas (Soft Delete) */
exports.trashMeal = async (req, res, next) => {
  try {
    let mealID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!mealID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du Repas (soft delete without force: true)
    await Meal.destroy({ where: { id: mealID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Repas (Hard Delete) */
exports.deleteMeal = async (req, res, next) => {
  try {
    let mealID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!mealID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du Repas (hard delete with force: true)
    await Meal.destroy({ where: { id: mealID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
