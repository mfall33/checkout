'use client';

import Link from "next/link";
import Toast from 'react-hot-toast';
import { FC, useState } from "react";
import { register } from "@/api/auth";
import { useRouter } from "next/navigation";
import { TextInput } from "@/components";

const SignUp: FC = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await register({
                email: formData.email,
                password: formData.password
            })

            if (!response.success) {
                // alert(JSON.stringify(response))

                throw response

            } else {

                Toast(response.message)
                router.push('/login');

            }

        } catch (error) {

            setEmailErrors([]);
            setPasswordErrors([]);

            if (error instanceof Error) {

                Toast.error(error.message);

            } else {
                const errors = error.errors;

                setEmailErrors(errors.email);
                setPasswordErrors(errors.password);

            }

        }
    };

    return (
        <>
            <div className="container m-auto px-3 md:px-0 py-5 h-screen">
                <div className="flex items-center justify-center h-full">
                    <form
                        className="flex flex-col border-2 border p-5 w-full max-w-screen-sm bg-lavender rounded"
                        onSubmit={handleSubmit}
                    >
                        <h1 className='font-mono text-3xl text-center mt-5 pb-3 border-b-2 border-yellow'><span className='text-yellow font'>Check</span>Out</h1>

                        <h3 className="font-mono text-2xl font-semibold pt-3 text-center mb-5">
                            Register
                        </h3>

                        <TextInput
                            name="email"
                            value={formData.email}
                            errors={emailErrors}
                            placeholder="Email"
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />

                        <TextInput
                            name="password"
                            type="password"
                            value={formData.password}
                            errors={passwordErrors}
                            placeholder="Password"
                            onChange={(e) =>
                                setFormData({ ...formData, password: e.target.value })
                            }
                        />

                        <button
                            type="submit"
                            className={`w-full bg-yellow p-3 font-mono rounded opacity-80 transition-all`}
                        >
                            Submit
                        </button>

                        <p className="font-mono mt-5 text-xs text-center">
                            Already a User? <Link className="font-semibold" href="/login">
                                Sign In
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
};

export default SignUp;
