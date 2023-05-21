/***** DONE ******/
/* Import des modules nécessaires */
const DB = require("../db.config");
const slugify = require("slugify");
const DayOfWeek = DB.DayOfWeek;
const { RequestError, DayOfWeekError } = require("../error/customError");

/* Récupération de l'ensemble des Jours */
exports.getAllDayOfWeeks = (req, res, next) => {
  DayOfWeek.findAll()
    .then((dayOfWeeks) => res.json({ data: dayOfWeeks }))
    .catch((err) => next());
};

/* Récupération d'un Jour */
exports.getDayOfWeek = async (req, res, next) => {
  let dayOfWeekID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!dayOfWeekID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération du Jour
    let dayOfWeek = await DayOfWeek.findOne({
      where: { id: dayOfWeekID },
      raw: true,
    });
    // Test de l'existance du Jour
    if (dayOfWeek === null) {
      throw new DayOfWeekError("Ce jour n'existe pas .", 0);
    }
    // Jour trouvé
    return res.json({ data: dayOfWeek });
  } catch (err) {
    next(err);
  }
};

/* Création d'un Jour */
exports.addDayOfWeek = async (req, res, next) => {
  try {
    const { name } = req.body;
    // Validation des données reçues
    if (!name ) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    req.body.slug = slugify(name);
    
    // Création du Jour
    let dayOfWeek = await DayOfWeek.create(req.body);

    // Réponse du Jour créé.
    return res.json({
      message: "Le jour a bien été créé .",
      data: dayOfWeek,
    });
  } catch (err) {
    next(err);
  }
};

/* Modification d'un Jour */
exports.updateDayOfWeek = async (req, res, next) => {
  try {
    const { name } = req.body;
    let dayOfWeekID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!dayOfWeekID || !name) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche du Jour
    let dayOfWeek = await DayOfWeek.findOne({
      where: { id: dayOfWeekID },
      raw: true,
    });

    // Vérification de l'existance du Jour
    if (dayOfWeek === null) {
      throw new DayOfWeekError("Ce jour n'existe pas .", 0);
    }

    req.body.slug = slugify(name);
    
    // Mise à jour du Jour
    await DayOfWeek.update(req.body, { where: { id: dayOfWeekID } });

    // Réponse de la mise à jour
    return res.json({
      message: "Le jour à bien été modifié .",
      data: dayOfWeek,
    });
  } catch (err) {
    next(err);
  }
};

/* Annulation de suppression d'un Jour (Soft Delete) */
exports.untrashDayOfWeek = async (req, res, next) => {
  try {
    let dayOfWeekID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!dayOfWeekID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration du Jour
    await DayOfWeek.restore({ where: { id: dayOfWeekID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Jour (Soft Delete) */
exports.trashDayOfWeek = async (req, res, next) => {
  try {
    let dayOfWeekID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!dayOfWeekID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du Jour (soft delete without force: true)
    await DayOfWeek.destroy({ where: { id: dayOfWeekID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Jour (Hard Delete) */
exports.deleteDayOfWeek = async (req, res, next) => {
  try {
    let dayOfWeekID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!dayOfWeekID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du Régime (hard delete with force: true)
    await DayOfWeek.destroy({ where: { id: dayOfWeekID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
