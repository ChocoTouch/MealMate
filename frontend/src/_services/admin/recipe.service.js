import Axios from '../caller.service'

/**
 * Récupération de la liste des recettes
 * @returns {Promise}
 */
let getAllRecipes = () => {
    return Axios.get('/admin/recipes')
}

/**
 * Récupération d'une recette
 * @param {number} recipeId 
 * @returns {Promise}
 */
let getRecipe = (recipeId) => {
    return Axios.get('/admin/recipes/' + recipeId)
}

/**
 * Ajout d'une recette
 * @param {number} recipe 
 * @returns {Promise}
 */
let addRecipe = (recipe) => {
    return Axios.put('/admin/recipes', recipe)
}

/**
 * Mise à jour d'une recette
 * @param {number} recipe 
 * @returns {Promise}
 */
let updateRecipe = (recipe) => {
    return Axios.patch('/admin/recipes/' + recipe.id, recipe)
}

/**
 * Suppression d'une recette
 * @param {number} recipeId 
 * @returns {Promise}
 */
let deleteRecipe = (recipeId) => {
    return Axios.delete('/admin/recipes/' + recipeId)
}

export const recipeService = {
    getAllRecipes, getRecipe, updateRecipe, deleteRecipe, addRecipe
}