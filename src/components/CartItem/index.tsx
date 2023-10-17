import { BlurImage, Button } from "..";

type CartItemProps = {
    id: string,
    name: string,
    price: number,
    quantity: number,
    brand: string,
    onRemovePress?: () => void,
    onQuantityChange: (id: string, quantity: number) => void
}

const CartItem = ({
    id, name, price, quantity, brand, onRemovePress, onQuantityChange
}: CartItemProps) => {
    return (<div className="checkout-cart-item">
        <div className="mr-2 sm:mr-0 pr-0 md:pr-3">
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
            <label className="font-mono"><b>Quantity:</b></label>
            <div className="flex mt-2">
                <Button title="-" classes="mr-2 py-1" color="yellow" onClick={() => onQuantityChange(id, quantity - 1)} />
                <input
                    name="quantity"
                    type="number"
                    className="checkout-cart-quantity"
                    value={quantity}
                ></input>
                <Button title="+" classes="ml-2 py-1" color="yellow" onClick={() => onQuantityChange(id, quantity + 1)} />
            </div>
        </div>
        <div className="checkout-cart-remove-item" onClick={onRemovePress}>&#x2715;</div>
    </div>);
}

export default CartItem;