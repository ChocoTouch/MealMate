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
 * @param {string} userSlug 
 * @returns {Promise}
 */
let getUser = (userSlug) => {
    return Axios.get('/public/users/' + userSlug)
}


export const userService = {
    getAllUsers, getUser
}