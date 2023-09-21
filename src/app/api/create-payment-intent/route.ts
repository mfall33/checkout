import { stripe } from "@/utils";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    const request = await req.json();

    try {

        const { user, paymentMethodId } = request.body;

        console.log("paymentMethodId server: " + JSON.stringify(request));

        const attached = await stripe.paymentMethods.attach(
            paymentMethodId,
            { customer: user.stripe_customer_id }
        );

        console.log("Attached: " + JSON.stringify(attached));

        // const paymentIntent = await stripe.paymentIntents.create({
        //     amount: Number(request.amount) * 100,
        //     currency: "GBP",
        // });

        return NextResponse.json({ success: true }, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });

    } catch (error: any) {

        console.log("PAYMENT INTENT: " + error.message);

        return NextResponse.json({ success: false }, {
            status: 400,
        });
    }
}

export const dynamic = 'force-dynamic';