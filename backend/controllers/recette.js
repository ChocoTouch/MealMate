/* Import des modules nécessaires */
const DB = require("../db.config");
const Recette = DB.Recette;
const User = DB.User;
const Menu = DB.Menu;
const { RequestError, RecetteError, UserError } = require("../error/customError");

/* Routage de la ressource Recette (Ensemble des Recettes) */
exports.getAllRecettes = (req, res, next) => {
  Recette.findAll()
    .then((recettes) => res.json({ data: recettes }))
    .catch((err) => next());
};

/* GET ID (Recette spécifique)*/
exports.getRecette = async (req, res, next) => {
  let recetteID = parseInt(req.params.id);
  // Verifie si le champ id est présent + cohérent
  if (!recetteID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération de la recette
    let recette = await Recette.findOne({
      where: { id: recetteID },
      include: {model: User, attributes:['id','pseudo','email']}
    });
    // Test de l'existance de la recette
    if (recette === null) {
      throw new RecetteError("Cette recette n'existe pas .", 0);
    }
    // Recette trouvée
    return res.json({ data: recette });
  } catch (err) {
    next(err);
  }
};

/* PUT */
exports.addRecette = async (req, res, next) => {
  try {
    const {
      nom,
      user_id,
      description,
      instructions,
      pays,
      vegetarien,
      vegetalien,
      sansgluten,
    } = req.body;
    // Validation des données reçues
    if (
      !nom ||
      !user_id ||
      !description ||
      !instructions ||
      !pays ||
      !vegetarien ||
      !vegetalien ||
      !sansgluten
    ) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { id: user_id } }); 
    // Test de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }
    // Création de la recette
    let recette = await Recette.create(req.body,{include: [
      {
        model: User,
      }
    ]});

    // Réponse de la recette créé.
    return res.json({
      message: "La recette a bien été créée .",
      data: recette,
    });
  } catch (err) {
    next(err);
  }
};

/* PATCH ID & BODY*/
exports.updateRecette = async (req, res, next) => {
  try {
    let recetteID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!recetteID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche de la recette
    let recette = await Recette.findOne({
      where: { id: recetteID },
      raw: true,
    });

    // Vérification de l'existance de la recette
    if (recette === null) {
      throw new RecetteError("Cette recette n'existe pas .", 0);
    }

    // Mise à jour de la recette
    await Recette.update(req.body, { where: { id: recetteID } });

    // Réponse de la mise à jour
    return res.json({
      message: "La recette à bien été modifiée .",
      data: recette,
    });
  } catch (err) {
    next(err);
  }
};

/* POST UNTRASH */
exports.untrashRecette = async (req, res, next) => {
  try {
    let recetteID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!recetteID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration de la recette
    await Recette.restore({ where: { id: recetteID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* SOFT DELETE TRASH */
exports.trashRecette = async (req, res, next) => {
  try {
    let recetteID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!recetteID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de la recette (soft delete without force: true)
    await Recette.destroy({ where: { id: recetteID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* HARD DELETE ID*/
exports.deleteRecette = async (req, res, next) => {
  try {
    let recetteID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!recetteID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de la recette (hard delete with force: true)
    await Recette.destroy({ where: { id: recetteID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
