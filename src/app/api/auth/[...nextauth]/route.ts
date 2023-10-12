import { login } from '@/api/auth';
import NextAuth from 'next-auth';
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: 'CheckOut',
            credentials: {
                email: { label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                const data = await login({
                    email: credentials?.email,
                    password: credentials?.password
                });

                if (!data) {
                    return null;
                }

                if (data.message) {
                    throw new Error(data.message);
                }

                if (data.errors) {
                    throw new Error(JSON.stringify(data.errors));
                }

                return data;

            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) token = user as unknown as { [key: string]: any };

            return token;
        },
        session: async ({ session, token }) => {

            session.user = { ...token }
            return session;
        },
    },
    secret: process.env.APP_SECRET_KEY,
    pages: {
        signIn: "/login",
    },
});

export { handler as GET, handler as POST }