import { create } from 'zustand';
import Product from '@/models/Product';
import { persist } from 'zustand/middleware';

export type StoreState = {
    cart: CartProduct[],
    wishList: Product[],
    addToCart: (product: Product) => void,
    addToWishList: (product: Product) => void,
};

type CartProduct = {
    product: Product,
    quantity: number
}

export const useProductsStore = create(
    persist(
        (set, get) => ({
            cart: [],
            wishList: [],
            addToCart: (product: Product) => set((state: StoreState) => {

                let cart = state.cart;

                const existingIndex = cart.findIndex(item => item.product._id === product._id);

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

                    return { ...state, cart: updatedCart };

                }

            }),
            addToWishList: (product: Product) => set((state: StoreState) => {

                let wishList = state.wishList;

                const existingIndex = wishList.findIndex(item => item._id === product._id);

                if (existingIndex < 0) {
                    
                    // add to wishlist

                    const newWishList = [...wishList, product];

                    return { ...state, wishList: newWishList }

                } else {

                    // remove from wishlist
                    // [el0, el1, el2, EL_TO_REMOVE, el4, el5, el6]
                    // SPLIT THE ABOVE IN TWO ARRAYS BEFORE AND AFTER THE REMOVAL INDEX
                    // THEN MERGE: [...[el0, el1, el2], ...[el4, el5, el6]]

                    const newWishList = [...state.wishList.slice(0, existingIndex), ...state.wishList.slice(existingIndex + 1)];

                    return { ...state, wishList: newWishList };

                }

            })
        }),
        {
            // ...
            partialize: (state: StoreState) => ({ wishList: state.wishList }),
            name: 'checkout-storage'
        }
    )
);

export default useProductsStore;