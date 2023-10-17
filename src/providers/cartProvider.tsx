"use client";

import Toast from "react-hot-toast";
import { destroyCookie } from "nookies";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";

import { getCart } from "@/api/cart";
import useStore from "@/store/useStore";
import { useProductsStore } from "@/store";
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

            // alert(33)

            const token = session.data?.user.access_token;

            if (token) {

                getCart(token)
                    .then(productStore?.setCart)
                    .then(() => {
                        alert(33);
                        setShowChildren(true);
                    })
                    .catch((err) => {
                        alert(33)
                        if (err.message.includes('Unauthorized')) {
                            localStorage.clear();
                            destroyCookie(null, 'pid');
                            signOut();
                            return;
                        }

                        Toast("Failed to fetch Cart!");

                    })

            } else {
                setShowChildren(true);
            }

        }

    }, [session.status]);

    if (showChildren)
        return <>{children}</>;

    return <LoadingCover active={true} />

};