import Axios from '../caller.service'

/**
 * Récupération de la liste des repas
 * @returns {Promise}
 */
let getAllMeals = () => {
    return Axios.get('/admin/meals')
}

/**
 * Récupération d'un repas
 * @param {number} mealId 
 * @returns {Promise}
 */
let getMeal = (mealId) => {
    return Axios.get('/admin/meals/' + mealId)
}

/**
 * Ajout d'un repas
 * @param {number} meal 
 * @returns {Promise}
 */
let addMeal = (meal) => {
    return Axios.put('/admin/meals', meal)
}

/**
 * Mise à jour d'un repas
 * @param {number} meal 
 * @returns {Promise}
 */
let updateMeal = (meal) => {
    return Axios.patch('/admin/meals/' + meal.id, meal)
}

/**
 * Suppression d'un repas
 * @param {number} mealId 
 * @returns {Promise}
 */
let deleteMeal = (mealId) => {
    return Axios.delete('/admin/meals/' + mealId)
}

export const mealService = {
    getAllMeals, getMeal, updateMeal, deleteMeal, addMeal
}