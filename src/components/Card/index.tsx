import React from "react";
import Image from 'next/image';
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Button } from "..";

interface CardProps {
    title: string,
    image: string | StaticImport,
    text1: string | number,
    text2?: string | number,
    quantity?: number
}

const Card: React.FC<CardProps> = ({ title, image, text1, text2 }) => {

    return (
        <div className="card">
            <div className="card-title-cont">
                <h1 className="text-xl font-mono">{title}</h1>
            </div>
            <div className="card-img-cont">
                <Image style={{ width: '100%' }} src={image} alt="Heart" width="300" height="300" />
                <Image className="card-like" src="/assets/Heart-Empty.png" alt="Heart" width="25" height="25" />
            </div>
            <div className="card-price-cont">
                <p className="font-mono">{text1}</p>
                {text2 &&
                    <p className="font-mono font-light text-sm">{text2}</p>
                }
                <div className="mt-2">
                    <Button title={"Buy Now"} color={"yellow"} />
                </div>
            </div>
        </div>
    )

}

export default Card;