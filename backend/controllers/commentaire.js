/* Import des modules nécessaires */
const DB = require("../db.config");
const Commentaire = DB.Commentaire;
const { RequestError, RecetteError } = require("../error/customError");

/* Routage de la ressource Commentaire (Ensemble des Commentaires) */
exports.getAllCommentaires = (req, res, next) => {
  Commentaire.findAll()
    .then((commentaires) => res.json({ data: commentaires }))
    .catch((err) => next());
};

/* GET ID (Commentaire spécifique)*/
exports.getCommentaire = async (req, res, next) => {
  let commentaireID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!commentaireID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération du commentaire
    let commentaire = await Commentaire.findOne({
      where: { id: commentaireID },
      raw: true,
    });
    // Test de l'existance du commentaire
    if (commentaire === null) {
      throw new RecetteError("Ce commentaire n'existe pas .", 0);
    }
    // Commentaire trouvée
    return res.json({ data: commentaire });
  } catch (err) {
    next(err);
  }
};

/* PUT */
exports.addCommentaire = async (req, res, next) => {
  try {
    const { texte, user_id, recette_id, menu_id } = req.body;
    // Validation des données reçues
    if (!texte) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    if (!recette_id && !menu_id) {
      throw new RequestError(
        "Paramètre(s) manquant(s) 'recette_id' ou 'menu_id'."
      );
    }
    // Création du commentaire
    let commentaire = await Commentaire.create(req.body);

    // Réponse du commentaire créé.
    return res.json({
      message: "Le commentaire a bien été créé .",
      data: commentaire,
    });
  } catch (err) {
    next(err);
  }
};

/* PATCH ID & BODY*/
exports.updateCommentaire = async (req, res, next) => {
  try {
    let commentaireID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!commentaireID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche du commentaire
    let commentaire = await Commentaire.findOne({
      where: { id: commentaireID },
      raw: true,
    });

    // Vérification de l'existance du commentaire
    if (commentaire === null) {
      throw new RecetteError("Ce commentaire n'existe pas .", 0);
    }

    // Mise à jour du commentaire
    await Commentaire.update(req.body, { where: { id: commentaireID } });

    // Réponse de la mise à jour
    return res.json({
      message: "Le commentaire à bien été modifiée .",
      data: commentaire,
    });
  } catch (err) {
    next(err);
  }
};

/* POST UNTRASH */
exports.untrashCommentaire = async (req, res, next) => {
  try {
    let commentaireID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!commentaireID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration du commentaire
    await Commentaire.restore({ where: { id: commentaireID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* SOFT DELETE TRASH */
exports.trashCommentaire = async (req, res, next) => {
  try {
    let commentaireID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!commentaireID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du commentaire (soft delete without force: true)
    await Commentaire.destroy({ where: { id: commentaireID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* HARD DELETE ID*/
exports.deleteCommentaire = async (req, res, next) => {
  try {
    let commentaireID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!commentaireID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression du commentaire (hard delete with force: true)
    await Commentaire.destroy({ where: { id: commentaireID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
