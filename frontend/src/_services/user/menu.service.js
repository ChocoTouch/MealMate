import Axios from '../caller.service'

/**
 * Récupération de la liste des menus
 * @returns {Promise}
 */
let getAllMenus = () => {
    return Axios.get('/user/menus')
}

/**
 * Récupération d'un menu
 * @param {number} menuId 
 * @returns {Promise}
 */
let getMenu = (menuId) => {
    return Axios.get('/user/menus/' + menuId)
}

/**
 * Ajout d'un menu
 * @param {number} menu 
 * @returns {Promise}
 */
let addMenu = (menu) => {
    return Axios.put('/user/menus', menu)
}

/**
 * Mise à jour d'un menu
 * @param {number} menu 
 * @returns {Promise}
 */
let updateMenu = (menu) => {
    return Axios.patch('/user/menus/' + menu.id, menu)
}

/**
 * Suppression d'un menu
 * @param {number} menuId 
 * @returns {Promise}
 */
let deleteMenu = (menuId) => {
    return Axios.delete('/user/menus/' + menuId)
}

export const menuService = {
    getAllMenus, getMenu, updateMenu, deleteMenu, addMenu
}