import React from 'react';

function DateInput({ className, label, value, onChange, name, width = 'w-1/3', error, required = false, disabled }) {
    return (
        <div className={`flex flex-col ${width} ${className} disabled:cursor-not-allowed focus:shadow-none disabled:text-slate-400`}>

            <label className="text-white mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <input type="date"
                name={name}
                disabled={disabled}
                value={value}
                onChange={onChange}
                id="birthday"
                className="w-full h-10 bg-black p-2 text-white rounded outline-none disabled:cursor-not-allowed focus:shadow-none disabled:text-slate-400"
                style={{ WebkitAppearance: "none", colorScheme: "dark" }}
            />

            {error && <p className="text-red-600 font-normal text-end mt-1">{error}</p>}
        </div>
    );
}


export default DateInput;
