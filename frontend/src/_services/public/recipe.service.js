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
 * @param {string} recipeSlug 
 * @returns {Promise}
 */
let getRecipe = (recipeSlug) => {
    return Axios.get('/public/recipes/' + recipeSlug)
}


export const recipeService = {
    getAllRecipes, getRecipe
}