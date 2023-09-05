
"use client";

import Image from "next/image";
import { FC } from "react";
// import { useParams, useRouter } from 'next/navigation';

import { IProduct } from "@/models";
import { getProduct } from "@/api/products";
import { Header, Button } from "@/components";
import useStore from "@/store";

const Product: FC = ({ id }) => {

    const accessToken = useStore((state) => state.accessToken);
    const product = getProduct(id, accessToken);

    // we need to make a provider to store the access token in and try and persist it on the server

    return (
        <>
            <Header />
            <div className="container m-auto px-3 md:px-0 py-5">
                <div className="grid grid-cols-2">
                    <div className="flex justify-center">
                        <Image className="card-like" src="/assets/model.webp" alt="Heart" width="500" height="500" />
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
            </div>
        </>)
}

export default Product;