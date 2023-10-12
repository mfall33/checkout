"use client";

import Toast from 'react-hot-toast';
import { useParams } from 'next/navigation';
import { useSession } from "next-auth/react";
import { FC, useEffect, useState } from "react";

import Product from "@/models/Product";
import useStore from '@/store/useStore';
import { getProduct } from "@/api/products";
import store, { StoreState, useProductsStore } from '@/store';
import { Header, Button, LoadingCover, BlurImage } from "@/components";
import Image from 'next/image';


const Product: FC = () => {

    const session = useSession();
    const { id } = useParams();

    // replace this with API addToCart
    const { addToCart } = store<StoreState>((state) => state);

    const productStore = useStore(useProductsStore, (state => state));

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
                .catch(err => Toast("Failed to retrieve Product"))

        }

    }, [session.status]);

    const addToWishList = (e) => {
        e.preventDefault();
        productStore.addToWishList(product);
        const inWishList = productStore.wishList.some(prod => prod?._id === product._id)
        inWishList ? Toast(`${product.name} - removed from wishList`) : Toast(`${product.name} - added to wishList`);
    }

    return (
        <>

            <LoadingCover active={loading} />

            <Header />
            <div className="container m-auto px-3 md:px-0 py-5">
                {!loading &&
                    <div className="grid grid-cols-1 sm:grid-cols-2">
                        <div className="flex justify-center pr-0 sm:px-5 relative">
                            <BlurImage
                                src="/assets/model.webp"
                                alt="Heart"
                                width={500}
                                height={500}
                            />
                        </div>
                        <div className="flex flex-col align-items justify-center">

                            <h2 className="font-mono font-semibold text-lg mt-3 md:mt-0 inline-flex">{product.name} - (£{product.price}) - <Image
                                onClick={addToWishList}
                                className="cursor-pointer ms-3 mb-1"
                                src={`/assets/heart-${productStore.wishList.some(prod => prod?._id === product._id) ? 'full' : 'empty'}.png`}
                                alt="Heart"
                                width="25"
                                height="25"
                            /></h2>
                            <p className="font-mono my-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eos odit molestiae, temporibus ducimus at ea magni ipsa eius eum laudantium earum nostrum similique dicta inventore! Maiores aspernatur voluptates quam.</p>
                            <p className="font-mono italic font-semibold">{product.brand}</p>

                            <div className="grid grid-cols-2 gap-2 mt-3">
                                <Button
                                    title={"Buy Now"}
                                    color={"yellow"}
                                />

                                <Button
                                    title={"Add to Basket"}
                                    color={"lavender"}
                                    onClick={() => addToCart(product)}
                                />
                            </div>

                        </div>
                    </div>
                }
            </div>
        </>)
}

export default Product;