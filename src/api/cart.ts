import { authedFetch } from '@/utils';
import { BASE_URL } from '../config';

export const getCart = async (token: String) => {

    return await authedFetch({
        url: `/cart`,
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

export const addToCart = async (token: String, productId: String) => {

    return await fetch(`${BASE_URL}/cart`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                productId: productId
            }),
        })
        .then(res => res.json())
        .then(data => {

            console.log("DATA: " + JSON.stringify(data))

            if (data.message) {
                throw Error(data.message);
            }

            return data;

        })

}