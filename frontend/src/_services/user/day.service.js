import Axios from '../caller.service'

/**
 * Récupération de la liste des jours
 * @returns {Promise}
 */
let getAllDaysOfWeek = () => {
    return Axios.get('/user/daysofweek')
}

/**
 * Récupération d'un jour
 * @param {number} dayId 
 * @returns {Promise}
 */
let getDayOfWeek = (dayId) => {
    return Axios.get('/user/daysofweek/' + dayId)
}

export const dayService = {
    getAllDaysOfWeek, getDayOfWeek
}