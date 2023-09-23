import { BlurImage } from "..";

type PaymentMethodProps = {
    name: string,
    price: number,
    quantity: number,
    brand: string,
    onRemovePress?: () => void
}

const CartItem = ({
    name, price, quantity, brand, onRemovePress
}: PaymentMethodProps) => {
    return (<div className="checkout-cart-item">
        <div className="pr-0 md:pr-3">
            <BlurImage
                src="/assets/model.webp"
                alt="Model"
                width={130}
                height={130}

            />
        </div>
        <div className="flex flex-col justify-center">
            <h3 className="text-lg font-semibold font-mono">{name}</h3>
            <p className="font-mono">£{price}</p>
            <p className="font-mono">{brand}</p>
            <p className="font-mono"><b>Quantity:</b> {quantity}</p>
        </div>
        <div className="checkout-cart-remove-item" onClick={onRemovePress}>&#x2715;</div>
    </div>);
}

export default CartItem;