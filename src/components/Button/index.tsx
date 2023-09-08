import React from 'react';

type ButtonProps = {
    title: string,
    color: string,
    type?: string,
    onClick?: () => void,
}

const Header: React.FC<ButtonProps> = ({ title, color, type = '', onClick }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`w-full bg-${color} p-3 font-mono rounded opacity-80 hover:opacity-100 transition-all`}>{title}</button>
    )
}

export default Header;