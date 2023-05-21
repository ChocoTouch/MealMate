/* Import des modules nécessaires */
const DB = require("../db.config");
const Comment = DB.Comment;
const { RequestError, RecetteError } = require("../error/customError");

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

/* PUT */
exports.addCommentInMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);
    const { texte } = req.body;
    // Validation des données reçues
    if (!texte || !menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Création du Commentaire
    let comment = await Comment.create(
      req.body,
      (user_id = decodedToken.id),
      (recipe_id = null)
    ); // TEST

    // Réponse du Commentaire créé.
    return res.json({
      message: "Le commentaire a bien été créé .",
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

/* PUT */
exports.addCommentInRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);
    const { texte } = req.body;
    // Validation des données reçues
    if (!texte || !recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Création du Commentaire
    let comment = await Comment.create(
      req.body,
      (user_id = decodedToken.id),
      (menu_id = null)
    ); // TEST

    // Réponse du Commentaire créé.
    return res.json({
      message: "Le commentaire a bien été créé .",
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

/* PATCH ID & BODY*/
exports.updateComment = async (req, res, next) => {
  try {
    let commentID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!commentID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche du Commentaire
    let comment = await Comment.findOne({
      where: { id: commentID },
      raw: true,
    });

    // Vérification de l'existance du Commentaire
    if (comment === null) {
      throw new RecetteError("Ce comment n'existe pas .", 0);
    }

    // Mise à jour du Commentaire
    await Comment.update(req.body, { where: { id: commentID } });

    // Réponse de la mise à jour
    return res.json({
      message: "Le comment à bien été modifiée .",
      data: comment,
    });
  } catch (err) {
    next(err);
  }
};

/* POST UNTRASH */
exports.untrashComment = async (req, res, next) => {
  try {
    let commentID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!commentID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration du Commentaire
    await Comment.restore({ where: { id: commentID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* SOFT DELETE TRASH */
exports.trashComment = async (req, res, next) => {
  try {
    let commentID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!commentID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du comment (soft delete without force: true)
    await Comment.destroy({ where: { id: commentID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* HARD DELETE ID*/
exports.deleteComment = async (req, res, next) => {
  try {
    let commentID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!commentID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du comment (hard delete with force: true)
    await Comment.destroy({ where: { id: commentID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
