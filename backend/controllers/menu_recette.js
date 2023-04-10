/* Import des modules nécessaires */
const DB = require("../db.config");
const Menu = DB.Menu;
const Recette = DB.Recette;
const User = DB.User;
const { RequestError, RecetteError } = require("../error/customError");
const user = require("../models/user");


/* Ensemble des Menus pour une Recette */
exports.getAllMenusForRecette = async (req, res, next) => {
    let recetteID = parseInt(req.params.id);
    // Verifie si le champ id est présent + cohérent
    if (!recetteID) {
        throw new RequestError("Paramètre(s) manquant(s) .");
    }
    try {
        // Récupération de
        let recette = await Recette.findOne({ where: { id: recetteID }, include: Menu });
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

// PUT /menus/recettes
exports.addMenuRecette = async (req, res, next) => {
  try {
    const { recette_id, menu_id } = req.body;
    // Validation des données reçues
    if ( !recette_id || !menu_id ) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let menu = await Menu.findOne({ where: { id: menu_id }})
    let recette = await Recette.findOne({ where: { id: recette_id }})
    // Ajout de la recette dans le menu
    let menuRecette = await menu.addRecette(recette)
    // Réponse du menu créé.
    return res.json({ message: "Le menu a bien été créée .", data: menuRecette });
  } catch (err) {
    next(err);
  }
};