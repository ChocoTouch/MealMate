import Axios from '../caller.service'

/**
 * Récupération de la liste des menus
 * @returns {Promise}
 */
let getAllMenus = () => {
    return Axios.get('/admin/menus')
}

/**
 * Récupération d'un menu
 * @param {number} menuId 
 * @returns {Promise}
 */
let getMenu = (menuId) => {
    return Axios.get('/admin/menus/' + menuId)
}

/**
 * Récupération de la liste des menus de l'utilisateur connecté
 * @returns {Promise}
 */
let getMyMenus = () => {
    return Axios.get('/admin/menus/me')
}

/**
 * Ajout d'un menu
 * @param {number} menu 
 * @returns {Promise}
 */
let addMenu = (menu) => {
    return Axios.put('/admin/menus', menu)
}

/**
 * Mise à jour d'un menu
 * @param {number} menu 
 * @returns {Promise}
 */
let updateMenu = (menu) => {
    return Axios.patch('/admin/menus/' + menu.id, menu)
}

/**
 * Suppression d'un menu
 * @param {number} menuId 
 * @returns {Promise}
 */
let deleteMenu = (menuId) => {
    return Axios.delete('/admin/menus/' + menuId)
}

export const menuService = {
    getAllMenus, getMenu, getMyMenus, updateMenu, deleteMenu, addMenu
}