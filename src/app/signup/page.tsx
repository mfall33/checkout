import { FC } from "react";
import { Button } from "@/components";
import Link from "next/link";

const Register: FC = () => {

    async function create(formData: any) {
        'use server'
    }

    return (
        <>
            <div className="container m-auto px-3 md:px-0 py-5 h-screen">
                <div className="flex items-center justify-center h-full">
                    <form action={create} className="flex flex-col border-2 border p-5 w-full max-w-screen-sm bg-lavender rounded">

                        <h1 className='font-mono text-3xl text-center my-5'><span className='text-yellow font'>Check</span>Out</h1>

                        <input
                            className="border-2 border p-3 mb-2"
                            type="text"
                            name="username"
                            placeholder="Username/Email"
                        />
                        <input
                            className="border-2 border p-3 mb-2"
                            type="password"
                            name="password"
                            placeholder="Password"
                        />

                        <Button
                            title="Register"
                            color="yellow"
                            type="submit"
                        />

                        <p className="font-mono mt-5 text-xs text-center">Already a User? <Link className="font-semibold" href="/login">Sign In</Link></p>

                    </form>
                </div>
            </div>
        </>)
}

export default Register;