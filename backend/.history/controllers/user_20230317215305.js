/* Import des modules nécessaires */
const DB = require('../db.config')
const User = DB.User
const { RequestError, UserError } = require("../error/customError");

/* Routage de la ressource User (Ensemble des Users) */
exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => res.json({ data: users }))
    .catch((err) => next());
};

/* GET ID (User spécifique)*/
exports.getUser = async (req, res, next) => {
  let userID = parseInt(req.params.id);

  // Verifie si le champ id est présent + cohérent
  if (!userID) {
    throw new RequestError("Missing Parameter");
  }

  try {
    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { id: userID }, raw: true });
    // Test de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError("This user does not exist .", 0);
    }
    // Utilisateur trouvé
    return res.json({ data: user });
  } catch (err) {
    next(err);
  }
};

/* PUT */
exports.addUser = async (req, res, next) => {
  try {
    const { nom, prenom, pseudo, email, motdepasse } = req.body;

    // Validation des données reçues
    if (!nom || !prenom || !pseudo || !email || !motdepasse) {
      throw new RequestError("Paramètres manquants .");
    }

    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { email: email }, raw: true });

    // Test de l'existance de l'utilisateur
    if (user !== null) {
      throw new RequestError(`L'utilisateur ${nom} existe déjà .`, 1);
    }

    // Hashage du mot de passe
    // let hash = await bcrypt.hash(Password, parseInt(process.env.BCRYPT_SALT_ROUND))
    // req.body.Password = hash;

    // Création de l'utilisateur
    let userc = await User.create(req.body);

    // Réponse de l'utilisateur créé.
    return res.json({ message: "L'utilisateur à bien été crée .", data: userc });
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
      throw new RequestError("Paramètres manquants .");
    }

    // Recherche de l'utilisateur
    let user = await User.findOne({ where: { id: userID }, raw: true });

    // Vérification de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }

    // Mise à jour de l'user
    await User.update(req.body, { where: { id: userID } });

    // Réponse de la mise à jour
    return res.json({ message: "L'utilisateur à bien été modifié .", data: user });
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
      throw new RequestError("Paramètres manquants .");
    }

    // Restauration de l'utilisateur
    await User.restore({ where: { id: userID } });

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
      throw new RequestError("Paramètres manquants .");
    }

    // Suppression de l'utilisateur (soft delete without force: true)
    await User.destroy({ where: { id: userID } });

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
      throw new RequestError("Paramètres manquants .");
    }

    // Suppression de l'utilisateur (hard delete with force: true)
    await User.destroy({ where: { id: userID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
