import { stripe } from "@/utils";

import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {

    try {

        const request = await req.json();

        const { paymentMethodId } = request.body;

        await stripe.paymentMethods.detach(
            paymentMethodId
        );

        return NextResponse.json({ success: true }, {
            status: 200,
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });

    } catch (error: any) {

        console.log("PAYMENT METHOD DETACH: " + error.message);

        return NextResponse.json({ success: false }, {
            status: 400,
        });
    }
}

export const dynamic = 'force-dynamic';