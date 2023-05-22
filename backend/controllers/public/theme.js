/* Import des modules nécessaires */
const DB = require("../../db.config");
const Theme = DB.Theme;
const Recipe = DB.Recipe;
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
