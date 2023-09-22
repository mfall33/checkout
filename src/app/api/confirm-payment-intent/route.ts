import { stripe } from "@/utils";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const request = await req.json();

        const { paymentMethod, paymentIntentId } = request.body;

        console.log("paymentMethod: " + paymentMethod);
        console.log("paymentIntentId: " + paymentIntentId);

        const paymentIntent = await stripe.paymentIntents.confirm(
            paymentIntentId,
            { payment_method: paymentMethod }
        );

        return NextResponse.json({
            success: true,
            paymentIntent: paymentIntent
        }, {
            status: 200,
        });
    } catch (e) {

        console.log("Error: " + e.message)

        return NextResponse.json({ success: false }, {
            status: 400,
        });

    }

}