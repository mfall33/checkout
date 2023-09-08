import Product from '@/models/Product';
import { create } from 'zustand';

export type StoreState = {
    cart: CartProduct[],
    addToCart: () => void
};

type CartProduct = {
    product: Product,
    quantity: number
}

const useStore = create((set) => ({
    cart: [],
    addToCart: (product: Product) => set((state: StoreState) => {

        let cart = state.cart;

        const existingIndex = cart.findIndex(item => item.product._id === product._id);

        console.log("IDX: " + existingIndex);

        if (existingIndex < 0) {

            const updatedCart = [
                ...cart,
                {
                    product: product,
                    quantity: 1
                }
            ]

            return { ...state, cart: updatedCart }
        } else {

            const updatedCart = [...cart];

            updatedCart[existingIndex].quantity += 1;

            return { ...state, cart: updatedCart }
        }


    }),
}));

export default useStore;