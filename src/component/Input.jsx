import React from 'react'
import { useId } from 'react';

let Input = React.forwardRef(function Input({
    label,
    className = '',
    type = 'text',
    placeholder,
    ...props
},ref){

    let id = useId();

    return (
        <div className='w-full'>
            {label && <label
            htmlFor={id}
            className=''
            >{label}</label>}

            <input
            type={type}
            placeholder={placeholder}
            className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            {...props}
            ref={ref}
            id={id}
            />
        </div>
    )
})

export default Input;