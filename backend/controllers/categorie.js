/* Import des modules nécessaires */
const DB = require("../db.config");
const Categorie = DB.Categorie;
const { RequestError, CategorieError } = require("../error/customError");

/* Routage de la ressource Categorie (Ensemble des Categories) */
exports.getAllCategories = (req, res, next) => {
  Categorie.findAll()
    .then((categories) => res.json({ data: categories }))
    .catch((err) => next());
};

/* GET ID (Categorie spécifique)*/
exports.getCategorie = async (req, res, next) => {
  let categorieID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!categorieID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération de la categorie
    let categorie = await Categorie.findOne({
      where: { id: categorieID },
      raw: true,
    });
    // Test de l'existance de la categorie
    if (categorie === null) {
      throw new CategorieError("Cette categorie n'existe pas .", 0);
    }
    // Categorie trouvée
    return res.json({ data: categorie });
  } catch (err) {
    next(err);
  }
};

/* PUT */
exports.addCategorie = async (req, res, next) => {
  try {
    const { nom } = req.body;
    // Validation des données reçues
    if (!nom) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Création de la categorie
    let categorie = await Categorie.create(req.body);

    // Réponse de la categorie créé.
    return res.json({
      message: "La categorie a bien été créée .",
      data: categorie,
    });
  } catch (err) {
    next(err);
  }
};

/* PATCH ID & BODY*/
exports.updateCategorie = async (req, res, next) => {
  try {
    let categorieID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!categorieID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche de la categorie
    let categorie = await Categorie.findOne({
      where: { id: categorieID },
      raw: true,
    });

    // Vérification de l'existance de la categorie
    if (categorie === null) {
      throw new CategorieError("Cette categorie n'existe pas .", 0);
    }

    // Mise à jour de la categorie
    await Categorie.update(req.body, { where: { id: categorieID } });

    // Réponse de la mise à jour
    return res.json({
      message: "La categorie à bien été modifiée .",
      data: categorie,
    });
  } catch (err) {
    next(err);
  }
};

/* POST UNTRASH */
exports.untrashCategorie = async (req, res, next) => {
  try {
    let categorieID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!categorieID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration de la categorie
    await Categorie.restore({ where: { id: categorieID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* SOFT DELETE TRASH */
exports.trashCategorie = async (req, res, next) => {
  try {
    let categorieID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!categorieID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de la categorie (soft delete without force: true)
    await Categorie.destroy({ where: { id: categorieID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* HARD DELETE ID*/
exports.deleteCategorie = async (req, res, next) => {
  try {
    let categorieID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!categorieID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de la categorie (hard delete with force: true)
    await Categorie.destroy({ where: { id: categorieID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
