import Axios from '../caller.service'

/**
 * Récupération de la liste des themes
 * @returns {Promise}
 */
let getAllThemes = () => {
    return Axios.get('/admin/themes')
}

/**
 * Récupération d'un theme
 * @param {number} themeId 
 * @returns {Promise}
 */
let getTheme = (themeId) => {
    return Axios.get('/admin/themes/' + themeId)
}

/**
 * Ajout d'un theme
 * @param {number} theme 
 * @returns {Promise}
 */
let addTheme = (theme) => {
    return Axios.put('/admin/themes', theme)
}

/**
 * Mise à jour d'un theme
 * @param {number} theme 
 * @returns {Promise}
 */
let updateTheme = (theme) => {
    return Axios.patch('/admin/themes/' + theme.id, theme)
}

/**
 * Suppression d'un theme
 * @param {number} themeId 
 * @returns {Promise}
 */
let deleteTheme = (themeId) => {
    return Axios.delete('/admin/themes/' + themeId)
}

export const themeService = {
    getAllThemes, getTheme, updateTheme, deleteTheme, addTheme
}