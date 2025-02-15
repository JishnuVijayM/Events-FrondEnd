import React from 'react';

function TextInput({ className, accept, label, type, placeholder, onChange, name, width = 'w-1/3', value, disabled, error, required = false, onBlur }) {
    return (
        <div className={`flex flex-col ${width} ${className}`}>
            <label className='text-white mb-1'>
                {label} {required && <span className='text-red-500'>*</span>}
            </label>

            <input
                accept={accept}
                onBlur={onBlur}
                disabled={disabled}
                value={value}
                name={name}
                type={type ? type : "text"}
                placeholder={placeholder}
                onChange={onChange}
                className={` p-2 rounded outline-none bg-black text-gray-400 disabled:cursor-not-allowed focus:shadow-none disabled:text-slate-400`}
            />
            <p className='text-red-600 font-normal text-end'>{error}</p>
        </div>
    );
}

export default TextInput;
