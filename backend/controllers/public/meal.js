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