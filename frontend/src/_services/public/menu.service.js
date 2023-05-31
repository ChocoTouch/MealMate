import Axios from '../caller.service'

/**
 * Récupératoin de la liste des menus
 * @returns {Promise}
 */
let getAllMenus = () => {
    return Axios.get('/public/menus')
}

/**
 * Récupération d'un menu
 * @param {number} menuId 
 * @returns {Promise}
 */
let getMenu = (menuId) => {
    return Axios.get('/public/menus/' + menuId)
}


export const menuService = {
    getAllMenus, getMenu
}