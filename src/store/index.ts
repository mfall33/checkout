import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ICart, ICartProduct, IProduct } from '@/models';

export type StoreState = {
    cart: ICart,
    wishList: IProduct[],
    setCart: (cart: ICart) => void,
    addToWishList: (product: IProduct) => void,
};

const initCartState = {
    products: [],
    total: 0
};

export const useProductsStore = create(
    persist(
        (set, get) => ({
            cart: initCartState,
            wishList: [],
            setCart: (cart: ICart) => set((state: StoreState) => {

                return { ...state, cart: cart };

            }),
            addToWishList: (product: IProduct) => set((state: StoreState) => {

                let wishList = state.wishList;

                const existingIndex = wishList.findIndex(item => item._id === product._id);

                if (existingIndex < 0) {

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
            // paritalize: only storing the selected properties below
            partialize: (state: StoreState) => ({ wishList: state.wishList }),
            name: 'checkout-storage'
        }
    )
);

export default useProductsStore;