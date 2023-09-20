import CartProduct from "./CartProduct";

export default interface Cart {
    products: CartProduct[],
    total: Number
}