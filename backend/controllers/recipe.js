/* Import des modules nécessaires */
const DB = require("../db.config");
const slugify = require("slugify");
const Recipe = DB.Recipe;
const User = DB.User;
const Menu = DB.Menu;
const Ingredient = DB.Ingredient;
const Diet = DB.Diet;
const Theme = DB.Theme;
const Comment = DB.Comment;
const {
  RequestError,
  RecipeError,
  IngredientError,
  UserError,
  DietError,
} = require("../error/customError");

/* Récupération de l'ensemble des Recettes */
exports.getAllRecipes = (req, res, next) => {
  Recipe.findAll()
    .then((recipes) => res.json({ data: recipes }))
    .catch((err) => next());
};

/* Récupération de l'ensemble des Recettes de l'utilisateur connecté */
exports.getMyRecipes = async (req, res, next) => {
  try {
    let recipes = await Recipe.findAll({
      where: {
        user_id: req.decodedToken.id,
      },
      include: [
        { model: Ingredient, attributes: ["id", "name", "calories", "price"] },
        { model: Comment },
        { model: Theme },
      ],
    });
    if (recipes === null) {
      throw new RecipeError("Aucune recette trouvée", 0);
    }
    return res.json({ data: recipes });
  } catch (err) {
    next(err);
  }
};

/* Récupération d'une Recette */
exports.getRecipe = async (req, res, next) => {
  let recipeID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!recipeID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération de la Recette
    let recipe = await Recipe.findOne({
      where: { id: recipeID },
      include: [
        { model: User, attributes: ["id", "username", "email"] },
        { model: Theme, attributes: ["id", "name", "description"] },
      ],
    });
    // Test de l'existance de la Recette
    if (recipe === null) {
      throw new RecipeError("Cette recette n'existe pas .", 0);
    }
    // Recette trouvée
    return res.json({ data: recipe });
  } catch (err) {
    next(err);
  }
};

/* Récupération des Menus d'une Recette */
exports.getMenusForRecipe = async (req, res, next) => {
  let recipeID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!recipeID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }
  try {
    // Récupération de
    let recipe = await Recipe.findOne({
      where: { id: recipeID },
      include: Menu,
    });
    // Test de l'existance de la Recette
    if (recipe === null) {
      throw new RecipeError("Cette Recette n'existe pas .", 0);
    }
    let menus = recipe.Menus;
    // Recipe et Menus trouvé
    return res.json({ data: menus });
  } catch (err) {
    next(err);
  }
};

/* Création d'une Recette */
exports.addRecipe = async (req, res, next) => {
  try {
    const { name, user_id, description, instructions, difficulty, theme_id } =
      req.body;
    // Validation des données reçues
    if (!name || !user_id || !description || !instructions || !difficulty) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Vérification du thème
    if (!theme_id) {
      req.body.theme_id = 2;
    } else {
      let theme = await Theme.findOne({ where: { id: theme_id } });
      if (!theme) {
        throw new RequestError("Ce thème n'existe pas .", 0);
      }
    }
    // Vérification de la difficulté
    if (difficulty < 1 || difficulty > 5) {
      throw new RequestError("La difficulté est incohérente .", 0);
    }
    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { id: user_id } });
    // Test de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }
    req.body.slug = slugify(name);
    // Création de la Recette
    let recipe = await Recipe.create(req.body);

    // Réponse de la Recette créé.
    return res.json({
      message: "La recette a bien été créée .",
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};

/* Modification d'une Recette */
exports.updateRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);
    const { name, user_id, theme_id, difficulty } = req.body;
    // Vérification si le champ id existe et cohérent
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Vérification du thème
    if (!theme_id) {
      req.body.theme_id = 2;
    } else {
      let theme = await Theme.findOne({ where: { id: theme_id } });
      if (!theme) {
        throw new RequestError("Ce thème n'existe pas .", 0);
      }
    }
    // Vérification de la difficulté
    if (difficulty < 1 || difficulty > 5) {
      throw new RequestError("La difficulté est incohérente .", 0);
    }
    // Recherche de la Recipe
    let recipe = await Recipe.findOne({
      where: { id: recipeID },
      raw: true,
    });

    // Vérification de l'existance de la Recipe
    if (recipe === null) {
      throw new RecipeError("Cette Recipe n'existe pas .", 0);
    }
    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { id: user_id } });
    // Test de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }
    req.body.slug = slugify(name);
    // Mise à jour de la Recipe
    await Recipe.update(req.body, { where: { id: recipeID } });

    // Réponse de la mise à jour
    return res.json({
      message: "La Recipe à bien été modifiée .",
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};

/* Annulation de suppression d'une Recipe (Soft Delete) */
exports.untrashRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration de la Recipe
    await Recipe.restore({ where: { id: recipeID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'une Recipe (Soft Delete) */
exports.trashRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de la Recipe (soft delete without force: true)
    await Recipe.destroy({ where: { id: recipeID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'une Recipe (Hard Delete) */
exports.deleteRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de la Recipe (hard delete with force: true)
    await Recipe.destroy({ where: { id: recipeID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Ajout d'un Ingrédient dans une Recette */
exports.addIngredientInMyRecipe = async (req, res, next) => {
  try {
    let ingredientID = parseInt(req.params.id);
    const { recipe_id, count } = req.body;
    // Validation des données reçues
    if (!recipe_id || !ingredientID || !count) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // user_id: decodedToken.id
    let recipe = await Recipe.findOne({
      where: { id: recipe_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance de la Recette
    if (recipe === null) {
      throw new RecipeError(
        "Cette recette n'existe pas ou ne vous appartient pas .",
        0
      );
    }
    let ingredient = await Ingredient.findOne({ where: { id: ingredientID } });
    // Vérification de l'existance de l'ingredient
    if (ingredient === null) {
      throw new IngredientError("Cet ingredient n'existe pas .", 0);
    }
    // Ajout de l'ingredient dans la Recette
    let recipeIngredient = await recipe.addIngredient(ingredient, {
      through: { count: count },
    });
    // Réponse du menu créé.
    return res.json({
      message: "L'ingrédient a bien été ajoutée à votre recette .",
      data: recipeIngredient,
    });
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Ingredient dans une Recette */
exports.deleteIngredientInMyRecipe = async (req, res, next) => {
  try {
    let ingredientID = parseInt(req.params.id);
    const { recipe_id } = req.body;
    // Validation des données reçues
    if (!recipe_id || !ingredientID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let recipe = await Recipe.findOne({
      where: { id: recipe_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance de la Recette
    if (recipe === null) {
      throw new RecipeError(
        "Cette recette n'existe pas ou ne vous appartient pas.",
        0
      );
    }
    let ingredient = await Ingredient.findOne({ where: { id: ingredientID } });
    // Vérification de l'existance de l'ingrédient
    if (ingredient === null) {
      throw new IngredientError("Cet Ingredient n'existe pas .", 0);
    }
    // Suppression de l'ingredient dans la recette
    await recipe.removeIngredient(ingredient);
    // Réponse de l'ingredient supprimé.
    return res.status(204).json({
      message: "L'ingredient a bien été supprimé de votre recette .",
    });
  } catch (err) {
    next(err);
  }
};

/* Ajout d'un Régime dans une Recette */
exports.addDietInMyRecipe = async (req, res, next) => {
  try {
    let dietID = parseInt(req.params.id);
    const { recipe_id } = req.body;
    // Validation des données reçues
    if (!recipe_id || !dietID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // , user_id: decodedToken.id
    let recipe = await Recipe.findOne({
      where: { id: recipe_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance de la Recette
    if (recipe === null) {
      throw new RecipeError(
        "Cette recette n'existe pas ou ne vous appartient pas .",
        0
      );
    }
    let diet = await Diet.findOne({ where: { id: dietID } });
    // Vérification de l'existance du Régime
    if (diet === null) {
      throw new DietError("Ce régime n'existe pas .", 0);
    }
    // Ajout du Régime dans la Recette
    let recipeDiet = await recipe.addDiet(diet);
    // Réponse du menu créé.
    return res.json({
      message: "Le régime a bien été ajoutée à votre recette .",
      data: recipeDiet,
    });
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Régime dans une Recette */
exports.deleteDietInMyRecipe = async (req, res, next) => {
  try {
    let dietID = parseInt(req.params.id);
    const { recipe_id } = req.body;
    // Validation des données reçues
    if (!recipe_id || !dietID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let recipe = await Recipe.findOne({
      where: { id: recipe_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance de la Recette
    if (recipe === null) {
      throw new RecipeError(
        "Cette recette n'existe pas ou ne vous appartient pas.",
        0
      );
    }
    let diet = await Diet.findOne({ where: { id: dietID } });
    // Vérification de l'existance du régime
    if (diet === null) {
      throw new DietError("Ce régime n'existe pas .", 0);
    }
    // Suppression du régime dans la recette
    await recipe.removeDiet(diet);
    // Réponse du régime supprimé.
    return res.status(204).json({
      message: "Le régime a bien été supprimé de votre recette .",
    });
  } catch (err) {
    next(err);
  }
};

/* Création d'une Recette User*/
exports.createMyRecipe = async (req, res, next) => {
  try {
    const { name, description, instructions, difficulty, theme_id } = req.body;
    // Validation des données reçues
    if (!name || !description || !instructions || !difficulty) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Vérification du thème
    if (!theme_id) {
      req.body.theme_id = 2;
    } else {
      let theme = await Theme.findOne({ where: { id: theme_id } });
      if (!theme) {
        throw new RequestError("Ce thème n'existe pas .", 0);
      }
    }
    // Vérification de la difficulté
    if (difficulty < 1 || difficulty > 5) {
      throw new RequestError("La difficulté est incohérente .", 0);
    }
    req.body.user_id = req.decodedToken.id;

    req.body.slug = slugify(name);
    // Création de la Recette
    let recipe = await Recipe.create(req.body);

    // Réponse de la Recette créé.
    return res.json({
      message: "La recette a bien été créée .",
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};

/* Modification d'une Recette */
exports.updateMyRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);
    const { name, theme_id, difficulty } = req.body;
    // Vérification si le champ id existe et cohérent
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Vérification du thème
    if (!theme_id) {
      req.body.theme_id = 2;
    } else {
      let theme = await Theme.findOne({ where: { id: theme_id } });
      if (!theme) {
        throw new RequestError("Ce thème n'existe pas .", 0);
      }
    }
    // Vérification de la difficulté
    if (difficulty < 1 || difficulty > 5) {
      throw new RequestError("La difficulté est incohérente .", 0);
    }
    // Recherche de la Recipe
    let recipe = await Recipe.findOne({
      where: { id: recipeID, user_id: req.decodedToken.id },
      raw: true,
    });

    // Vérification de l'existance de la Recipe
    if (recipe === null) {
      throw new RecipeError(
        "Cette Recipe n'existe pas ou ne vous appartient pas.",
        0
      );
    }
    req.body.slug = slugify(name);
    // Mise à jour de la Recipe
    await Recipe.update(req.body, {
      where: { id: recipeID },
    });

    // Réponse de la mise à jour
    return res.json({
      message: "La Recipe à bien été modifiée .",
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};

/* Suppression d'une Recipe User (Soft Delete) */
exports.deleteMyRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche de la Recipe
    let recipe = await Recipe.findOne({
      where: { id: recipeID, user_id: req.decodedToken.id },
      raw: true,
    });

    // Vérification de l'existance de la Recipe
    if (recipe === null) {
      throw new RecipeError(
        "Cette Recipe n'existe pas ou ne vous appartient pas.",
        0
      );
    }

    // Suppression de la Recipe (soft delete without force: true)
    await Recipe.destroy({
      where: { id: recipeID, user_id: req.decodedToken.id },
    });

    // Réponse du delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
