import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {

    // verify if the JWT is valid and if it's not then redirect to login
    try {

        const token = await getToken({
            req: req,
            secret: process.env.APP_SECRET_KEY
        });

        const secret = new TextEncoder().encode(
            process.env.APP_SECRET_KEY
        );

        await jwtVerify(token.access_token, secret);

    } catch (e) {

        return NextResponse.redirect((`${process.env.APP_BASE_URL}/login`));

    }

}

export const config = {
    matcher: ['/products/:path*', '/cart'],
};