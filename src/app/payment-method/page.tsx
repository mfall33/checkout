"use client";

import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { FC, useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import cookie from 'cookie';

import { Header, LoadingCover, PaymentForm } from "@/components";

const Checkout: FC = () => {

    const session = useSession();
    const [loading, setLoading] = useState<Boolean>(true);

    const stripePromise = loadStripe(
        process.env.STRIPE_PUBLISHABLE_KEY!
    );

    useEffect(() => {

        if (session.status !== 'loading') {

            const token = session.data?.user.access_token;

            setTimeout(() => {
                setLoading(false);
            }, 1000)

        }
    }, [session.status])


    return (<>

        <LoadingCover active={loading} />

        <Header />
        <div className="container m-auto p-3 flex flex-wrap">


            {!loading &&
                <>
                    <h3 className="text-xl font-mono font-semibold w-full">Add Payment Method</h3>

                    <div className="grid grid-cols-12 gap-4 w-full mt-3">

                        <div className="checkout-items col-span-6">

                            <div className="cart-payment-methods">

                                <Elements stripe={stripePromise}>
                                    <PaymentForm />
                                </Elements>

                            </div>

                        </div>

                    </div>

                </>
            }
        </div>
    </>);

}

export default Checkout;