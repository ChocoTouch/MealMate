/* Import des modules nécessaires */
const DB = require("../../db.config");
const Comment = DB.Comment;
const { RequestError, RecetteError } = require("../../error/customError");

/* Routage de la ressource Comment (Ensemble des Commentaires) */
exports.getAllComments = (req, res, next) => {
  Comment.findAll()
    .then((comments) => res.json({ data: comments }))
    .catch((err) => next());
};

/* GET ID (Commentaire spécifique)*/
exports.getComment = async (req, res, next) => {
  let commentID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!commentID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération du Commentaire
    let comment = await Comment.findOne({
      where: { id: commentID },
      raw: true,
    });
    // Test de l'existance du Commentaire
    if (comment === null) {
      throw new RecetteError("Ce Commentaire n'existe pas .", 0);
    }
    // Commentaire trouvée
    return res.json({ data: comment });
  } catch (err) {
    next(err);
  }
};
