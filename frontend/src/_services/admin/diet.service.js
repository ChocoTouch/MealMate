import Axios from '../caller.service'

/**
 * Récupération de la liste des régimes
 * @returns {Promise}
 */
let getAllDiets = () => {
    return Axios.get('/admin/diets')
}

/**
 * Récupération d'un régime
 * @param {number} dietId 
 * @returns {Promise}
 */
let getDiet = (dietId) => {
    return Axios.get('/admin/diets/' + dietId)
}

/**
 * Ajout d'un régime
 * @param {number} diet 
 * @returns {Promise}
 */
let addDiet = (diet) => {
    return Axios.put('/admin/diets', diet)
}

/**
 * Mise à jour d'un régime
 * @param {number} diet 
 * @returns {Promise}
 */
let updateDiet = (diet) => {
    return Axios.patch('/admin/diets/' + diet.id, diet)
}

/**
 * Suppression d'un régime
 * @param {number} dietId 
 * @returns {Promise}
 */
let deleteDiet = (dietId) => {
    return Axios.delete('/admin/diets/' + dietId)
}

export const dietService = {
    getAllDiets, getDiet, updateDiet, deleteDiet, addDiet
}