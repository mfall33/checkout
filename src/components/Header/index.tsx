import React from "react";
import Image from "next/image";
import Link from "next/link";
import { destroyCookie } from 'nookies';
import { signOut } from "next-auth/react";

import useStore from "@/store/useStore";
import { useProductsStore } from "@/store";

const Header: React.FC = () => {

    const productStore = useStore(useProductsStore, (state => state));

    return (
        <header className="bg-lavender">
            <div className="container m-auto p-3 flex justify-between items-center">
                <Link href="/products">
                    <h1 className="font-mono text-3xl"><span className="text-yellow font">Check</span>Out</h1>
                </Link>
                <div className="cart-items">
                    <Link href="/wishlist" className="mr-4 border-r-2 border-black pr-4 flex flex-row">
                        <Image className="cart" src="/assets/heart-full.png" alt="Cart" width="25" height="25" />
                        <span className={`cart-items-amount ${!productStore ? 'text-yellow' : ''}`}>{productStore && productStore.wishList.length || 0}</span>
                    </Link>
                    <div className="flex dropdown left mr-5">
                        <Link className="flex" href={productStore && productStore.cart.products?.length ? "/cart" : ""}>
                            <Image className="cart" src="/assets/cart.png" alt="Cart" width="25" height="25" />
                            <span className={`cart-items-amount ${!productStore ? 'text-yellow' : ''}`}>{productStore && productStore.cart.products?.length || 0}</span>
                        </Link>
                        {productStore && !!productStore.cart?.products?.length &&
                            <div className="dropdown-content hide-scrollbar">

                                <h3 className="font-mono font-semibold text-lg">Cart</h3>
                                <ul>
                                    {productStore.cart?.products?.map((item, index) =>
                                        <li
                                            key={index}
                                            className={`transition-all shadow hover:shadow-lg p-3 bg-white border-black rounded cursor-pointer mt-2`}>
                                            {item.product.name} - <b>£{item.product.price} - <i>({item.quantity})</i></b>
                                        </li>
                                    )}
                                    <p className="mb-0 mt-3 font-mono">Total: <b>£{productStore.cart?.total}</b></p>
                                </ul>
                            </div>
                        }
                    </div>
                    <div className="flex dropdown left">
                        <Link className="flex" href={productStore && productStore.cart.products?.length ? "/cart" : ""}>
                            <Image className="cart" src="/assets/setting.png" alt="Cart" width="25" height="25" />
                        </Link>

                        <div className="dropdown-content hide-scrollbar">
                            <ul>
                                <li onClick={() => {
                                    localStorage.clear();
                                    destroyCookie(null, 'pid');
                                    signOut()
                                }}
                                    className={`transition-all shadow hover:shadow-lg p-3 font-semibold bg-white border-black rounded cursor-pointer mt-2`}>
                                    Log Out
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;