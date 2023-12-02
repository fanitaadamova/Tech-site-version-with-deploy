import * as request from '../library/request';
import { host } from './host';

const baseURL = `${host}/users`;

export const login = (loginData) => request.post(`${baseURL}/login`, loginData);

export const register = (registerData) => request.post(`${baseURL}/register`, registerData);

export const logout = async () => {

    request.get(`${baseURL}/logout`);

    localStorage.removeItem('user');
};