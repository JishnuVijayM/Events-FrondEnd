import React from 'react';

function SelectInput({ className, label = 'Option', onChange, value = '', disabled, error, width = 'w-1/3', data = [], required = false, onBlur, name }) {


    return (
        <div className={`flex flex-col ${width} ${className}`}>
            <label className='text-white mb-1'>
                {label} {required && <span className='text-red-500'>*</span>}
            </label>

            <select
                name={name}
                onBlur={onBlur}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={` p-2 pr-8 rounded outline-none bg-black text-gray-400 disabled:cursor-not-allowed focus:shadow-none disabled:text-slate-400`}
            >
                <option value="" className='text-slate-400'>
                    Choose a {(label || 'option').toLowerCase()}
                </option>
                {data?.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
            <p className="p-0 m-0 text-red-600 font-normal text-end">{error}</p>
        </div>
    );
}

export default SelectInput;  