import { stripe } from "@/utils";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const request = await req.json();

        const { paymentIntentId } = request.body;

        console.log("paymentIntentId: " + paymentIntentId);

        const paymentIntent = await stripe.paymentIntents.retrieve(
            paymentIntentId,
        );

        return NextResponse.json({
            success: true,
            paymentIntent: paymentIntent
        }, {
            status: 200,
        });
        
    } catch (e: any) {

        console.log("Error: " + e.message)

        return NextResponse.json({ success: false }, {
            status: 400,
        });

    }

}