/***** DONE ******/
/* Import des modules nécessaires */
const DB = require("../db.config");
const slugify = require("slugify");
const User = DB.User;
const Recipe = DB.Recipe;
const Menu = DB.Menu;
const { RequestError, UserError } = require("../error/customError");

/* Récupération de l'ensemble des Utilisateurs */
exports.getAllUsers = (req, res, next) => {
  User.findAll()
    .then((users) => res.json({ data: users }))
    .catch((err) => next());
};

/* Récupération d'un Utilisateur */
exports.getUser = async (req, res, next) => {
  let userID = parseInt(req.params.id);

  // Verifie si le champ id est présent + cohérent
  if (!userID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { id: userID }, raw: true });
    // Test de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }
    // Utilisateur trouvé
    return res.json({ data: user });
  } catch (err) {
    next(err);
  }
};

/* Création d'un Utilisateur */
exports.addUser = async (req, res, next) => {
  try {
    const { name, firstname, username, email, password, roles } = req.body;

    // Validation des données reçues
    if (!name || !firstname || !username || !email || !password || !roles) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    req.body.slug = slugify(username);
    // Récupération de l'utilisateur
    let user = await User.findOne({ where: { email: email }, raw: true });

    // Test de l'existance de l'utilisateur
    if (user !== null) {
      throw new RequestError(`L'adresse email ${email} est déjà utilisée.`, 1);
    }

    // Hashage du mot de passe -- MOVED
    // let hash = await bcrypt.hash(Password, parseInt(process.env.BCRYPT_SALT_ROUND))
    // req.body.Password = hash;

    // Création de l'utilisateur
    let userc = await User.create(req.body);

    // Réponse de l'utilisateur créé.
    return res.json({
      message: "L'utilisateur à bien été crée .",
      data: userc,
    });
  } catch (err) {
    next(err);
  }
};

/* Modification d'un Utilisateur */
exports.updateUser = async (req, res, next) => {
  try {
    let userID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!userID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche de l'utilisateur
    let user = await User.findOne({ where: { id: userID }, raw: true });

    // Vérification de l'existance de l'utilisateur
    if (user === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }

    req.body.slug = slugify(req.body.name);
    
    // Mise à jour de l'user
    await User.update(req.body, { where: { id: userID } });

    // Réponse de la mise à jour
    return res.json({
      message: "L'utilisateur à bien été modifié .",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

/* Annulation de suppression d'un Utilisateur (Soft Delete) */
exports.untrashUser = async (req, res, next) => {
  try {
    let userID = parseInt(req.params.id);

    // Vérification si champ id présent et cohérent
    if (!userID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Restauration de l'utilisateur
    await User.restore({ where: { id: userID } });

    // Réponse de la Restauration
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Utilisateur (Soft Delete) */
exports.trashUser = async (req, res, next) => {
  try {
    let userID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!userID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de l'utilisateur (soft delete without force: true)
    await User.destroy({ where: { id: userID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Suppression d'un Utilisateur (Hard Delete) */
exports.deleteUser = async (req, res, next) => {
  try {
    let userID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!userID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Suppression de l'utilisateur (hard delete with force: true)
    await User.destroy({ where: { id: userID }, force: true });

    // Réponse du hard delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};

/* Récupération des Recipes d'un Utilisateur */
exports.getRecipesForUser = async (req, res, next) => {
  let userID = parseInt(req.params.id);

  try {
    // Récupération de l'utilisateur
    let recipes = await Recipe.findAll({
      where: { user_id: userID },
    });
    // Test de l'existance de l'utilisateur
    if (recipes === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }
    // Utilisateur trouvé
    return res.json({ data: recipes });
  } catch (err) {
    next(err);
  }
};

/* Récupération des menus d'un Utilisateur */
exports.getMenusForUser = async (req, res, next) => {
  let userID = parseInt(req.params.id);

  try {
    // Récupération de l'utilisateur
    let menus = await Menu.findAll({
      where: { user_id: userID },
    });
    // Test de l'existance de l'utilisateur
    if (menus === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }
    // Utilisateur trouvé
    return res.json({ data: menus });
  } catch (err) {
    next(err);
  }
};
