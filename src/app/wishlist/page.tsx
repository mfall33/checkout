'use client';

import { Header, LoadingCover, ProductCard } from "@/components";
import Product from "@/models/Product";
import useStore, { StoreState } from "@/store";
import Link from "next/link";
import { FC, useEffect, useState } from "react";

const WishList: FC = () => {

    const [loading, setLoading] = useState<Boolean>(true);

    const { wishList, addToWishList } = useStore<StoreState>((state) => state);

    const renderProducts = () => {
        return !!wishList.length ?
            wishList
                .map((product: Product) => (
                    <ProductCard
                        id={product._id}
                        inWishList={wishList.some(prod => prod._id === product._id)}
                        onHeartClick={() => addToWishList(product)}
                        href={`/products/${product._id}`}
                        key={product._id}
                        title={product.name}
                        image="/assets/Model.webp"
                        text1={'£' + product.price}
                        text2={product.brand}
                        quantity={0}
                        cardBtn1Text="Add to Basket"
                        // cardBtn1Click={() => addToCart(product)}
                    />
                )) :
            <h1 className="font-bold font-mono">No Products. <Link className="text-yellow font-semibold" href="/products">Add Some...</Link></h1>
    };

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 1500)
    })

    return (
        <>

            <LoadingCover active={loading} />
            <Header />

            <div className="container m-auto px-3 md:px-0 py-5">

                <div className="grid grid-cols-1 gap-4 pb-3 border-b-2 border-black mb-3">

                    <div className="flex flex-row flex-wrap col-span-2 p-3">
                        <h1 className="font-mono text-2xl mb-2">Shop til you drop!</h1>
                        <p className="font-mono text-sm font-light">Indulge in a shopping extravaganza with our 'Shop til you drop!' collection on our ecommerce website. Discover a treasure trove of irresistible deals, trendy fashion, cutting-edge electronics, and more. Unleash your inner shopaholic and explore a world of limitless choices. Whether you're seeking the latest fashion statements or tech innovations, our curated selection ensures you'll find everything you desire. Get ready to shop with abandon and treat yourself to a truly unforgettable retail therapy experience!</p>
                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {!loading && renderProducts()}
                </div>

            </div>

        </>)

}

export default wishList;