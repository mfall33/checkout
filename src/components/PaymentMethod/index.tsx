import { padDigits, stripDigits } from '@/utils';
import Image from 'next/image';

type PaymentMethodProps = {
    brand: string,
    expMonth: string,
    expYear: string,
    country: string,
    last4: string,
    selected?: boolean
    onClick?: () => void
}

const PaymentMethod = ({ brand, expMonth, expYear, country, last4, selected = false, onClick }: PaymentMethodProps) => {
    return (
        <div className={`checkout-payment-method ${selected ? 'active' : ''}`} onClick={onClick}>
            <Image
                width={40}
                height={40}
                alt={'Brand'}
                className="mb-2"
                src={`/assets/icons/${brand}.png`}
            />
            <h4 className="font-mono"><b>Expires:</b> {padDigits(expMonth, 2, "0")}/{stripDigits(expYear, 2)}</h4>
            <p className="font-mono"><b>Country:</b> {(country)}</p>
            <p className="font-mono">**** **** **** {(last4)}</p>

        </div>);
}

export default PaymentMethod;