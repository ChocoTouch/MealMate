import Axios from '../caller.service'

/**
 * Récupération de la liste des plats
 * @returns {Promise}
 */
let getAllCategories = () => {
    return Axios.get('/user/categories')
}

/**
 * Récupération d'un plat
 * @param {number} categoryId 
 * @returns {Promise}
 */
let getCategory = (categoryId) => {
    return Axios.get('/user/categories/' + categoryId)
}

export const categoryService = {
    getAllCategories, getCategory
}