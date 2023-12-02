import * as request from '../library/request';
import { host } from './host';

const baseURL = `${host}/data/technique`;

export const getAll = async () => {
    const result = await request.get(baseURL);

    return Object.values(result);
};

export const getAllLaptops = async () => {
    const laptop = 'Лаптоп';
    const query = new URLSearchParams({
        where: `type="${laptop}"`,
    });

    const result = await request.get(`${baseURL}?${query}`);

    return Object.values(result);
};

export const getAllPhones = async () => {

    const phone = 'Телефон';
    const query = new URLSearchParams({
        where: `type="${phone}"`,
    });

    const result = await request.get(`${baseURL}?${query}`);

    return Object.values(result);
};

export const getAllTablets = async () => {

    const tablet = 'Таблет';
    const query = new URLSearchParams({
        where: `type="${tablet}"`,
    });

    const result = await request.get(`${baseURL}?${query}`);

    return Object.values(result);
};

export const getAllSmartWatches = async () => {
    const response = await fetch(baseURL);
    const result = await response.json();

    const data = Object.values(result).filter(product => product.type == 'Смарт часовник');
    return data;
};

export const getAllAccessories = async () => {
    const accessore = 'Аксесоар';
    const query = new URLSearchParams({
        where: `type="${accessore}"`,
    });

    const result = await request.get(`${baseURL}?${query}`);

    return Object.values(result);
};


export const getLastTree = async () => {
    const query = new URLSearchParams('offset=0&pageSize=3');
    const result = await request.get(`${baseURL}?sortBy=_createdOn%20desc&${query}`);

    return result;
};

export const getOne = async (productId) => {
    const result = await request.get(`${baseURL}/${productId}`);

    return result;
};

export const create = async (productData) => {
    const result = await request.post(baseURL, productData);

    return result;
};

export const remove = async (productId) => {
    const result = await request.remove(`${baseURL}/${productId}`);

    return result;
};

export const edit = async (productId, productData) => {
    const result = await request.put(`${baseURL}/${productId}`, productData);

    return result;
};

export const getMyOwnProducts = async (userId) => {
    const result = await request.get(`${baseURL}?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);

    return result;
};

