import Axios from '../caller.service'

/**
 * Récupératoin de la liste des utilisateurs
 * @returns {Promise}
 */
let getAllUsers = () => {
    return Axios.get('/public/users')
}

/**
 * Récupération d'un utilisateur
 * @param {number} userId 
 * @returns {Promise}
 */
let getUser = (userId) => {
    return Axios.get('/public/users/' + userId)
}


export const userService = {
    getAllUsers, getUser
}