/* Import des modules nécessaires */
const DB = require("../../db.config");
const Category = DB.Category;
const { RequestError, CategoryError } = require("../../error/customError");

/* Récupération de l'ensemble des Catégories */
exports.getAllCategories = (req, res, next) => {
  Category.findAll()
    .then((categories) => res.json({ data: categories }))
    .catch((err) => next());
};

/* Récupération d'une Catégorie*/
exports.getCategory = async (req, res, next) => {
  let categoryID = parseInt(req.params.id);
  // Vérification de l'existance du champ
  if (!categoryID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération de la categorie
    let category = await Category.findOne({
      where: { id: categoryID },
      raw: true,
    });
    // Vérification de l'existance de la categorie
    if (category === null) {
      throw new CategoryError("Cette categorie n'existe pas .", 0);
    }
    // Réponse de la Categorie trouvée
    return res.json({ data: category });
  } catch (err) {
    next(err);
  }
};
