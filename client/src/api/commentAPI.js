import * as request from '../library/request';

const baseURL = 'http://localhost:3030/data/comments';

export const getAllComments = async (productId) => {
    const query = new URLSearchParams({
        where: `productId="${productId}"`,
        load: `owner=_ownerId:users`,
    });

    const result = await request.get(`${baseURL}?${query}`);
    
    return result;
};

export const create = async (productId, text) => {
    const newComment = await request.post(baseURL, {
        productId,
        text,
    });

    return newComment;
};
