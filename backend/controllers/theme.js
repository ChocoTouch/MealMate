/***** DONE ******/
/* Import des modules nécessaires */
const DB = require("../db.config");
const Theme = DB.Theme;
const Recipe = DB.Recipe;
const { RequestError, ThemeError } = require("../error/customError");

/* Récupération de l'ensemble des Themes */
exports.getAllThemes = (req, res, next) => {
    Theme.findAll()
    .then((themes) => res.json({ data: themes }))
    .catch((err) => next());
};

/* Récupération d'un Theme */
exports.getTheme = async (req, res, next) => {
  let themeID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!themeID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération du Theme
    let theme = await Theme.findOne({
      where: { id: themeID },
      raw: true,
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
  let themeID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!themeID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }
  try {
    // Récupération du Theme
    let theme = await Theme.findOne({
      where: { id: themeID },
      include: Recipe,
    });
    // Test de l'existance du Theme
    if (theme === null) {
      throw new ThemeError("Ce Theme n'existe pas .", 0);
    }
    let recipes = theme.Recipes;
    // Recettes et Theme trouvé
    return res.json({ data: recipes });
  } catch (err) {
    next(err);
  }
};

/* Création d'un Theme */
exports.addTheme = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    // Validation des données reçues
    if (!name || !description ) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Création du Theme
    let theme = await Theme.create(req.body);

    // Réponse du Theme créé.
    return res.json({
      message: "Le Theme a bien été créé .",
      data: theme,
    });
  } catch (err) {
    next(err);
  }
};

/* Modification d'un Theme */
exports.updateTheme = async (req, res, next) => {
  try {
    let themeID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!themeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche du Theme
    let theme = await Theme.findOne({
      where: { id: themeID },
      raw: true,
    });

    // Vérification de l'existance du Theme
    if (theme === null) {
      throw new ThemeError("Ce Theme n'existe pas .", 0);
    }

    // Mise à jour du Theme
    await Theme.update(req.body, { where: { id: themeID } });

    // Réponse de la mise à jour
    return res.json({
      message: "Le Theme à bien été modifiée .",
      data: theme,
    });
  } catch (err) {
    next(err);
  }
};

/* Annulation de suppression d'un Theme (Soft Delete) */
exports.untrashTheme = async (req, res, next) => {
  try {
    let themeID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!themeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration du Theme
    await Theme.restore({ where: { id: themeID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Theme (Soft Delete) */
exports.trashTheme = async (req, res, next) => {
  try {
    let themeID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!themeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du Theme (soft delete without force: true)
    await Theme.destroy({ where: { id: themeID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Theme (Hard Delete) */
exports.deleteTheme = async (req, res, next) => {
  try {
    let themeID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!themeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du Theme (hard delete with force: true)
    await Theme.destroy({ where: { id: themeID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
