import Axios from '../caller.service'

/**
 * Récupération de la liste des recettes
 * @returns {Promise}
 */
let getAllRecipes = () => {
    return Axios.get('/user/recipes')
}

/**
 * Récupération d'une recette
 * @param {number} recipeId 
 * @returns {Promise}
 */
let getRecipe = (recipeId) => {
    return Axios.get('/user/recipes/' + recipeId)
}

/**
 * Récupération de la liste des recettes de l'utilisateur connecté
 * @returns {Promise}
 */
let getMyRecipes = () => {
    return Axios.get('/user/recipes/me')
}

/**
 * Ajout d'une recette de l'utilisateur connecté
 * @param {number} recipe 
 * @returns {Promise}
 */
let addMyRecipe = (recipe) => {
    return Axios.put('/user/recipes/me', recipe)
}

/**
 * Mise à jour d'une recette de l'utilisateur connecté
 * @param {number} recipe 
 * @returns {Promise}
 */
let updateMyRecipe = (recipe) => {
    return Axios.patch('/user/recipes/me/' + recipe.id, recipe)
}

/**
 * Suppression d'une recette de l'utilisateur connecté
 * @param {number} recipeId 
 * @returns {Promise}
 */
let deleteMyRecipe = (recipeId) => {
    return Axios.delete('/user/recipes/me/' + recipeId)
}

/**
 * Ajout d'un ingrédient dans une recette de l'utilisateur connecté
 * @param {number} ingredientId
 * @returns {Promise}
 */
let addIngredientInMyRecipe = (ingredientId, recipe) => {
    return Axios.put('/user/recipes/ingredient/' + ingredientId, recipe)
}

/**
 * Suppression d'un ingrédient dans une recette de l'utilisateur connecté
 * @param {number} recipe_id 
 * @param {number} ingredientId
 * @returns {Promise}
 */
let deleteIngredientInMyRecipe = (ingredientId, recipe_id) => {
    return Axios.delete('/user/recipes/ingredient/' + ingredientId, recipe_id)
}


export const recipeService = {
    getAllRecipes, getRecipe, getMyRecipes, updateMyRecipe, deleteMyRecipe, addMyRecipe, addIngredientInMyRecipe,deleteIngredientInMyRecipe
}