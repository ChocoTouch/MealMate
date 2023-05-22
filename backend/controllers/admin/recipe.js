
const DB = require("../../db.config");
const slugify = require("slugify");
const Recipe = DB.Recipe;
const User = DB.User;
const Menu = DB.Menu;
const Ingredient = DB.Ingredient;
const Diet = DB.Diet;
const Theme = DB.Theme;
const Comment = DB.Comment;
const {
  RequestError,
  RecipeError,
  IngredientError,
  UserError,
  DietError,
} = require("../../error/customError");


exports.getAllRecipes = (req, res, next) => {
  Recipe.findAll({include: Theme})
    .then((recipes) => res.json({ data: recipes }))
    .catch((err) => next());
};


exports.getMyRecipes = async (req, res, next) => {
  try {
    let recipes = await Recipe.findAll({
      where: {
        user_id: req.decodedToken.id,
      },
      include: [
        { model: Ingredient, as: 'Ingredients'},
        { model: Comment },
        { model: Theme },
      ],
    });
    if (recipes === null) {
      throw new RecipeError("Aucune recette trouvée", 0);
    }
    return res.json({ data: recipes });
  } catch (err) {
    next(err);
  }
};


exports.getRecipe = async (req, res, next) => {
  let recipeID = parseInt(req.params.id);
  
  if (!recipeID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }

  try {
    
    let recipe = await Recipe.findOne({
      where: { id: recipeID },
      include: [
        { model: User },
        { model: Theme },
        { model: Ingredient }
      ],
    });
    
    if (recipe === null) {
      throw new RecipeError("Cette recette n'existe pas .", 0);
    }
    
    return res.json({ data: recipe });
  } catch (err) {
    next(err);
  }
};


exports.getMenusForRecipe = async (req, res, next) => {
  let recipeID = parseInt(req.params.id);
  
  if (!recipeID) {
    throw new RequestError("Paramètre(s) manquant(s) .");
  }
  try {
    
    let recipe = await Recipe.findOne({
      where: { id: recipeID },
      include: Menu,
    });
    
    if (recipe === null) {
      throw new RecipeError("Cette Recette n'existe pas .", 0);
    }
    let menus = recipe.Menus;
    
    return res.json({ data: menus });
  } catch (err) {
    next(err);
  }
};


exports.addRecipe = async (req, res, next) => {
  try {
    const { name, user_id, description, instructions, difficulty, theme_id } =
      req.body;
    
    if (!name || !user_id || !description || !instructions || !difficulty) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    
    if (!theme_id) {
      req.body.theme_id = 1;
    } else {
      let theme = await Theme.findOne({ where: { id: theme_id } });
      if (!theme) {
        throw new RequestError("Ce thème n'existe pas .", 0);
      }
    }
    
    if (difficulty < 1 || difficulty > 5) {
      throw new RequestError("La difficulté est incohérente .", 0);
    }
    
    let user = await User.findOne({ where: { id: user_id } });
    
    if (user === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }
    req.body.user_username = user.username;
    req.body.slug = slugify(name);
    
    let recipe = await Recipe.create(req.body);

    
    return res.json({
      message: "La recette a bien été créée .",
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};


exports.updateRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);
    const { name, user_id, theme_id, difficulty } = req.body;
    
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    
    if (!theme_id) {
      req.body.theme_id = 1;
    } else {
      let theme = await Theme.findOne({ where: { id: theme_id } });
      if (!theme) {
        throw new RequestError("Ce thème n'existe pas .", 0);
      }
    }
    
    if (difficulty < 1 || difficulty > 5) {
      throw new RequestError("La difficulté est incohérente .", 0);
    }
    
    let recipe = await Recipe.findOne({
      where: { id: recipeID },
      raw: true,
    });

    
    if (recipe === null) {
      throw new RecipeError("Cette Recipe n'existe pas .", 0);
    }
    
    let user = await User.findOne({ where: { id: user_id } });
    
    if (user === null) {
      throw new UserError("Cet utilisateur n'existe pas .", 0);
    }
    req.body.user_username = user.username;
    req.body.slug = slugify(name);
    
    await Recipe.update(req.body, { where: { id: recipeID } });

    
    return res.json({
      message: "La Recipe à bien été modifiée .",
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};


exports.untrashRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);

    
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    
    await Recipe.restore({ where: { id: recipeID } });

    
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};


exports.trashRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);

    
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    
    await Recipe.destroy({ where: { id: recipeID } });

    
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};


exports.deleteRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);

    
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    
    await Recipe.destroy({ where: { id: recipeID }, force: true });

    
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};


exports.addIngredientInMyRecipe = async (req, res, next) => {
  try {
    let ingredientID = parseInt(req.params.id);
    const { recipe_id, count } = req.body;
    
    if (!recipe_id || !ingredientID || !count) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let recipe = await Recipe.findOne({
      where: { id: recipe_id, user_id: req.decodedToken.id },
    });
    
    if (recipe === null) {
      throw new RecipeError(
        "Cette recette n'existe pas ou ne vous appartient pas .",
        0
      );
    }
    let ingredient = await Ingredient.findOne({ where: { id: ingredientID } });
    
    if (ingredient === null) {
      throw new IngredientError("Cet ingredient n'existe pas .", 0);
    }
    
    let recipeIngredient = await recipe.addIngredient(ingredient, {
      through: { count: count },
    });
    
    return res.json({
      message: "L'ingrédient a bien été ajoutée à votre recette .",
      data: recipeIngredient,
    });
  } catch (err) {
    next(err);
  }
};


exports.deleteIngredientInMyRecipe = async (req, res, next) => {
  try {
    let ingredientID = parseInt(req.params.id);
    const { recipe_id } = req.body;
    
    if (!recipe_id || !ingredientID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let recipe = await Recipe.findOne({
      where: { id: recipe_id, user_id: req.decodedToken.id },
    });
    
    if (recipe === null) {
      throw new RecipeError(
        "Cette recette n'existe pas ou ne vous appartient pas.",
        0
      );
    }
    let ingredient = await Ingredient.findOne({ where: { id: ingredientID } });
    
    if (ingredient === null) {
      throw new IngredientError("Cet Ingredient n'existe pas .", 0);
    }
    
    await recipe.removeIngredient(ingredient);
    
    return res.status(204).json({
      message: "L'ingredient a bien été supprimé de votre recette .",
    });
  } catch (err) {
    next(err);
  }
};


exports.addDietInMyRecipe = async (req, res, next) => {
  try {
    let dietID = parseInt(req.params.id);
    const { recipe_id } = req.body;
    
    if (!recipe_id || !dietID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    
    let recipe = await Recipe.findOne({
      where: { id: recipe_id, user_id: req.decodedToken.id },
    });
    
    if (recipe === null) {
      throw new RecipeError(
        "Cette recette n'existe pas ou ne vous appartient pas .",
        0
      );
    }
    let diet = await Diet.findOne({ where: { id: dietID } });
    
    if (diet === null) {
      throw new DietError("Ce régime n'existe pas .", 0);
    }
    
    let recipeDiet = await recipe.addDiet(diet);
    
    return res.json({
      message: "Le régime a bien été ajoutée à votre recette .",
      data: recipeDiet,
    });
  } catch (err) {
    next(err);
  }
};


exports.deleteDietInMyRecipe = async (req, res, next) => {
  try {
    let dietID = parseInt(req.params.id);
    const { recipe_id } = req.body;
    
    if (!recipe_id || !dietID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    let recipe = await Recipe.findOne({
      where: { id: recipe_id, user_id: req.decodedToken.id },
    });
    
    if (recipe === null) {
      throw new RecipeError(
        "Cette recette n'existe pas ou ne vous appartient pas.",
        0
      );
    }
    let diet = await Diet.findOne({ where: { id: dietID } });
    
    if (diet === null) {
      throw new DietError("Ce régime n'existe pas .", 0);
    }
    
    await recipe.removeDiet(diet);
    
    return res.status(204).json({
      message: "Le régime a bien été supprimé de votre recette .",
    });
  } catch (err) {
    next(err);
  }
};


exports.createMyRecipe = async (req, res, next) => {
  try {
    const { name, description, instructions, difficulty, theme_id } = req.body;
    
    if (!name || !description || !instructions || !difficulty) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    
    if (!theme_id) {
      req.body.theme_id = 1;
    } else {
      let theme = await Theme.findOne({ where: { id: theme_id } });
      if (!theme) {
        throw new RequestError("Ce thème n'existe pas .", 0);
      }
    }
    
    if (difficulty < 1 || difficulty > 5) {
      throw new RequestError("La difficulté est incohérente .", 0);
    }
    
    let user = await User.findOne({ where: { id: req.decodedToken.id } });
    req.body.user_id = user.id;
    req.body.user_username = user.username;
    req.body.slug = slugify(name);
    
    let recipe = await Recipe.create(req.body);

    
    return res.json({
      message: "La recette a bien été créée .",
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};


exports.updateMyRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);
    const { name, theme_id, difficulty } = req.body;
    
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }
    
    if (!theme_id) {
      req.body.theme_id = 1;
    } else {
      let theme = await Theme.findOne({ where: { id: theme_id } });
      if (!theme) {
        throw new RequestError("Ce thème n'existe pas .", 0);
      }
    }
    
    if (difficulty < 1 || difficulty > 5) {
      throw new RequestError("La difficulté est incohérente .", 0);
    }
    
    let recipe = await Recipe.findOne({
      where: { id: recipeID, user_id: req.decodedToken.id },
      raw: true,
    });

    
    if (recipe === null) {
      throw new RecipeError(
        "Cette Recipe n'existe pas ou ne vous appartient pas.",
        0
      );
    }
    
    let user = await User.findOne({ where: { id: req.decodedToken.id } });
    req.body.user_id = user.id;
    req.body.user_username = user.username;
    req.body.slug = slugify(name);
    
    await Recipe.update(req.body, {
      where: { id: recipeID },
    });

    
    return res.json({
      message: "La Recipe à bien été modifiée .",
      data: recipe,
    });
  } catch (err) {
    next(err);
  }
};


exports.deleteMyRecipe = async (req, res, next) => {
  try {
    let recipeID = parseInt(req.params.id);

    
    if (!recipeID) {
      throw new RequestError("Paramètre(s) manquant(s) .");
    }

    
    let recipe = await Recipe.findOne({
      where: { id: recipeID, user_id: req.decodedToken.id },
      raw: true,
    });

    
    if (recipe === null) {
      throw new RecipeError(
        "Cette Recipe n'existe pas ou ne vous appartient pas.",
        0
      );
    }

    
    await Recipe.destroy({
      where: { id: recipeID, user_id: req.decodedToken.id },
    });

    
    return res.status(204).json({});
  } catch (err) {
    next(err);
  }
};
