import Axios from '../caller.service'

/**
 * Récupération de la liste des ingrédients
 * @returns {Promise}
 */
let getAllIngredients = () => {
    return Axios.get('/admin/meals')
}

/**
 * Récupération d'un ingrédient
 * @param {number} mealId 
 * @returns {Promise}
 */
let getIngredient = (mealId) => {
    return Axios.get('/admin/meals/' + mealId)
}

/**
 * Ajout d'un ingrédient
 * @param {number} meal 
 * @returns {Promise}
 */
let addIngredient = (meal) => {
    return Axios.put('/admin/meals', meal)
}

/**
 * Mise à jour d'un ingrédient
 * @param {number} meal 
 * @returns {Promise}
 */
let updateIngredient = (meal) => {
    return Axios.patch('/admin/meals/' + meal.id, meal)
}

/**
 * Suppression d'un ingrédient
 * @param {number} mealId 
 * @returns {Promise}
 */
let deleteIngredient = (mealId) => {
    return Axios.delete('/admin/meals/' + mealId)
}

export const mealService = {
    getAllIngredients, getIngredient, updateIngredient, deleteIngredient, addIngredient
}