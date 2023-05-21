/* Import des modules nécessaires */
const DB = require("../../db.config");
const Theme = DB.Theme;
const Recipe = DB.Recipe;
const { RequestError, ThemeError } = require("../../error/customError");

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
exports.getRecipesInTheme = async (req, res, next) => {
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