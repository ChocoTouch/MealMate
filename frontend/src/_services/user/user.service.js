import Axios from '../caller.service'

/**
 * Récupération de la liste des utilisateurs
 * @returns {Promise}
 */
let getAllUsers = () => {
    return Axios.get('/user/users')
}

/**
 * Récupération d'un utilisateur
 * @param {number} userId 
 * @returns {Promise}
 */
let getUser = (userId) => {
    return Axios.get('/user/users/' + userId)
}

/**
 * Récupération de l'utilisateur connecté
 * @returns {Promise}
 */
let getMyUser = () => {
    return Axios.get('/user/users/me')
}

/**
 * Edition du profil de l'utilisateur connecté
 * @param {number} user
 * @returns {Promise}
 */
let updateMyProfile = (user) => {
    return Axios.patch('/user/users/me', user)
}

export const userService = {
    getAllUsers, getUser, getMyUser, updateMyProfile
}