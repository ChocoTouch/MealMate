import Axios from '../caller.service'

/**
 * Récupératoin de la liste des recettes
 * @returns {Promise}
 */
let getAllRecipes = () => {
    return Axios.get('/public/recipes')
}

/**
 * Récupération d'une recette
 * @param {number} recipeId 
 * @returns {Promise}
 */
let getRecipe = (recipeId) => {
    return Axios.get('/public/recipes/' + recipeId)
}


export const recipeService = {
    getAllRecipes, getRecipe
}