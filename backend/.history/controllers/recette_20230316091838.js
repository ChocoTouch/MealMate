/* Import des modules nécessaires */
const DB = require('../db.config')
const Recette = DB.Recette
const { RequestError, UserError } = require("../error/customError");

/* Routage de la ressource Recette (Ensemble des Recettes) */
exports.getAllRecipes = (req, res, next) => {
  Recette.findAll()
    .then((recettes) => res.json({ data: recettes }))
    .catch((err) => next());
};

/* GET ID (Recette spécifique)*/
exports.getRecipe = async (req, res, next) => {
  let recetteID = parseInt(req.params.id);

  // Verifie si le champ id est présent + cohérent
  if (!recetteID) {
    throw new RequestError("Paramètre(s) manquant(s)");
  }

  try {
    // Récupération de la recette
    let recette = await Recette.findOne({ where: { RecetteID: recetteID }, raw: true });
    // Test de l'existance de la recette
    if (recette === null) {
      throw new UserError("Cette recette n'existe pas .", 0);
    }
    // Utilisateur trouvé
    return res.json({ data: recette });
  } catch (err) {
    next(err);
  }
};

/* PUT */
exports.addUser = async (req, res, next) => {
  try {
    const { Nom, Prenom, Username, Email, Password } = req.body;

    // Validation des données reçues
    if (!Nom || !Prenom || !Username || !Email || !Password) {
      throw new RequestError("Missing Parameter");
    }

    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { Email: Email }, raw: true });

    // Test de l'existance de l'utilisateur
    if (user !== null) {
      throw new RequestError(`The user ${Nom} already exists .`, 1);
    }

    // Hashage du mot de passe
    // let hash = await bcrypt.hash(Password, parseInt(process.env.BCRYPT_SALT_ROUND))
    // req.body.Password = hash;

    // Création de l'utilisateur
    let userc = await User.create(req.body);

    // Réponse de l'utilisateur créé.
    return res.json({ message: "User created successfully", data: userc });
  } catch (err) {
    next(err);
  }
};

/* PATCH ID & BODY*/
exports.updateUser = async (req, res, next) => {
  try {
    let userID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!userID) {
      throw new RequestError("Missing Parameter");
    }

    // Recherche de l'utilisateur
    let user = await User.findOne({ where: { UserID: userID }, raw: true });

    // Vérification de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError("This user does not exist .", 0);
    }

    // Mise à jour de l'user
    await User.update(req.body, { where: { UserID: userID } });

    // Réponse de la mise à jour
    return res.json({ message: "User Updated", data: user });
  } catch (err) {
    next(err);
  }
};

/* POST UNTRASH */
exports.untrashUser = async (req, res, next) => {
  try {
    let userID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!userID) {
      throw new RequestError("Missing Parameter");
    }

    // Restauration de l'utilisateur
    await User.restore({ where: { UserID: userID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* SOFT DELETE TRASH */
exports.trashUser = async (req, res, next) => {
  try {
    let userID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!userID) {
      throw new RequestError("Missing Parameter");
    }

    // Suppression de l'utilisateur (soft delete without force: true)
    await User.destroy({ where: { UserID: userID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* HARD DELETE ID*/
exports.deleteUser = async (req, res, next) => {
  try {
    let userID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!userID) {
      throw new RequestError("Missing Parameter");
    }

    // Suppression de l'utilisateur (hard delete with force: true)
    await User.destroy({ where: { UserID: userID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
