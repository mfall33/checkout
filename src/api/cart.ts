import { BASE_URL } from '../config';

export const getCart = ( token: String) => {

    return fetch(`${BASE_URL}/cart`,
        {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then(res => res.json())

}