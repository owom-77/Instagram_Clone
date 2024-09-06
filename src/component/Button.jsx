import React from 'react'

export default function Button({
    children,
    type = 'Submit',
    className = '',
    bgColor = 'bg-blue-500',
    textColor = 'text-white',
    ...props
}) {
    return <button className = {`px-4 py-2 rounded-lg ${className} ${bgColor} ${textColor}`}
    {...props}>{children}</button>
}
