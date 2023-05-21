/* Import des modules nécessaires */
const DB = require("../../db.config");
const Course = DB.Course;
const { RequestError, CourseError } = require("../../error/customError");

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
