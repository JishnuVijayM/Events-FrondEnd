import React from "react";
import { MultiSelect } from "react-multi-select-component";
import './Multi.css'

function MultiSelectInput({
    className,
    label = "Options",
    onChange,
    value = [],
    disabled,
    error,
    width = "w-1/3",
    data = [],
    required = false,
    name,
}) {
    const handleOnChange = (selectedOptions) => {
        const selectedValues = selectedOptions.map(option => option.value);
        onChange(selectedValues);
    };

    const selectedOptions = value.map(val => {
        const option = data.find(item => item.value === val);
        return option ? { value: option.value, label: option.label } : null;
    }).filter(option => option !== null); 

    return (
        <div className={`flex flex-col ${width} ${className}`}>
            <label className="text-white mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <MultiSelect
                hasSelectAll={false}
                className='multiselect'
                name={name}
                options={data}
                value={selectedOptions} 
                onChange={handleOnChange} 
                labelledBy={label}
                disable={disabled}
            />
            {error && <p className="p-0 m-0 text-red-600 font-normal text-end">{error}</p>}
        </div>
    );
}

export default MultiSelectInput;
