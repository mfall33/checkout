"use client";

import { useSession } from "next-auth/react";

import { getCart } from "@/api/cart";
import useStore from "@/store/useStore";
import { useProductsStore } from "@/store";
import Toast from "react-hot-toast";
import { useEffect } from "react";

type Props = {
    children?: React.ReactNode;
};

export const CartProvider = ({ children }: Props) => {

    const session = useSession();
    const productStore = useStore(useProductsStore, (state => state));

    useEffect(() => {

        if (session.status !== 'loading') {

            const token = session.data?.user.access_token;

            if (token) {

                getCart(token)
                    .then(productStore?.setCart)
                    .catch(err => Toast.error("Failed to fetch Cart"));

            }

        }

    }, []);




    return <>{children}</>;


};