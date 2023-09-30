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

    return fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/login`,
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

export const register = async ({ email, password }: RegisterProps) => {

    return await fetch(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/register`, {
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