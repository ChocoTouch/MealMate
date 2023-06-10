import Axios from '../caller.service'

/**
 * Récupération de la liste des repas
 * @returns {Promise}
 */
let getAllMeals = () => {
    return Axios.get('/public/meals')
}

/**
 * Récupération d'un repas
 * @param {number} mealId 
 * @returns {Promise}
 */
let getMeal = (mealId) => {
    return Axios.get('/public/meals/' + mealId)
}

export const mealService = {
    getAllMeals, getMeal
}