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
 * @param {string} menuSlug 
 * @returns {Promise}
 */
let getMenu = (menuSlug) => {
    return Axios.get('/public/menus/' + menuSlug)
}


export const menuService = {
    getAllMenus, getMenu
}