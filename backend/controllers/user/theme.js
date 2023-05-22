/* Import des modules nécessaires */
const DB = require("../../db.config");
const slugify = require("slugify");
const Theme = DB.Theme;
const Recipe = DB.Recipe;
const User = DB.User;
const { RequestError, ThemeError } = require("../../error/customError");

/* Récupération de l'ensemble des Themes */
exports.getAllThemes = (req, res, next) => {
  Theme.findAll({ attributes: ["id", "name", "description"] })
    .then((themes) => res.json({ data: themes }))
    .catch((err) => next());
};

/* Récupération d'un Theme */
exports.getTheme = async (req, res, next) => {
  try {
    let themeID = req.params.id;
    // Verifie si le champ name est présent + cohérent
    if (!themeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Récupération du Theme
    let theme = await Theme.findOne({
      where: { id: themeID },
      raw: true,
      attributes: ["id", "name", "description"]
    });
    // Test de l'existance du Theme
    if (theme === null) {
      throw new ThemeError("Ce Theme n'existe pas .", 0);
    }
    // Theme trouvé
    return res.json({ data: theme });
  } catch (err) {
    next(err);
  }
};

/* Récupération des Recettes d'un Theme */
exports.getRecipesForTheme = async (req, res, next) => {
  try {
    let themeID = parseInt(req.params.id);
    // Verifie si le champ id est présent + cohérent
    if (!themeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Récupération du Theme
    let theme = await Theme.findOne({
      where: { id: themeID },
    });
    // Test de l'existance du Theme
    if (theme === null) {
      throw new ThemeError("Ce Theme n'existe pas .", 0);
    }
    let recipes = await Recipe.findAll({
      where: { theme_id: themeID },
      attributes: ["id", "name", "description","instructions","difficulty","user_username"]
    });
    // Recettes et Theme trouvé
    return res.json({ data: recipes });
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
    // Recherche de l'utilisateur
    let user = await User.findOne({ where: { id: req.decodedToken.id } });
    req.body.user_id = user.id;
    req.body.user_username = user.username;
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
    // Recherche de l'utilisateur
    let user = await User.findOne({ where: { id: req.decodedToken.id } });
    req.body.user_id = user.id;
    req.body.user_username = user.username;
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