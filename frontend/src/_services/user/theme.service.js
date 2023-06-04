import Axios from '../caller.service'

/**
 * Récupération de la liste des themes
 * @returns {Promise}
 */
let getAllThemes = () => {
    return Axios.get('/user/themes')
}

/**
 * Récupération d'un theme
 * @param {number} themeId 
 * @returns {Promise}
 */
let getTheme = (themeId) => {
    return Axios.get('/user/themes/' + themeId)
}

export const themeService = {
    getAllThemes, getTheme
}