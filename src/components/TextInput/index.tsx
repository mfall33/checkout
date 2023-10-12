import React, { ChangeEvent } from 'react';

type ButtonProps = {
    value: string,
    placeholder?: string,
    type?: string,
    onChange?: (val: ChangeEvent<HTMLInputElement>) => void,
    name?: string,
    errors?: string[]
}

const Button: React.FC<ButtonProps> = ({ value, onChange, placeholder, name, type, errors }) => {
    return (<>
        <input
            value={value}
            onChange={onChange}
            className="border-2 border p-3 mb-2"
            type={type}
            name={name}
            placeholder={placeholder}
        />

        {errors &&
            <ul className='list-disc pl-5'>
                {errors?.map(error =>
                    <li className='text-red-600 text-xs font-mono mb-2 italic'>{error}</li>
                )}
            </ul>
        }
    </>
    )
}

export default Button;