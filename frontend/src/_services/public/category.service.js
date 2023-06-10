import Axios from '../caller.service'

/**
 * Récupération de la liste des plats
 * @returns {Promise}
 */
let getAllCategories = () => {
    return Axios.get('/public/categories')
}

/**
 * Récupération d'un plat
 * @param {number} categoryId 
 * @returns {Promise}
 */
let getCategory = (categoryId) => {
    return Axios.get('/public/categories/' + categoryId)
}

export const categoryService = {
    getAllCategories, getCategory
}