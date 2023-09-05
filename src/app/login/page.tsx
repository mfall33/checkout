'use client';

import Link from "next/link";
import { FC, useState, ChangeEvent } from "react";

import { Button } from "@/components";
import { useRouter } from "next/navigation";

const Login: FC = () => {

    const [email, setEmail] = useState<string>("matthewfallon33@gmail.com");
    const [password, setPassword] = useState<string>("Password123");

    const { push } = useRouter();

    const loginPress = async () => {

        try {
            
            await fetch('/api/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email: email, password: password })
            })

            console.log(33);

            push("/products");

        } catch (e) {

            alert("Error!");
        }
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

                        <h1 className='font-mono text-3xl text-center my-5'><span className='text-yellow font'>Check</span>Out</h1>

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
                            title="Login"
                            color="yellow"
                            onClick={loginPress}
                        />

                        <p className="font-mono mt-5 text-xs text-center">Not a User? <Link className="font-semibold" href="/signup">Sign Up</Link></p>

                    </div>
                </div>
            </div>
        </>)
}

export default Login;