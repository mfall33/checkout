
"use client";

import { FC, useEffect, useState } from "react";
import { useParams } from 'next/navigation';

import { getProduct } from "@/api/products";
import { Header, Button, LoadingCover, BlurImage } from "@/components";
import { useSession } from "next-auth/react";
import Product from "@/models/Product";

const Product: FC = () => {

    const session = useSession();
    const { id } = useParams();

    const [product, setProduct] = useState<Product>({});
    const [loading, setLoading] = useState<Boolean>(true);

    useEffect(() => {

        // pull in product if session status isn't 'loading'
        if (session.status !== 'loading') {

            getProduct(id, session.data?.user.access_token)
                .then(data => {

                    setProduct(data);
                    setTimeout(function () {
                        setLoading(false)
                    }, 1000)

                })
                .catch(err => alert(err))
                // come back and handle this properly with an error message

        }

    }, [session.status])

    return (
        <>

            <LoadingCover active={loading} />

            <Header />
            <div className="container m-auto px-3 md:px-0 py-5">
                {!loading &&
                    <div className="grid grid-cols-2">
                        <div className="flex justify-center">
                            <BlurImage
                                src="/assets/model.webp"
                                alt="Heart"
                                width={500}
                                height={500}
                            />
                        </div>
                        <div className="flex flex-col align-items justify-center">

                            <h2 className="font-mono font-semibold text-lg">{product.name} - (£{product.price})</h2>
                            <p className="font-mono my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eos odit molestiae, temporibus ducimus at ea magni ipsa eius eum laudantium earum nostrum similique dicta inventore! Maiores aspernatur voluptates quam.</p>
                            <p className="font-mono italic font-semibold">{product.brand}</p>

                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <Button title={"Buy Now"} color={"yellow"} />
                                <Button title={"Add to Basket"} color={"lavender"} />
                            </div>

                        </div>
                    </div>
                }
            </div>
        </>)
}

export default Product;