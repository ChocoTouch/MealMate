/***** DONE ******/
/* Import des modules nécessaires */
const DB = require("../../db.config");
const slugify = require("slugify");
const Diet = DB.Diet;
const { RequestError, DietError } = require("../../error/customError");

/* Récupération de l'ensemble des Régimes */
exports.getAllDiets = (req, res, next) => {
  Diet.findAll()
    .then((diets) => res.json({ data: diets }))
    .catch((err) => next());
};

/* Récupération d'un Régime */
exports.getDiet = async (req, res, next) => {
  let dietID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!dietID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération du Régime
    let diet = await Diet.findOne({
      where: { id: dietID },
      raw: true,
    });
    // Test de l'existance du Régime
    if (diet === null) {
      throw new DietError("Ce régime n'existe pas .", 0);
    }
    // Régime trouvé
    return res.json({ data: diet });
  } catch (err) {
    next(err);
  }
};

/* Création d'un Régime */
exports.addDiet = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    // Validation des données reçues
    if (!name || !description) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    req.body.slug = slugify(name);

    // Création du Régime
    let diet = await Diet.create(req.body);

    // Réponse du Régime créé.
    return res.json({
      message: "Le régime a bien été créé .",
      data: diet,
    });
  } catch (err) {
    next(err);
  }
};

/* Modification d'un Régime */
exports.updateDiet = async (req, res, next) => {
  try {
    const { name } = req.body;
    let dietID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!dietID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche du Régime
    let diet = await Diet.findOne({
      where: { id: dietID },
      raw: true,
    });

    // Vérification de l'existance du Régime
    if (diet === null) {
      throw new DietError("Ce régime n'existe pas .", 0);
    }

    req.body.slug = slugify(name);

    // Mise à jour du Régime
    await Diet.update(req.body, { where: { id: dietID } });

    // Réponse de la mise à jour
    return res.json({
      message: "Le régime à bien été modifié .",
      data: diet,
    });
  } catch (err) {
    next(err);
  }
};

/* Annulation de suppression d'un Régime (Soft Delete) */
exports.untrashDiet = async (req, res, next) => {
  try {
    let dietID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!dietID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration du Régime
    await Diet.restore({ where: { id: dietID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Régime (Soft Delete) */
exports.trashDiet = async (req, res, next) => {
  try {
    let dietID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!dietID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du Régime (soft delete without force: true)
    await Diet.destroy({ where: { id: dietID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Régime (Hard Delete) */
exports.deleteDiet = async (req, res, next) => {
  try {
    let dietID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!dietID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du Régime (hard delete with force: true)
    await Diet.destroy({ where: { id: dietID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
