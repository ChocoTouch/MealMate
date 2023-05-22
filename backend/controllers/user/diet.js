/* Import des modules nécessaires */
const DB = require("../../db.config");
const Diet = DB.Diet;
const Recipe = DB.Recipe;
const { RequestError, DietError } = require("../../error/customError");

/* Récupération de l'ensemble des Régimes */
exports.getAllDiets = (req, res, next) => {
  Diet.findAll()
    .then((diets) => res.json({ data: diets }))
    .catch((err) => next());
};

/* Récupération d'un Régime */
exports.getDiet = async (req, res, next) => {
  let dietID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!dietID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération du Régime
    let diet = await Diet.findOne({
      where: { id: dietID },
      raw: true,
    });
    // Test de l'existance du Régime
    if (diet === null) {
      throw new DietError("Ce régime n'existe pas .", 0);
    }
    // Régime trouvé
    return res.json({ data: diet });
  } catch (err) {
    next(err);
  }
};

/* Récupération des Recettes d'un Régime */
exports.getRecipesForDiet = async (req, res, next) => {
    let dietID = parseInt(req.params.id);
    // Verifie si le champ id est présent + cohérent
    if (!dietID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    try {
      // Récupération du régime
      let diet = await Diet.findOne({
        where: { id: dietID },
        include: Recipe,
      });
      // Test de l'existance du régime
      if (diet === null) {
        throw new DietError("Ce régime n'existe pas .", 0);
      }
      let recipes = diet.Recipes;
      // Recettes et régime trouvé
      return res.json({ data: recipes });
    } catch (err) {
      next(err);
    }
  };