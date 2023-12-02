import * as request from '../library/request';
import { host } from './host';

const baseURL = `${host}/data/purchases`;

export const purchase = (productId, userId) => request.post(`${baseURL}`, { productId, userId });

export const getALLPuchases = () => request.get(`${baseURL}`);

export const getBuyersOfProduct = async (productId) => {
    const query = encodeURIComponent(`productId="${productId}"`);

    const result = await request.get(`${baseURL}?select=userId&where=${query}`)
        .then(res => res.map(x => x.userId));

    return result;
};


export const getBoughtProducts = async (userId) => {
    const query = new URLSearchParams({
        where: `userId="${userId}"`,
        load: `productId=productId:technique`,
    });
  
    const result = await request.get(`${baseURL}?${query}`);
 
    return result;
};