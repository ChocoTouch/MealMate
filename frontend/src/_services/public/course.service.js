import Axios from '../caller.service'

/**
 * Récupération de la liste des plats
 * @returns {Promise}
 */
let getAllCourses = () => {
    return Axios.get('/public/courses')
}

/**
 * Récupération d'un plat
 * @param {number} courseId 
 * @returns {Promise}
 */
let getCourse = (courseId) => {
    return Axios.get('/public/courses/' + courseId)
}

export const courseService = {
    getAllCourses, getCourse
}