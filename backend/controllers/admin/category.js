/* Import des modules nécessaires */
const DB = require("../../db.config");
const slugify = require("slugify");
const Category = DB.Category;
const Ingredient = DB.Ingredient;
const {
  RequestError,
  CategoryError,
  RecipeError,
  IngredientError,
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

/* PUT */
exports.addCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    // Validation des données reçues
    if (!name) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    req.body.slug = slugify(name);
    // Création de la categorie
    let category = await Category.create(req.body);

    // Réponse de la categorie créé.
    return res.json({
      message: "La category a bien été créée .",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

/* PATCH ID & BODY*/
exports.updateCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    let categoryID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!categoryID || !name) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche de la categorie
    let category = await Category.findOne({
      where: { id: categoryID },
      raw: true,
    });

    // Vérification de l'existance de la categorie
    if (category === null) {
      throw new CategoryError("Cette category n'existe pas .", 0);
    }

    req.body.slug = slugify(name);

    // Mise à jour de la categorie
    await Category.update(req.body, { where: { id: categoryID } });

    // Réponse de la mise à jour
    return res.json({
      message: "La category à bien été modifiée .",
      data: category,
    });
  } catch (err) {
    next(err);
  }
};

/* POST UNTRASH */
exports.untrashCategory = async (req, res, next) => {
  try {
    let categoryID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!categoryID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration de la categorie
    await Category.restore({ where: { id: categoryID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* SOFT DELETE TRASH */
exports.trashCategory = async (req, res, next) => {
  try {
    let categoryID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!categoryID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de la categorie (soft delete without force: true)
    await Category.destroy({ where: { id: categoryID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* HARD DELETE ID*/
exports.deleteCategory = async (req, res, next) => {
  try {
    let categoryID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!categoryID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de la categorie (hard delete with force: true)
    await Category.destroy({ where: { id: categoryID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Ajout d'un Ingrédient dans une Catégorie */
exports.addIngredientInCategory = async (req, res, next) => {
  try {
    let ingredientID = parseInt(req.params.id);
    const { category_id } = req.body;
    // Validation des données reçues
    if (!category_id || !ingredientID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let category = await Category.findOne({ where: { id: category_id } });
    // Vérification de l'existance de la Catégorie
    if (category === null) {
      throw new RecipeError("Cette Catégorie n'existe pas .", 0);
    }
    let ingredient = await Ingredient.findOne({ where: { id: ingredientID } });
    // Vérification de l'existance de l'ingredient
    if (ingredient === null) {
      throw new IngredientError("Cette Ingredient n'existe pas .", 0);
    }
    // Ajout de l'ingredient dans la Catégorie
    let categoryIngredient = await category.addIngredient(ingredient);
    // Réponse de l'ingrédient ajouté.
    return res.json({
      message: "L'ingrédient a bien été ajoutée à la Catégorie .",
      data: categoryIngredient,
    });
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Ingrédient dans une Catégorie */
exports.deleteIngredientInCategory = async (req, res, next) => {
  try {
    let ingredientID = parseInt(req.params.id);
    const { category_id } = req.body;
    // Validation des données reçues
    if (!category_id || !ingredientID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let category = await Category.findOne({ where: { id: category_id } });
    // Vérification de l'existance de la Catégorie
    if (category === null) {
      throw new RecipeError("Cette Catégorie n'existe pas .", 0);
    }
    let ingredient = await Ingredient.findOne({ where: { id: ingredientID } });
    // Vérification de l'existance de l'ingredient
    if (ingredient === null) {
      throw new IngredientError("Cette Ingredient n'existe pas .", 0);
    }
    // Suppression de l'ingredient dans la Catégorie
    await category.removeIngredient(ingredient);
    // Réponse de l'ingrédient supprimé.
    return res.status(204).json({
      message: "L'ingrédient a bien été supprimé de la Catégorie ."
    });
  } catch (err) {
    next(err);
  }
};