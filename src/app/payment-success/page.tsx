'use client';

import Link from "next/link";
import { FC } from "react";

import { Header } from "@/components";

const PaymentSuccess: FC = () => {

    return (
        <>
            <Header />

            <div className="container m-auto px-3 md:px-0 py-5 h-screen">
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col border-2 border p-5 w-full max-w-screen-sm bg-lavender rounded">

                        <h1 className='font-mono text-3xl text-center mb-5'><span className='text-yellow font'>Check</span>Out</h1>
                        <h3 className="font-mono text-center text-xl font-semibold mb-3">Your Payment was Successful!</h3>
                        <p className="font-sans text-sm text-center mb-2">Congratulations on your successful purchase! We're thrilled that you chose us for your needs.</p>
                        <p className="font-sans text-sm text-center mb-2">At <span className='text-yellow font-semibold'>Check</span><span className="font-semibold">Out</span>, we take pride in delivering quality products and top-notch service.</p>
                        <p className="font-sans text-sm text-center mb-2">Your trust in us means the world, and we're here to ensure your satisfaction.</p>
                        <p className="font-sans text-sm text-center mb-2">As you enjoy your recent purchase, we hope it brings joy and convenience to your life.</p>
                        <p className="font-sans text-sm text-center mb-2">If you have any questions or need assistance, our team is just a message away.</p>
                        <p className="font-sans text-sm text-center mb-2">Thank you for your support, and we look forward to serving you again soon!</p>

                        <Link href="/products">
                            <p className="font-sans text-center text-sm mb-2">Back to <span className="font-mono font-semibold">Products</span></p>
                        </Link>

                    </div>
                </div>
            </div>
        </>)
}

export default PaymentSuccess;