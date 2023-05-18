/***** DONE ******/
/* Import des modules nécessaires */
const DB = require("../db.config");
const Course = DB.Course;
const { RequestError, CourseError } = require("../error/customError");

/* Récupération de l'ensemble des Plats */
exports.getAllCourses = (req, res, next) => {
  Course.findAll()
    .then((courses) => res.json({ data: courses }))
    .catch((err) => next());
};

/* Récupération d'un Plat */
exports.getCourse = async (req, res, next) => {
  let courseID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!courseID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération du Plat
    let course = await Course.findOne({
      where: { id: courseID },
      raw: true,
    });
    // Test de l'existance du Plat
    if (course === null) {
      throw new CourseError("Ce Plat n'existe pas .", 0);
    }
    // Plat trouvé
    return res.json({ data: course });
  } catch (err) {
    next(err);
  }
};

/* Création d'un Plat */
exports.addCourse = async (req, res, next) => {
  try {
    const { name } = req.body;
    // Validation des données reçues
    if (!name ) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Création du Plat
    let course = await Course.create(req.body);

    // Réponse du Plat créé.
    return res.json({
      message: "Le Plat a bien été créé .",
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

/* Modification d'un Plat */
exports.updateCourse = async (req, res, next) => {
  try {
    let courseID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!courseID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche du Plat
    let course = await Course.findOne({
      where: { id: courseID },
      raw: true,
    });

    // Vérification de l'existance du Plat
    if (course === null) {
      throw new CourseError("Ce Plat n'existe pas .", 0);
    }

    // Mise à Plat du Plat
    await Course.update(req.body, { where: { id: courseID } });

    // Réponse de la mise à Plat
    return res.json({
      message: "Le Plat à bien été modifié .",
      data: course,
    });
  } catch (err) {
    next(err);
  }
};

/* Annulation de suppression d'un Plat (Soft Delete) */
exports.untrashCourse = async (req, res, next) => {
  try {
    let courseID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!courseID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration du Plat
    await Course.restore({ where: { id: courseID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Plat (Soft Delete) */
exports.trashCourse = async (req, res, next) => {
  try {
    let courseID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!courseID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du Plat (soft delete without force: true)
    await Course.destroy({ where: { id: courseID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Plat (Hard Delete) */
exports.deleteCourse = async (req, res, next) => {
  try {
    let courseID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!courseID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du Régime (hard delete with force: true)
    await Course.destroy({ where: { id: courseID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
