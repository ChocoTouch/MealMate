import Axios from '../caller.service'

/**
 * Récupération de la liste des jours
 * @returns {Promise}
 */
let getAllDaysOfWeek  = () => {
    return Axios.get('/admin/daysofweek')
}

/**
 * Récupération d'un jour
 * @param {number} dayId 
 * @returns {Promise}
 */
let getDayOfWeek = (dayId) => {
    return Axios.get('/admin/daysofweek/' + dayId)
}

/**
 * Ajout d'un jour
 * @param {number} day 
 * @returns {Promise}
 */
let addDayOfWeek = (day) => {
    return Axios.put('/admin/daysofweek', day)
}

/**
 * Mise à jour d'un jour
 * @param {number} day 
 * @returns {Promise}
 */
let updateDayOfWeek = (day) => {
    return Axios.patch('/admin/daysofweek/' + day.id, day)
}

/**
 * Suppression d'un jour
 * @param {number} dayId 
 * @returns {Promise}
 */
let deleteDayOfWeek = (dayId) => {
    return Axios.delete('/admin/daysofweek/' + dayId)
}

export const dayService = {
    getAllDaysOfWeek , getDayOfWeek, updateDayOfWeek, deleteDayOfWeek, addDayOfWeek
}