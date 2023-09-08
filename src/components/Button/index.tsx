import { cn } from '@/utils';
import React from 'react';

type ButtonProps = {
    title: string,
    color: string,
    type?: string,
    onClick?: () => void,
    classes?: string
}

const Header: React.FC<ButtonProps> = ({ title, color, type = '', classes, onClick }) => {
    return (
        <button
            onClick={onClick}
            type={type}
            className={`w-full bg-${color} p-3 font-mono rounded opacity-80 hover:opacity-100 transition-all ${cn(classes)}`}>{title}</button>
    )
}

export default Header;