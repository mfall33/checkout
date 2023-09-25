'use client';

import Link from "next/link";
import { FC, useState, ChangeEvent } from "react";

import Toast from 'react-hot-toast';
import { Button } from "@/components";
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";

const Login: FC = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const router = useRouter();

    const onSubmit = () => {

        signIn('credentials', {
            redirect: false,
            email: email,
            password: password,
            callbackUrl: `${window.location.origin}/products`,
        })
            .then(data => {

                if (data.error) {
                    throw new Error(data.error);
                }

                Toast("Logged in successfully!");
                router.push(data.url);

            })
            .catch(err => Toast("Failed to login..."));

    }

    const emailChangeHandler = (val: ChangeEvent<HTMLInputElement>) => {
        setEmail(val.target.value)
    }

    const passwordChangeHandler = (val: ChangeEvent<HTMLInputElement>) => {
        setPassword(val.target.value)
    }

    return (
        <>
            <div className="container m-auto px-3 md:px-0 py-5 h-screen">
                <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col border-2 border p-5 w-full max-w-screen-sm bg-lavender rounded">

                        <h1 className='font-mono text-3xl text-center mt-5 pb-3 border-b-2 border-yellow'><span className='text-yellow font'>Check</span>Out</h1>

                        <h3 className="font-mono text-2xl font-semibold pt-3 text-center mb-5">
                            Sign In
                        </h3>

                        <input
                            value={email}
                            onChange={emailChangeHandler}
                            className="border-2 border p-3 mb-2"
                            type="text"
                            name="username"
                            placeholder="Username/Email"
                        />

                        <input
                            value={password}
                            onChange={passwordChangeHandler}
                            className="border-2 border p-3 mb-2"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />

                        <Button
                            title="Submit"
                            color="yellow"
                            onClick={onSubmit}
                        />

                        <p className="font-mono mt-5 text-xs text-center">Not a User? <Link className="font-semibold" href="/signup">Sign Up</Link></p>

                    </div>
                </div>
            </div>
        </>)
}

export default Login;