import Axios from '../caller.service'

/**
 * Récupération de la liste des régimes
 * @returns {Promise}
 */
let getAllUsers = () => {
    return Axios.get('/user/users')
}

/**
 * Récupération d'un régime
 * @param {number} userId 
 * @returns {Promise}
 */
let getUser = (userId) => {
    return Axios.get('/user/users/' + userId)
}

export const userService = {
    getAllUsers, getUser
}