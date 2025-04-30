import React from 'react'

function Save({ onClick, label, className, disabled, type }) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${className} cursor-pointer bg-gradient-to-b from-primary to-amber-400 text-black h-10 w-20 px-3 rounded-md hover:from-primary hover:to-primary disabled:cursor-not-allowed disabled:bg-red-300 disabled:text-slate-800`}
        >
            {label ? label : "Save"}
        </button>

    )
}

export default Save