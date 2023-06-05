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
let trashMyRecipe = (recipeId) => {
    return Axios.delete('/user/recipes/me/trash/' + recipeId)
}

/**
 * Restauration d'une recette de l'utilisateur connecté
 * @param {number} recipeId 
 * @returns {Promise}
 */
let untrashMyRecipe = (recipeId) => {
    return Axios.post('/user/recipes/me/untrash/' + recipeId)
}

/**
 * Ajout d'un ingrédient dans une recette de l'utilisateur connecté
 * @param {number} recipe_id
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

/**
 * Ajout d'un régime dans une recette de l'utilisateur connecté
 * @param {number} dietId
 * @returns {Promise}
 */
let addDietInMyRecipe = (dietId, recipe) => {
    return Axios.put('/user/recipes/diet/' + dietId, recipe)
}

/**
 * Suppression d'un régime dans une recette de l'utilisateur connecté
 * @param {number} recipe_id 
 * @param {number} dietId
 * @returns {Promise}
 */
let deleteDietInMyRecipe = (dietId, recipe_id) => {
    return Axios.delete('/user/recipes/diet/' + dietId, recipe_id)
}

export const recipeService = {
    getAllRecipes, getRecipe, getMyRecipes, updateMyRecipe, trashMyRecipe, untrashMyRecipe, addMyRecipe, addIngredientInMyRecipe,deleteIngredientInMyRecipe,addDietInMyRecipe,deleteDietInMyRecipe
}