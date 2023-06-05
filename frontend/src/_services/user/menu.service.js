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
 * Récupération de la liste des menus de l'utilisateur connecté
 * @returns {Promise}
 */
let getMyMenus = () => {
    return Axios.get('/user/menus/me')
}

/**
 * Ajout d'un menu de l'utilisateur connecté
 * @param {number} menu 
 * @returns {Promise}
 */
let addMyMenu = (menu) => {
    return Axios.put('/user/menus/me', menu)
}

/**
 * Ajout d'un menu de l'utilisateur connecté
 * @param {number} menu 
 * @param {number} recipeId 
 * @returns {Promise}
 */
let addRecipeInMyMenu = (recipeId, menu) => {
    return Axios.put('/user/menus/recipe/' + recipeId, menu,{headers: { 'content-type': 'application/x-www-form-urlencoded' }})
}

/**
 * Mise à jour d'un menu de l'utilisateur connecté
 * @param {number} menu 
 * @returns {Promise}
 */
let updateMyMenu = (menu) => {
    return Axios.patch('/user/menus/me/' + menu.id, menu)
}

/**
 * Suppression d'un menu de l'utilisateur connecté
 * @param {number} menuId 
 * @returns {Promise}
 */
let trashMyMenu = (menuId) => {
    return Axios.delete('/user/menus/me/trash/' + menuId)
}

/**
 * Restauration d'un menu de l'utilisateur connecté
 * @param {number} menuId 
 * @returns {Promise}
 */
let untrashMyMenu = (menuId) => {
    return Axios.post('/user/menus/me/untrash/' + menuId)
}

export const menuService = {
    getAllMenus, getMenu, getMyMenus, addMyMenu, updateMyMenu, trashMyMenu, untrashMyMenu, addRecipeInMyMenu
}