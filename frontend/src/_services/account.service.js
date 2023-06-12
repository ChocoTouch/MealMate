import Axios from "./caller.service"

let login = (credentials) => {
    return Axios.post('/auth/login',credentials)
}

let register = (user) => {
    return Axios.put('/auth/register',user)
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let saveRoles = (roles) => {
    localStorage.setItem('roles', JSON.stringify(roles));
}

let getToken = () => {
    return localStorage.getItem('token')
}

let getRoles = () => {
    return JSON.parse(localStorage.getItem('roles'))
}

let logout = () => {
    localStorage.removeItem('token')
}

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
}

export const accountService = {
    saveToken, saveRoles, logout, isLogged, login, getToken, getRoles, register
}