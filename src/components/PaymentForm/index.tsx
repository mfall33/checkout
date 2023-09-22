"use client";

import React from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import { Button } from "..";
import { useRouter } from "next/navigation";

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const session = useSession();
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault();
        const cardElement = elements?.getElement("card");

        try {

            if (!stripe || !cardElement || !session) return null;

            const { paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
                billing_details: {
                    name: 'Testing Checkout'
                }
            })

            const response = await axios.post("/api/attach-payment-method", {
                body: {
                    paymentMethodId: paymentMethod.id,
                    user: session.data?.user
                },
            });

            if(response.data.success) {
                router.push('/cart');
            }

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={onSubmit} className="mt-8">
            <label className="block mb-2 font-semibold text-sm font-mono">Please enter your card details:</label>
            <div className="border-2 rounded p-3 border-lavender">
                <CardElement options={{
                    style: {
                        base: {
                            color: "#424770",
                            letterSpacing: "0.025em",
                            fontFamily: "monospace, Source Code Pro, SFUIDisplay",
                            "::placeholder": {
                                color: "#000"
                            }
                        },
                        invalid: {
                            color: "#9e2146"
                        },

                    }
                }} />
            </div>
            <Button
                title="Submit"
                color="yellow"
                type="submit"
                classes="font-semibold mt-3"
            />
        </form>
    );
}

export default PaymentForm;