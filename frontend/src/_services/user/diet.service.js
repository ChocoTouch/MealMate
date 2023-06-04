import Axios from '../caller.service'

/**
 * Récupération de la liste des régimes
 * @returns {Promise}
 */
let getAllDiets = () => {
    return Axios.get('/user/diets')
}

/**
 * Récupération d'un régime
 * @param {number} dietId 
 * @returns {Promise}
 */
let getDiet = (dietId) => {
    return Axios.get('/user/diets/' + dietId)
}

export const dietService = {
    getAllDiets, getDiet
}