import { stripe } from "@/utils";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {


    try {

        const request = await req.json();

        const { user, paymentMethodId } = request.body;

        await stripe.paymentMethods.attach(
            paymentMethodId,
            { customer: user.stripe_customer_id }
        );

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