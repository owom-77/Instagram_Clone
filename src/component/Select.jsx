import React, { useId } from 'react'

function Select({

    options,
    label,
    className = '',
    ...props

},ref) {

    let id = useId();

  return (
    <div className='w-full'>
        {label && <label
        className=''
        htmlFor={id}
        >{label}</label>}

        <select
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        id={id}
        {...props}
        ref={ref}
        >
            {options?.map((val)=>(
                <option key={val} value={val}>{val}</option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select);