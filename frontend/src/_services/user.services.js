import Axios from './caller.service'

let getAllUsers = () => {
    return Axios.get('/admin/users')
}

let getUser = (uid) => {
    return Axios.get('/admin/' + uid)
}

export const userService = {
    getAllUsers, getUser
}