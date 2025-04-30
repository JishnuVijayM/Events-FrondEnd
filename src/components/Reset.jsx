import { faRotateLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Reset({ onClick, label, className, disabled }) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`${className} cursor-pointer border hover:bg-stone-600 border-white text-white h-10 w-20 px-3 rounded-md disabled:cursor-not-allowed`}
        >
            <div className="flex justify-center items-center">
                {label ? label : "Reset"} <FontAwesomeIcon className='text-primary ps-2 ' icon={faRotateLeft} />
            </div>
        </button>

    )
}

export default Reset