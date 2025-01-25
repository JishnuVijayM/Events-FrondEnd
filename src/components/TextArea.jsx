import React from 'react';

function TextArea({ 
    className, 
    label, 
    placeholder, 
    onChange, 
    name, 
    width = 'w-1/3', 
    value, 
    disabled, 
    error, 
    required = false, 
    onBlur, 
    rows = 1, 
    resizable = true 
}) {
    return (
        <div className={`flex flex-col ${width} ${className}`}>
            <label className='text-white mb-1'>
                {label} {required && <span className='text-red-500'>*</span>}
            </label>

            <textarea
                onBlur={onBlur}
                disabled={disabled}
                value={value}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                rows={rows}
                className={`p-2 rounded outline-none bg-black text-gray-400 ${
                    resizable ? '' : 'resize-none'
                } disabled:cursor-not-allowed focus:shadow-none disabled:text-slate-400`}
            />
            <p className='text-red-600 font-normal text-end'>{error}</p>
        </div>
    );
}

export default TextArea;
