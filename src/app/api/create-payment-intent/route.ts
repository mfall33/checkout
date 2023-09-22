import { stripe } from "@/utils";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const request = await req.json();

        const { amount, customer } = request.body;

        const paymentIntent = await stripe.paymentIntents.create({
            amount: Number(amount) * 100,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never'
            },
            customer: customer,
            currency: "GBP",
        });

        return NextResponse.json({
            success: true,
            paymentIntent: paymentIntent
        }, {
            status: 200,
        });

    } catch (error: any) {

        console.log("Create payment intent: " + error.message)

        return NextResponse.json({ success: false }, {
            status: 400,
        });

    }

}