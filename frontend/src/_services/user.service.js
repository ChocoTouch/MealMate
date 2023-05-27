import Axios from './caller.service'

/**
 * Récupératoin de la liste des utilisateurs
 * @returns {Promise}
 */
let getAllUsers = () => {
    return Axios.get('/admin/users')
}

/**
 * Récupération d'un utilisateur
 * @param {number} uid 
 * @returns {Promise}
 */
let getUser = (uid) => {
    return Axios.get('/admin/users/' + uid)
}

/**
 * Ajout d'un utilisateur
 * @param {number} user 
 * @returns {Promise}
 */
let addUser = (user) => {
    return Axios.put('/admin/users', user)
}

/**
 * Mise à jour d'un utilisateur
 * @param {number} user 
 * @returns {Promise}
 */
let updateUser = (user) => {
    return Axios.patch('/admin/users/' + user.id, user)
}

/**
 * Suppression d'un utilsateur
 * @param {number} uid 
 * @returns {Promise}
 */
let deleteUser = (uid) => {
    return Axios.delete('/admin/users/' + uid)
}

export const userService = {
    getAllUsers, getUser, updateUser, deleteUser, addUser
}