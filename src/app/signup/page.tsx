'use client';

import Link from "next/link";
import Toast from 'react-hot-toast';
import { FC, useState } from "react";
import { register } from "@/api/auth";
import { useRouter } from "next/navigation";

const SignUp: FC = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const router = useRouter();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await register({
                email: formData.email,
                password: formData.password
            })

            if (!response.success) {

                throw (response);

            } else {

                Toast(response.message)
                router.push('/login');

            }

        } catch (error) {
            Toast.error(error.message);
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
                            Sign Up
                        </h3>

                        <input
                            className="border-2 border p-3 mb-2"
                            type="text"
                            name="email"
                            placeholder="Username/Email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                            }
                        />
                        <input
                            className="border-2 border p-3 mb-2"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
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
