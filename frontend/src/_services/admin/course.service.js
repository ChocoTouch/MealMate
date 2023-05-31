import Axios from '../caller.service'

/**
 * Récupération de la liste des plats
 * @returns {Promise}
 */
let getAllCourses = () => {
    return Axios.get('/admin/courses')
}

/**
 * Récupération d'un plat
 * @param {number} courseId 
 * @returns {Promise}
 */
let getCourse = (courseId) => {
    return Axios.get('/admin/courses/' + courseId)
}

/**
 * Ajout d'un plat
 * @param {number} course 
 * @returns {Promise}
 */
let addCourse = (course) => {
    return Axios.put('/admin/courses', course)
}

/**
 * Mise à jour d'un plat
 * @param {number} course 
 * @returns {Promise}
 */
let updateCourse = (course) => {
    return Axios.patch('/admin/courses/' + course.id, course)
}

/**
 * Suppression d'un plat
 * @param {number} courseId 
 * @returns {Promise}
 */
let deleteCourse = (courseId) => {
    return Axios.delete('/admin/courses/' + courseId)
}

export const courseService = {
    getAllCourses, getCourse, updateCourse, deleteCourse, addCourse
}