"use client";

import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

import { stripe } from "@/utils";
import { getCart } from "@/api/cart";
import useStore from "@/store/useStore";
import { useProductsStore } from "@/store";
import { Button, CartItem, Header, LoadingCover, PaymentMethod } from "@/components";
import Link from "next/link";

const Checkout: FC = () => {

    const session = useSession();
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [loading, setLoading] = useState<Boolean>(true);

    const productStore = useStore(useProductsStore, (state => state));

    useEffect(() => {

        if (session.status !== 'loading') {

            const token = session.data?.user.access_token;

            getCart(token)
                .then(productStore?.setCart)
                .catch(err => console.log("Err: " + err))

            stripe.customers.listPaymentMethods(session.data?.user.stripe_customer_id)
                .then(response => {
                    console.log("Response: " + JSON.stringify(response));

                    setPaymentMethods(response.data);
                    setLoading(false);
                })
                .catch(err => console.log(JSON.stringify(err.messge)));


        }
    }, [session.status])


    return (<>

        <LoadingCover active={loading} />

        <Header />
        <div className="container m-auto py-8 flex flex-wrap">


            {!loading && productStore &&
                <>
                    <h3 className="text-xl font-mono font-semibold w-full">Your Items ({productStore?.cart?.products.length})</h3>

                    <div className="grid grid-cols-12 gap-4 w-full mt-3">

                        <div className="checkout-items col-span-9">
                            {productStore?.cart?.products?.map(cartProduct =>
                                <CartItem
                                    name={cartProduct.product.name}
                                    price={cartProduct.product.price}
                                    quantity={cartProduct.quantity}
                                    brand={cartProduct.product.brand}
                                />
                            )}

                            <div className="cart-payment-methods">

                                <div>
                                    <h3 className="text-xl font-mono mb-3 w-full"><b>Payment Methods</b> {!paymentMethod && <i>(Select a Method)</i>}</h3>

                                    {paymentMethods.length > 0 && paymentMethods.map(method =>
                                        <PaymentMethod
                                            selected={method.id === paymentMethod}
                                            brand={method.card.brand}
                                            expMonth={method.card.exp_month}
                                            expYear={method.card.exp_year}
                                            country={method.card.country}
                                            last4={method.card.last4}
                                            onClick={() => setPaymentMethod(method.id)}
                                        />
                                    )}
                                </div>

                                <Link href="/payment-method">
                                    <Button
                                        title="Add new Payment Method +"
                                        color="yellow"
                                        classes="font-semibold"
                                    />
                                </Link>

                            </div>

                        </div>


                        <aside className="checkout-cart-totals col-span-3">
                            <>
                                <h1 className="text-xl font-mono font-semibold w-full">Total</h1>
                                <p className="mt-3">Delivery: <b>Free</b></p>
                                <p className="">Total: <b>£{`${productStore.cart.total}`}</b></p>

                                <Button
                                    title="Proceed to Payment"
                                    color="yellow"
                                    classes="mt-5"
                                    disabled={!paymentMethod}
                                    // onClick={() => alert(33)}
                                />
                            </>
                        </aside>


                    </div>



                </>
            }
        </div>
    </>);

}

export default Checkout;