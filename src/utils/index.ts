import Stripe from 'stripe';

export const cn = (...classes: string[]) => {
    return classes.filter(Boolean).join(' ')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    maxNetworkRetries: 1,
    timeout: 1000,
    apiVersion: '2023-08-16',
});

export const stripDigits = (number: string | number, digitsToStrip: number) => {

    const numberString = number.toString();

    if (numberString.length > digitsToStrip) {
        const strippedNumberString = numberString.slice(digitsToStrip);
        return parseInt(strippedNumberString, 10);
    } else {
        return 0;
    }

}

export const padDigits = (str: string | number, padAmount: number, padVal: string) => {

    str = str.toString();

    return str.padStart(padAmount, padVal);
    
}