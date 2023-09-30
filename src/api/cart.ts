import axios from 'axios';

export const getCart = async (token: string) => {

    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/cart`,
        {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
        })
        .then((res) => res.json())
        .then(data => {

            if (data.message) {
                throw Error(data.message);
            }

            return data;

        })

}

export const addToCart = async (token: string, productId: String) => {

    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/cart`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                productId: productId
            }),
            cache: 'no-store'
        })
        .then(res => res.json())
        .then(data => {

            if (data.message) {
                throw Error(data.message);
            }

            return data;

        })

}

export const removeItemFromCart = async (token: string, productId: String) => {

    const headers: any = {};
    headers['x-access-token'] = token;

    const response = await axios.delete(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/cart`, {
        data: {
            productId: productId
        },
        headers: headers
    });

    return response;

}

export const updateQuantity = async (token: string, productId: String, quantity: number) => {

    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/cart`,
        {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({
                productId: productId,
                quantity: quantity
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