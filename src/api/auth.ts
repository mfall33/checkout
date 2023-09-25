import { BASE_URL } from '../config';

type LoginProps = {
    email: string,
    password: string
}

type RegisterProps = {
    email: string,
    password: string
}

export const login = ({ email, password }: LoginProps) => {

    return fetch(`${BASE_URL}/login`,
        {
            cache: 'no-cache',
            credentials: 'include',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            }),
        })
        .then(res => res.json())

}

export const register = ({ email, password }: RegisterProps) => {

    return fetch(`${BASE_URL}/register`, {
        cache: 'no-store',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
        .then((res) => res.json())

}