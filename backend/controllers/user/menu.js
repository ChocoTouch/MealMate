const DB = require("../../db.config");
const slugify = require("slugify");
const Menu = DB.Menu;
const Recipe = DB.Recipe;
const Meal = DB.Meal;
const User = DB.User;
const Course = DB.Course;
const DayOfWeek = DB.DayOfWeek;
const {
  RequestError,
  RecipeError,
  MenuError,
  CourseError,
} = require("../../error/customError");

/***************** Récupération de l'ensemble des Menus *****************/
exports.getAllMenus = (req, res, next) => {
  // Recherche des menus
  Menu.findAll()
    .then((menus) => res.json({ data: menus }))
    .catch((err) => next());
};

/***************** Récupération de l'ensemble de mes Menus *****************/
exports.getMyMenus = async (req, res, next) => {
  try {
    // Recherche des menus
    let menus = await Menu.findAll({
      where: {
        user_id: req.decodedToken.id,
      },
      include: [
        { model: Recipe },
        { model: Meal },
        { model: DayOfWeek },
        { model: Course },
      ],
    });
    // Vérification de l'existance de menu
    if (menus === null) {
      throw new MenuError("Aucun menu trouvé", 0);
    }
    // Réponse des Menus Trouvés
    return res.json({ data: menus });
  } catch (err) {
    next(err);
  }
};

/****************** Récupération d'un Menu ******************/
exports.getMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);
    // Vérification de l'existance du champ
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    // Récupération du menu
    let menu = await Menu.findOne({
      where: { id: menuID },
      include: { model: User, attributes: ["id", "username", "email"] },
    });
    // Vérification de l'existance du menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas .", 0);
    }
    // Réponse du Menu Trouvé
    return res.json({ data: menu });
  } catch (err) {
    next(err);
  }
};

/****************** Récupération des Recettes d'un Menu ******************/
exports.getRecipesInMenu = async (req, res, next) => {
  let menuID = parseInt(req.params.id);
  // Verification de l'existance du champ
  if (!menuID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }
  try {
    // Récupération du menu
    let menu = await Menu.findOne({ where: { id: menuID }, include: Recipe });
    // Vérification de l'existance du menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas .", 0);
    }
    let recipes = menu.Recipes;
    // Réponse des Recettes et du Menu trouvés
    return res.json({ data: recipes });
  } catch (err) {
    next(err);
  }
};

/****************** Ajout d'un Repas dans un Menu ******************/
exports.addMealInMyMenu = async (req, res, next) => {
  try {
    let mealID = parseInt(req.params.id);
    const { menu_id, count } = req.body;
    // Validation des données reçues
    if (!mealID || !menu_id || !count) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let menu = await Menu.findOne({
      where: { id: menu_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance du Menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
    }
    let meal = await Meal.findOne({ where: { id: mealID } });
    // Vérification de l'existance du Repas
    if (meal === null) {
      throw new RecipeError("Ce repas n'existe pas .", 0);
    }
    // Ajout du Repas dans le Menu
    let menuMeal = await menu.addMeal(meal);
    // Réponse du Repas ajouté.
    return res.json({
      message: "Ce repas a bien été ajoutée à votre menu .",
      data: menuMeal,
    });
  } catch (err) {
    next(err);
  }
};

/****************** Suppression d'un Repas dans un Menu ******************/
exports.deleteMealInMyMenu = async (req, res, next) => {
  try {
    let mealID = parseInt(req.params.id);
    const { menu_id } = req.body;
    // Validation des données reçues
    if (!menu_id || !mealID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let menu = await Menu.findOne({
      where: { id: menu_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance du Menu
    if (menu === null) {
      throw new MenuError(
        "Ce Menu n'existe pas ou ne vous appartient pas .",
        0
      );
    }
    let meal = await Meal.findOne({ where: { id: mealID } });
    // Vérification de l'existance du Repas
    if (meal === null) {
      throw new MealError("Ce Repas n'existe pas .", 0);
    }
    // Suppression du Repas dans le Menu
    await menu.removeMeal(meal);
    // Réponse du repas supprimé.
    return res.status(204).json({
      message: "Le repas a bien été supprimé de votre menu .",
    });
  } catch (err) {
    next(err);
  }
};

/****************** Ajout d'un Jour dans un Menu ******************/
exports.addDayOfWeekInMyMenu = async (req, res, next) => {
  try {
    let dayOfWeekID = parseInt(req.params.id);
    const { menu_id, count } = req.body;
    // Validation des données reçues
    if (!dayOfWeekID || !menu_id || !count) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let menu = await Menu.findOne({
      where: { id: menu_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance du Menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
    }
    let dayOfWeek = await DayOfWeek.findOne({ where: { id: dayOfWeekID } });
    // Vérification de l'existance du Jour
    if (dayOfWeek === null) {
      throw new RecipeError("Ce jour n'existe pas .", 0);
    }
    // Ajout du Jour dans le Menu
    let menuDayOfWeek = await menu.addDayOfWeek(dayOfWeek);
    // Réponse du jour ajouté.
    return res.json({
      message: "Ce jour a bien été ajoutée à votre menu .",
      data: menuDayOfWeek,
    });
  } catch (err) {
    next(err);
  }
};

/****************** Suppression d'un Jour dans un Menu ******************/
exports.deleteDayOfWeekInMyMenu = async (req, res, next) => {
  try {
    let dayOfWeekID = parseInt(req.params.id);
    const { menu_id } = req.body;
    // Validation des données reçues
    if (!menu_id || !dayOfWeekID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let menu = await Menu.findOne({
      where: { id: menu_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance du Menu
    if (menu === null) {
      throw new MenuError(
        "Ce Menu n'existe pas ou ne vous appartient pas .",
        0
      );
    }
    let dayOfWeek = await DayOfWeek.findOne({ where: { id: dayOfWeekID } });
    // Vérification de l'existance du Jour
    if (dayOfWeek === null) {
      throw new DayOfWeekError("Ce Jour n'existe pas .", 0);
    }
    // Suppression du jour dans le Menu
    await menu.removeDayOfWeek(dayOfWeek);
    // Réponse du jour supprimé.
    return res.status(204).json({
      message: "Le jour a bien été supprimé de votre menu .",
    });
  } catch (err) {
    next(err);
  }
};

/****************** Ajout d'un Plat dans un Menu ******************/
exports.addCourseInMyMenu = async (req, res, next) => {
  try {
    let courseID = parseInt(req.params.id);
    const { menu_id, count } = req.body;
    // Validation des données reçues
    if (!courseID || !menu_id || !count) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let menu = await Menu.findOne({
      where: { id: menu_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance du Menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
    }
    let course = await Course.findOne({ where: { id: courseID } });
    // Vérification de l'existance du Plat
    if (course === null) {
      throw new CourseError("Ce plat n'existe pas .", 0);
    }
    // Ajout du Plat dans le Menu
    let menuCourse = await menu.addCourse(course);
    // Réponse du Plat ajouté.
    return res.json({
      message: "Ce plat a bien été ajoutée à votre menu .",
      data: menuCourse,
    });
  } catch (err) {
    next(err);
  }
};

/****************** Suppression d'un Plat dans un Menu ******************/
exports.deleteCourseInMyMenu = async (req, res, next) => {
  try {
    let courseID = parseInt(req.params.id);
    const { menu_id } = req.body;
    // Validation des données reçues
    if (!menu_id || !courseID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let menu = await Menu.findOne({
      where: { id: menu_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance du Menu
    if (menu === null) {
      throw new MenuError(
        "Ce menu n'existe pas ou ne vous appartient pas .",
        0
      );
    }
    let course = await Course.findOne({ where: { id: courseID } });
    // Vérification de l'existance du Plat
    if (course === null) {
      throw new CourseError("Ce Plat n'existe pas .", 0);
    }
    // Suppression du Plat dans le Menu
    await menu.removeCourse(course);
    // Réponse du Plat supprimé.
    return res.status(204).json({
      message: "Le plat a bien été supprimé de votre menu .",
    });
  } catch (err) {
    next(err);
  }
};

/****************** Ajout d'une Recette dans un Menu ******************/
exports.addRecipeInMyMenu = async (req, res, next) => {
  try {
    const { recipe_id, menu_id, count } = req.body;
    // Validation des données reçues
    if (!recipe_id || !menu_id || !count) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let menu = await Menu.findOne({
      where: { id: menu_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance du menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
    }
    let recipe = await Recipe.findOne({ where: { id: recipe_id } });
    // Vérification de l'existance de la Recette
    if (recipe === null) {
      throw new RecipeError("Cette recette n'existe pas .", 0);
    }
    // Ajout de la Recette dans le menu
    let menuRecipe = await menu.addRecipe(recipe, {
      through: { count: count },
    });
    // Réponse du menu créé.
    return res.json({
      message: "La recette a bien été ajoutée à votre menu .",
      data: menuRecipe,
    });
  } catch (err) {
    next(err);
  }
};

/****************** Suppression d'une Recette dans un Menu ******************/
exports.deleteRecipeInMyMenu = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);
    const { menu_id } = req.body;
    // Validation des données reçues
    if (!menu_id || !recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let menu = await Menu.findOne({
      where: { id: menu_id, user_id: req.decodedToken.id },
    });
    // Vérification de l'existance du Menu
    if (menu === null) {
      throw new MenuError(
        "Ce Menu n'existe pas ou ne vous appartient pas .",
        0
      );
    }
    let recipe = await Recipe.findOne({ where: { id: recipeID } });
    // Vérification de l'existance de la Recette
    if (recipe === null) {
      throw new RecipeError("Cette recette n'existe pas .", 0);
    }
    // Suppression de la Recette dans le Menu
    await menu.removeRecipe(recipe);
    // Réponse de la Recette supprimée.
    return res.status(204).json({
      message: "La recette a bien été supprimée de votre menu .",
    });
  } catch (err) {
    next(err);
  }
};

/****************** Création d'un Menu ******************/
exports.addMyMenu = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    // Validation des données reçues
    if (!name || !description) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    req.body.user_id = req.decodedToken.id;
    req.body.slug = slugify(name);
    // Création du menu
    let menu = await Menu.create(req.body, {
      include: [
        {
          model: User,
        },
      ],
    });
    // Réponse du menu créé.
    return res.json({ message: "Le menu a bien été crée .", data: menu });
  } catch (err) {
    next(err);
  }
};

/****************** Modification d'un Menu ******************/
exports.updateMyMenu = async (req, res, next) => {
  try {
    const { name } = req.body;
    let menuID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche du menu
    let menu = await Menu.findOne({
      where: { id: menuID, user_id: req.decodedToken },
      raw: true,
    });

    // Vérification de l'existance du menu
    if (menu === null) {
      throw new MenuError("Ce menu n'existe pas ou ne vous appartient pas.", 0);
    }
    req.body.slug = slugify(name);
    // Mise à jour du menu
    await Menu.update(req.body, {
      where: { id: menuID },
    });

    // Réponse de la mise à jour
    return res.json({ message: "Le menu à bien été modifié .", data: menu });
  } catch (err) {
    next(err);
  }
};

/****************** Suppression d'un Menu (Soft Delete) ******************/
exports.deleteMyMenu = async (req, res, next) => {
  try {
    let menuID = parseInt(req.params.id);

    // Vérification si le champ id existe et cohérent
    if (!menuID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    // Recherche du menu
    let menu = await Menu.findOne({
      where: { id: menuID, user_id: req.decodedToken.id },
      raw: true,
    });

    // Vérification de l'existance du Menu
    if (menu === null) {
      throw new MenuError(
        "Cette Menu n'existe pas ou ne vous appartient pas.",
        0
      );
    }

    // Suppression du menu (soft delete without force: true)
    await Menu.destroy({ where: { id: menuID } });

    // Réponse du soft delete
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
