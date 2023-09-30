const { SERVER_BASE_URL } = process.env;

type LoginProps = {
    email: string,
    password: string
}

type RegisterProps = {
    email: string,
    password: string
}

export const login = ({ email, password }: LoginProps) => {

    return fetch(`${SERVER_BASE_URL}/login`,
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

    return fetch(`${SERVER_BASE_URL}/register`, {
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