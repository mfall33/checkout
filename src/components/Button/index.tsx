import { cn } from '@/utils';
import React from 'react';

type ButtonProps = {
    title: string,
    color: string,
    type?: string,
    onClick?: () => void,
    classes?: string,
    disabled?: Boolean
}

const Button: React.FC<ButtonProps> = ({ title, color, disabled = false, type = '', classes, onClick }) => {
    return (
        <button
            onClick={() => { !disabled && onClick && onClick() }}
            type={type}
            className={`w-full bg-${color} p-3 font-mono rounded ${disabled ? 'opacity-50' : 'opacity-80 hover:opacity-100'} transition-all ${cn(classes)}`}>{title}</button>
    )
}

export default Button;