"use client";

import { useSession } from "next-auth/react";

import { getCart } from "@/api/cart";
import useStore from "@/store/useStore";
import { useProductsStore } from "@/store";
import Toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { LoadingCover } from "@/components";

type Props = {
    children?: React.ReactNode;
};

export const CartProvider = ({ children }: Props) => {

    const session = useSession();
    const productStore = useStore(useProductsStore, (state => state));

    let [showChildren, setShowChildren] = useState<boolean>(false);

    useEffect(() => {

        if (session.status !== 'loading') {

            const token = session.data?.user.access_token;

            if (token) {

                getCart(token)
                    .then(productStore?.setCart)
                    .then(() => setShowChildren(true))
                    .catch(err => Toast.error("Failed to fetch Cart"));

            }

        }

    }, [session.status]);

    if (showChildren)
        return <>{children}</>;

    return <LoadingCover active={true} />

};