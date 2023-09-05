import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Header: React.FC = () => {

    return (
        <header className='bg-lavender'>
            <div className='container m-auto p-3 flex justify-between items-center'>
                <Link href="/">
                    <h1 className='font-mono text-3xl'><span className='text-yellow font'>Check</span>Out</h1>
                </Link>
                <div className='flex relative cursor-pointer'>
                    <Image className="cart" src="/assets/cart.png" alt="Cart" width="25" height="25" />
                    <span className='cart-items-amount'>0</span>
                </div>
            </div>
        </header>
    )
}

export default Header;