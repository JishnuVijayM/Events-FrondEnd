import React from 'react';

function TextInput({className, label, placeholder, onChange, name, width = 'w-1/3', value, disabled,error }) {
    return (
        <div className={`flex flex-col ${width}`}>
            <label className='text-white mb-1'>{label}</label>
            <input
                disabled={disabled}
                value={value}
                name={name}
                type="text"
                placeholder={placeholder}
                onChange={(e) => onChange(e.target)}
                className={`${className} p-2 rounded outline-none bg-black text-gray-400 disabled:cursor-not-allowed focus:shadow-none disabled:text-slate-400`}
            />
            <p className='text-red-500 font-normal text-end'>{error}</p>
        </div>
    );
}

export default TextInput;
