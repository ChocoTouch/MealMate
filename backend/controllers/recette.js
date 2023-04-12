/* Import des modules nécessaires */
const DB = require("../db.config");
const Recette = DB.Recette;
const User = DB.User;
const Menu = DB.Menu;
const Ingredient = DB.Ingredient;
const {
  RequestError,
  RecetteError,
  IngredientError,
  UserError,
} = require("../error/customError");

/* Récupération de l'ensemble des Recettes */
exports.getAllRecettes = (req, res, next) => {
  Recette.findAll()
    .then((recettes) => res.json({ data: recettes }))
    .catch((err) => next());
};

/* Récupération d'une Recette */
exports.getRecette = async (req, res, next) => {
  let recetteID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!recetteID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération de la recette
    let recette = await Recette.findOne({
      where: { id: recetteID },
      include: { model: User, attributes: ["id", "pseudo", "email"] },
    });
    // Test de l'existance de la recette
    if (recette === null) {
      throw new RecetteError("Cette recette n'existe pas .", 0);
    }
    // Recette trouvée
    return res.json({ data: recette });
  } catch (err) {
    next(err);
  }
};

/* Récupération des Menus d'une Recette */
exports.getMenusForRecette = async (req, res, next) => {
  let recetteID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!recetteID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }
  try {
    // Récupération de
    let recette = await Recette.findOne({
      where: { id: recetteID },
      include: Menu,
    });
    // Test de l'existance de la recette
    if (recette === null) {
      throw new RecetteError("Cette recette n'existe pas .", 0);
    }
    let menus = recette.Menus;
    // Recette et Menus trouvé
    return res.json({ data: menus });
  } catch (err) {
    next(err);
  }
};
/* Récupération des Ingredients d'une Recette */
exports.getIngredientsForRecette = async (req, res, next) => {
  let recetteID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!recetteID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }
  try {
    // Récupération de la recette
    let recette = await Recette.findOne({
      where: { id: recetteID },
      include: Ingredient,
    });
    // Test de l'existance de la recette
    if (recette === null) {
      throw new RecetteError("Cette recette n'existe pas .", 0);
    }
    let ingredients = recette.Ingredients;
    // Recette et Ingredients trouvé
    return res.json({ data: ingredients });
  } catch (err) {
    next(err);
  }
};

/* Création d'une Recette */
exports.addRecette = async (req, res, next) => {
  try {
    const {
      nom,
      user_id,
      description,
      instructions,
      pays,
      vegetarien,
      vegetalien,
      sansgluten,
    } = req.body;
    // Validation des données reçues
    if (
      !nom ||
      !user_id ||
      !description ||
      !instructions ||
      !pays ||
      !vegetarien ||
      !vegetalien ||
      !sansgluten
    ) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { id: user_id } });
    // Test de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }
    // Création de la recette
    let recette = await Recette.create(req.body, {
      include: [
        {
          model: User,
        },
      ],
    });

    // Réponse de la recette créé.
    return res.json({
      message: "La recette a bien été créée .",
      data: recette,
    });
  } catch (err) {
    next(err);
  }
};

/* Ajout d'un Ingrédient dans une Recette */
exports.addRecetteIngredient = async (req, res, next) => {
  try {
    const { recette_id, ingredient_id, count } = req.body;
    // Validation des données reçues
    if (!recette_id || !ingredient_id || !count) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let recette = await Recette.findOne({ where: { id: recette_id } });
    // Vérification de l'existance de la recette
    if (recette === null) {
      throw new RecetteError("Cette recette n'existe pas .", 0);
    }
    let ingredient = await Ingredient.findOne({ where: { id: ingredient_id } });
    // Vérification de l'existance de l'ingredient
    if (ingredient === null) {
      throw new IngredientError("Cette recette n'existe pas .", 0);
    }
    // Ajout de l'ingredient dans la recette
    let recetteIngredient = await recette.addIngredient(ingredient, {
      through: { count: count },
    });
    // Réponse du menu créé.
    return res.json({
      message: "L'ingrédient a bien été ajoutée à la recette .",
      data: recetteIngredient,
    });
  } catch (err) {
    next(err);
  }
};

/* Modification d'une Recette */
exports.updateRecette = async (req, res, next) => {
  try {
    let recetteID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!recetteID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche de la recette
    let recette = await Recette.findOne({
      where: { id: recetteID },
      raw: true,
    });

    // Vérification de l'existance de la recette
    if (recette === null) {
      throw new RecetteError("Cette recette n'existe pas .", 0);
    }

    // Mise à jour de la recette
    await Recette.update(req.body, { where: { id: recetteID } });

    // Réponse de la mise à jour
    return res.json({
      message: "La recette à bien été modifiée .",
      data: recette,
    });
  } catch (err) {
    next(err);
  }
};

/* Annulation de suppression d'une Recette (Soft Delete) */
exports.untrashRecette = async (req, res, next) => {
  try {
    let recetteID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!recetteID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration de la recette
    await Recette.restore({ where: { id: recetteID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'une Recette (Soft Delete) */
exports.trashRecette = async (req, res, next) => {
  try {
    let recetteID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!recetteID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de la recette (soft delete without force: true)
    await Recette.destroy({ where: { id: recetteID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'une Recette (Hard Delete) */
exports.deleteRecette = async (req, res, next) => {
  try {
    let recetteID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!recetteID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de la recette (hard delete with force: true)
    await Recette.destroy({ where: { id: recetteID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
