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

let savePayload = (payload) => {
    localStorage.setItem('payload', JSON.stringify(payload));
}

let getToken = () => {
    return localStorage.getItem('token')
}

let getPayload = () => {
    return JSON.parse(localStorage.getItem('payload'))
}

let logout = () => {
    localStorage.removeItem('token')
}

let isLogged = () => {
    let token = localStorage.getItem('token');
    return !!token;
}

export const accountService = {
    saveToken, savePayload, logout, isLogged, login, getToken, getPayload, register
}