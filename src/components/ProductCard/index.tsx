import { FC } from "react";
import Image from 'next/image';

import { BlurImage, Button } from "..";

interface CardProps {
    title: string,
    image: string,
    text1: string | number,
    text2?: string | number,
    quantity?: number,
    inWishList?: boolean,
    cardBtn1Text?: string,
    cardBtn1Click?: () => void,
    cardBtn1Disabled?: boolean,
    cardBtn2Text?: string,
    cardBtn2Click?: () => void,
    href?: string,
    onHeartClick?: (arg: any) => void,
    uniqueKey?: string
}

const ProductCard: FC<CardProps> = ({
    title,
    image,
    text1,
    text2,
    inWishList = false,
    cardBtn1Text,
    cardBtn1Click,
    cardBtn1Disabled = false,
    cardBtn2Text,
    cardBtn2Click,
    href = '',
    uniqueKey,
    onHeartClick
}) => {

    return (
        <div className="card">
            <div className="card-title-cont">
                <h1 className="text-xl font-mono">{title}</h1>
            </div>
            <div className="card-img-cont">
                <BlurImage
                    src={image}
                    alt="Heart"
                    width={300}
                    height={300}
                />
                <Image
                    onClick={onHeartClick}
                    className="card-like"
                    src={`/assets/Heart-${inWishList ? 'Full' : 'Empty'}.png`}
                    alt="Heart"
                    width="25"
                    height="25"
                />
            </div>
            <div className="card-price-cont">
                <p className="font-mono">{text1}</p>
                {text2 &&
                    <p className="font-mono font-light text-sm">{text2}</p>
                }
                <div className="mt-2">
                    {cardBtn1Text && cardBtn1Click &&
                        <Button
                            title={cardBtn1Text}
                            color={"yellow"}
                            onClick={cardBtn1Click}
                            disabled={cardBtn1Disabled}
                        />
                    }

                    {cardBtn2Text && cardBtn2Click &&
                        <Button
                            title={cardBtn2Text}
                            color={"lavender"}
                            onClick={cardBtn2Click}
                        />
                    }
                </div>
            </div>
        </div >
    )

}

export default ProductCard;