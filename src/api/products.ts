import { authedFetch } from '@/utils';
import { FETCH_CONFIG } from '../config';

export const getProducts = async (page: Number, token: String) => {

    return authedFetch({
        url: `/products?page=${page}`,
        headers: {
            'Content-Type': 'applicaton/json',
            'x-access-token': token
        }
    })
        .then((res) => res.json())
        .then(data => {

            if (data.message) {
                throw Error(data.message);
            }

            return data;

        })

}

export const getProduct = (id, token) => {

    return authedFetch({
        url: `/products/${id}`,
        nextParams: FETCH_CONFIG,
        headers: {
            'Content-Type': 'applicaton/json',
            'x-access-token': token
        }
    })
        .then((res) => res.json())
        .then(data => {

            if (data.message) {
                throw Error(data.message);
            }

            return data;

        })

}