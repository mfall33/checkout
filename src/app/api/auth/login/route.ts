import { serialize } from "cookie";
import { NextResponse, NextRequest } from "next/server";
import { login } from "@/api/auth";
import { COOKIE_NAME } from "@/constants";


// To handle a GET request to /api
export async function POST(request: NextRequest) {

    const data = await request.json();

    const { email, password } = data;

    try {

        const data = await login({ email, password });

        const cookieObj = {
            accessToken: data.access_token,
        }

        const serialized = serialize(
            COOKIE_NAME,
            JSON.stringify(cookieObj),
            {
                httpOnly: true,
                secure: process.env.NODE_ENV !== "development",
                maxAge: 60 * 60 * 24 * 30,
                sameSite: "strict",
                path: "/",
            }
        )

        const response = {
            message: 'Authenticated!'
        }

        return NextResponse.json({ message: response }, {
            status: 200,
            headers: {
                'Set-Cookie': serialized
            }
        });

    } catch (e) {

        return NextResponse.json({ message: 'Unauthorized!' }, { status: 401 })

    }


}