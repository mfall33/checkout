import { stripe } from "@/utils";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const request = await req.json();

        const { paymentIntentId, paymentMethodId } = request.body;

        const paymentIntent = await stripe.paymentIntents.update(paymentIntentId, {
            payment_method: paymentMethodId,
        });

        return NextResponse.json({
            success: true
        }, {
            status: 200,
        });

    } catch (error: any) {

        console.log("Update payment intent: " + error.message)

        return NextResponse.json({ success: false }, {
            status: 400,
        });

    }

}