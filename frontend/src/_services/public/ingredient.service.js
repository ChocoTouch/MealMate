import Axios from '../caller.service'

/**
 * Récupération de la liste des ingrédients
 * @returns {Promise}
 */
let getAllIngredients = () => {
    return Axios.get('/public/ingredients')
}

/**
 * Récupération d'un ingrédient
 * @param {number} ingredientId 
 * @returns {Promise}
 */
let getIngredient = (ingredientId) => {
    return Axios.get('/public/ingredients/' + ingredientId)
}

export const ingredientService = {
    getAllIngredients, getIngredient
}