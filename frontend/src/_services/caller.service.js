import axios from 'axios';
import { accountService } from './account.service';

const Axios = axios.create({
    baseURL: 'http://localhost:8888',
    headers: { 'Access-Control-Allow-Origin': '*' },
});

// Intercepteur pour la mise en place du token dans la requête.
Axios.interceptors.request.use(request => {
    if (accountService.isLogged()) {
        request.headers.Authorization = 'Bearer ' + accountService.getToken();
    }
    return request;
});

// Intercepteur de réponse API pour vérification de la session.
Axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status === 401 || error.response.status === 500) {
        accountService.logout();
        window.location = '/auth/login';
    } else {
        return Promise.reject(error);
    }
});

export default Axios;