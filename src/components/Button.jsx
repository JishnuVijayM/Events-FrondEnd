import React from 'react'

function Button({ onClick, label, className }) {
    return (
        <button
            onClick={onClick}
            className={`${className} cursor-pointer bg-gradient-to-b from-primary to-amber-400 text-black h-10 w-20 px-3 rounded-md`}
        >
            {label ? label : "Save"}
        </button>

    )
}

export default Button