"use client";

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import { stripe } from "@/utils";
import { getCart } from "@/api/cart";
import useStore from "@/store/useStore";
import { useProductsStore } from "@/store";
import { Button, CartItem, Header, LoadingCover, PaymentMethod } from "@/components";

const Cart: FC = () => {

    const session = useSession();
    const router = useRouter();

    const [paymentMethods, setPaymentMethods] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState<String>("");
    const [paymentIntent, setPaymentIntent] = useState<String>("");
    const [paymentProcessing, setPaymentProcessing] = useState<Boolean>(false);
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
                    setPaymentMethods(response.data);
                    setLoading(false);
                })
                .catch(err => console.log(JSON.stringify(err.messge)));


        }
    }, [session.status])

    useEffect(() => {

        // Setting up our payment intent

        if (!loading && !paymentProcessing) {

            const cookies = parseCookies();

            if ('pid' in cookies) {

                setPaymentIntent(cookies.pid);

            } else {

                const response = axios.post("/api/create-payment-intent", {
                    body: {
                        amount: productStore?.cart.total,
                        customer: session.data?.user.stripe_customer_id
                    },
                });

                response
                    .then(res => {
                        if (res.data.success) {

                            console.log("PaymentIntentId: " + JSON.stringify(res.data))

                            setPaymentIntent(res.data.paymentIntent.id);

                            // test this for max age expiry
                            setCookie(null, 'pid', res.data.paymentIntent.id, {
                                maxAge: 30 * 24 * 60 * 60,
                                path: '/',
                            });

                        }
                    })
                    .catch(err => console.log("error: " + err.message))

            }
        }

    }, [loading])

    const attemptPayment = async () => {

        setPaymentProcessing(true);

        const response = await axios.post("/api/confirm-payment-intent", {
            body: {
                paymentMethod: paymentMethod,
                paymentIntentId: paymentIntent,
            },
        });

        if (response.data.success) {

            destroyCookie(null, 'pid');
            router.push("/payment-success");

        }

        setPaymentProcessing(false);

    }

    const updatePaymentMethod = async (method: string) => {

        if (paymentIntent) {

            setPaymentMethod(method);

            const response = await axios.post("/api/update-payment-intent", {
                body: {
                    paymentMethod: paymentMethod,
                    paymentIntentId: paymentIntent,
                },
            });

            console.log("RESPONSE: " + JSON.stringify(response));

        }
    }

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
                                            onClick={() => updatePaymentMethod(method.id)}
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
                                    disabled={!paymentMethod && !paymentIntent}
                                    onClick={attemptPayment}
                                />
                            </>
                        </aside>

                    </div>
                </>
            }
        </div>
    </>);

}

export default Cart;