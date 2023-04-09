/* Import des modules nécessaires */
const DB = require("../db.config");
const Menu = DB.Menu;
const { RequestError, RecetteError } = require("../error/customError");

/* Routage de la ressource Menu (Ensemble des Menus) */
exports.getAllMenus = (req, res, next) => {
  Menu.findAll()
    .then((menus) => res.json({ data: menus }))
    .catch((err) => next());
};

/* GET ID (Menu spécifique)*/
exports.getMenu = async (req, res, next) => {
  let menuID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!menuID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération du menu
    let menu = await Menu.findOne({ where: { id: menuID }, raw: true });
    // Test de l'existance du menu
    if (menu === null) {
      throw new RecetteError("Ce menu n'existe pas .", 0);
    }
    // Menu trouvé
    return res.json({ data: menu });
  } catch (err) {
    next(err);
  }
};

/* PUT */
exports.addMenu = async (req, res, next) => {
  try {
    const { nom, user_id } = req.body;
    // Validation des données reçues
    if (!nom || !user_id) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Création du menu
    let menu = await Menu.create(req.body);

    // Réponse du menu créé.
    return res.json({ message: "Le menu a bien été créée .", data: menu });
  } catch (err) {
    next(err);
  }
};

/* PATCH ID & BODY*/
exports.updateMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche du menu
    let menu = await Menu.findOne({ where: { id: menuID }, raw: true });

    // Vérification de l'existance du menu
    if (menu === null) {
      throw new RecetteError("Ce menu n'existe pas .", 0);
    }

    // Mise à jour du menu
    await Menu.update(req.body, { where: { id: menuID } });

    // Réponse de la mise à jour
    return res.json({ message: "Le menu à bien été modifiée .", data: menu });
  } catch (err) {
    next(err);
  }
};

/* POST UNTRASH */
exports.untrashMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration du menu
    await Menu.restore({ where: { id: menuID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* SOFT DELETE TRASH */
exports.trashMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du menu (soft delete without force: true)
    await Menu.destroy({ where: { id: menuID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* HARD DELETE ID*/
exports.deleteMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du menu (hard delete with force: true)
    await Menu.destroy({ where: { id: menuID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
