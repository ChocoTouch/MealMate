/* Import des modules nécessaires */
const DB = require("../../db.config");
const Category = DB.Category;
const {
  RequestError,
  CategoryError,
} = require("../../error/customError");

/* Routage de la ressource Category (Ensemble des Categories) */
exports.getAllCategories = (req, res, next) => {
  Category.findAll()
    .then((categories) => res.json({ data: categories }))
    .catch((err) => next());
};

/* GET ID (Categorie spécifique)*/
exports.getCategory = async (req, res, next) => {
  let categoryID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!categoryID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération de la categorie
    let category = await Category.findOne({
      where: { id: categoryID },
      raw: true,
    });
    // Test de l'existance de la categorie
    if (category === null) {
      throw new CategoryError("Cette categorie n'existe pas .", 0);
    }
    // Categorie trouvée
    return res.json({ data: category });
  } catch (err) {
    next(err);
  }
};