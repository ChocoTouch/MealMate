import Axios from '../caller.service'

/**
 * Récupération de la liste des catégories
 * @returns {Promise}
 */
let getAllCategories = () => {
    return Axios.get('/admin/categories')
}

/**
 * Récupération d'une catégorie
 * @param {number} categoryId 
 * @returns {Promise}
 */
let getCategory = (categoryId) => {
    return Axios.get('/admin/categories/' + categoryId)
}

/**
 * Ajout d'une catégorie
 * @param {number} category 
 * @returns {Promise}
 */
let addCategory = (category) => {
    return Axios.put('/admin/categories', category)
}

/**
 * Mise à jour d'une catégorie
 * @param {number} category 
 * @returns {Promise}
 */
let updateCategory = (category) => {
    return Axios.patch('/admin/categories/' + category.id, category)
}

/**
 * Suppression d'une catégorie
 * @param {number} categoryId 
 * @returns {Promise}
 */
let deleteCategory = (categoryId) => {
    return Axios.delete('/admin/categories/' + categoryId)
}

export const categoryService = {
    getAllCategories, getCategory, updateCategory, deleteCategory, addCategory
}