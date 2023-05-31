import Axios from '../caller.service'

/**
 * Récupération de la liste des ingrédients
 * @returns {Promise}
 */
let getAllIngredients = () => {
    return Axios.get('/admin/ingredients')
}

/**
 * Récupération d'un ingrédient
 * @param {number} ingredientId 
 * @returns {Promise}
 */
let getIngredient = (ingredientId) => {
    return Axios.get('/admin/ingredients/' + ingredientId)
}

/**
 * Ajout d'un ingrédient
 * @param {number} ingredient 
 * @returns {Promise}
 */
let addIngredient = (ingredient) => {
    return Axios.put('/admin/ingredients', ingredient)
}

/**
 * Mise à jour d'un ingrédient
 * @param {number} ingredient 
 * @returns {Promise}
 */
let updateIngredient = (ingredient) => {
    return Axios.patch('/admin/ingredients/' + ingredient.id, ingredient)
}

/**
 * Suppression d'un ingrédient
 * @param {number} ingredientId 
 * @returns {Promise}
 */
let deleteIngredient = (ingredientId) => {
    return Axios.delete('/admin/ingredients/' + ingredientId)
}

export const ingredientService = {
    getAllIngredients, getIngredient, updateIngredient, deleteIngredient, addIngredient
}