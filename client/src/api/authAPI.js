import * as request from '../library/request';

const baseURL = 'http://localhost:3030/users';

export const login = (loginData) => request.post(`${baseURL}/login`, loginData);

export const register = (registerData) => request.post(`${baseURL}/register`, registerData);

export const logout = async () => {
    
    request.get(`${baseURL}/logout`);

    localStorage.removeItem('user');
};