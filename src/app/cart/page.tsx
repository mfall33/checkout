"use client";

import axios from "axios";
import Link from "next/link";
import Toast from 'react-hot-toast';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";
import { parseCookies, setCookie, destroyCookie } from 'nookies';

import { stripe } from "@/utils";
import { ICartProduct } from "@/models";
import useStore from "@/store/useStore";
import { useProductsStore } from "@/store";
import { getCart, removeItemFromCart } from "@/api/cart";
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

            // retrieving the cart and payment methods 

            const token = session.data?.user.access_token;

            getCart(token)
                .then(productStore?.setCart)
                .catch(err => console.log("Err: " + err))

            stripe.customers.listPaymentMethods(session.data?.user.stripe_customer_id)
                .then(response => {
                    setPaymentMethods(response.data);
                    setLoading(false);
                })
                .catch(err => Toast.error("Something went wrong..."));

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

                            setPaymentIntent(res.data.paymentIntent.id);

                            // test this for max age expiry
                            setCookie(null, 'pid', res.data.paymentIntent.id, {
                                maxAge: 30 * 24 * 60 * 60,
                                path: '/',
                            });

                        }
                    })
                    .catch(err => Toast.error("Something went wrong..."))

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
            Toast("Order placed successfully!");
            router.push("/payment-success");

        } else {

            Toast.error("Failed to process payment please try again!");
        }

        setPaymentProcessing(false);

    }

    const updatePaymentMethod = async (method: string) => {

        if (paymentIntent) {

            setPaymentMethod(method);

            await axios.post("/api/update-payment-intent", {
                body: {
                    paymentMethod: paymentMethod,
                    paymentIntentId: paymentIntent,
                },
            });

            Toast("Payment method updated!")

        }
    }

    const removeCartItem = async (cartProduct: ICartProduct) => {

        try {

            const removalConf = confirm("Are you sure you want to remove this item?");

            if (removalConf) {

                const { data } = await removeItemFromCart(session.data?.user.access_token, cartProduct.product._id);

                productStore?.setCart(data);

                Toast("Cart item removed!");

                if (data.products.length === 0) {
                    router.push("/products");
                }

            }

        } catch (e) {

            Toast.error("Failed to remove item from cart")

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
                                    onRemovePress={() => removeCartItem(cartProduct)}
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