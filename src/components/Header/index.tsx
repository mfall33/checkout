import React from "react";
import Image from "next/image";
import Link from "next/link";
import useStore, { StoreState } from "@/store";
import { Button } from "..";

const Header: React.FC = () => {

    const { cart, wishList } = useStore<StoreState>((state) => state);

    return (
        <header className="bg-lavender">
            <div className="container m-auto p-3 flex justify-between items-center">
                <Link href="/products">
                    <h1 className="font-mono text-3xl"><span className="text-yellow font">Check</span>Out</h1>
                </Link>
                <div className="cart-items">
                    <Link href="/wishlist" className="mr-4 border-r-2 border-black pr-4 flex flex-row">
                        <Image className="cart" src="/assets/heart-full.png" alt="Cart" width="25" height="25" />
                        <span className="cart-items-amount">{wishList.length}</span>
                    </Link>
                    <div className="flex dropdown left">
                        <Image className="cart" src="/assets/cart.png" alt="Cart" width="25" height="25" />
                        <span className="cart-items-amount">{cart.length}</span>
                        {!!cart.length &&
                            <div className="dropdown-content hide-scrollbar">
                                <ul>
                                    {cart.map((item, index) =>
                                        <li
                                            key={index}
                                            className={`transition-all shadow hover:shadow-lg p-3 bg-white border-black rounded cursor-pointer mt-2`}>
                                            {item.product.name} - <b>£{item.product.price} - <i>({item.quantity})</i></b>
                                        </li>
                                    )}
                                </ul>

                                <Button
                                    classes="mt-2"
                                    title="Proceed to CheckOut"
                                    color="yellow"
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;