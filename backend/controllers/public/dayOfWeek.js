/* Import des modules nécessaires */
const DB = require("../../db.config");
const DayOfWeek = DB.DayOfWeek;
const { RequestError, DayOfWeekError } = require("../../error/customError");

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