import Axios from "./caller.service"

let login = (credentials) => {
    return Axios.post('/auth/login',credentials)
}

let register = (user) => {
    return Axios.post('/auth/register',user)
}

let saveToken = (token) => {
    localStorage.setItem('token', token)
}

let getToken = () => {
    return localStorage.getItem('token')
}

let logout = () => {
    localStorage.removeItem('token')
}

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
}

export const accountService = {
    saveToken, logout, isLogged, login, getToken, register
}