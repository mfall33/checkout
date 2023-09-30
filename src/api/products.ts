const { SERVER_BASE_URL } = process.env;

export const getProducts = async (page: Number, token: string) => {

    return await fetch(`${SERVER_BASE_URL}/products?page=${page}`, {
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

export const getProduct = async (id: string, token: string) => {

    // Might need NEXT_PARAMS from config

    return await fetch(`${SERVER_BASE_URL}/products/${id}`, {
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