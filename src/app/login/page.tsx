'use client';

import Link from "next/link";
import Toast from 'react-hot-toast';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { FC, useState, ChangeEvent } from "react";

import { Button, TextInput } from "@/components";

const Login: FC = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

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
                    throw data.error;
                }

                Toast("Logged in successfully!");
                router.push(data.url);

            })
            .catch(error => {

                setEmailErrors([]);
                setPasswordErrors([]);

                if (error instanceof Error) {

                    Toast.error(error.message);

                } else {
                    
                    const errors = JSON.parse(error);

                    setEmailErrors(errors.email);
                    setPasswordErrors(errors.password);

                }

            });

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
                            Login
                        </h3>

                        <TextInput
                            name="email"
                            value={email}
                            errors={emailErrors}
                            placeholder="Email"
                            onChange={emailChangeHandler}
                        />

                        <TextInput
                            name="password"
                            type="password"
                            value={password}
                            errors={passwordErrors}
                            placeholder="Password"
                            onChange={passwordChangeHandler}
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