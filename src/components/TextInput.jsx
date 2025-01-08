import React from 'react';

function TextInput({ label, placeholder, onChange, width = 'w-1/3' }) {
    return (
        <div className={`flex flex-col ${width}`}>
            <label className='text-white mb-1'>{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                className="p-2 rounded outline-none  focus:shadow-none bg-black"
            />
        </div>
    );
}

export default TextInput;
