"use client";

import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

import { getCart } from "@/api/cart";
import useStore from "@/store/useStore";
import { useProductsStore } from "@/store";
import { BlurImage, Button, Header, LoadingCover } from "@/components";
import { stripe } from "@/utils";


const Checkout: FC = () => {

    const session = useSession();
    const [paymentMethods, setPaymentMethods] = useState([]);
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
                .catch(err => alert(JSON.stringify(err.messge)));


        }
    }, [session.status])


    return (<>

        <LoadingCover active={loading} />

        <Header />
        <div className="container m-auto p-3 flex flex-wrap">
            <h1 className="text-3xl font-mono w-full">Checkout</h1>


            {!loading && productStore &&
                <>
                    <div className="grid grid-cols-12 gap-4 w-full mt-3">

                        <div className="checkout-items col-span-9">
                            {productStore?.cart?.products?.map(cartProduct => {
                                return <div className="checkout-cart-item">
                                    <div className="pr-0 md:pr-3">
                                        <BlurImage
                                            src="/assets/model.webp"
                                            alt="Model"
                                            width={130}
                                            height={130}

                                        />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold font-mono">{cartProduct.product.name}</h3>
                                        <p className="font-mono">£{cartProduct.product.price}</p>
                                        <p className="font-semibold font-mono">{cartProduct.product.brand}</p>
                                        <p className="font-mono"><b>Quantity:</b> {cartProduct.quantity}</p>
                                    </div>
                                </div>
                            })}

                            <div className="cart-payment-methods">

                                {paymentMethods.length <= 0 &&

                                    <p>Add some payment methods!</p>

                                }

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
                                    disabled={true}
                                    onClick={() => alert(33)}
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