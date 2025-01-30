import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import './Date.css'

function DateInput({ className, label, value, onChange, name, width = 'w-1/3', error, startDate, endDate, required = false, disabled }) {
    return (
        <div className={`flex flex-col ${width} ${className} disabled:cursor-not-allowed focus:shadow-none disabled:text-slate-400`}>
            <label className="text-white mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative w-full  bg-black rounded disabled:cursor-not-allowed focus:shadow-none disabled:text-slate-400">
                <div className="absolute inset-y-0 left-3 flex items-center text-primary z-10">
                    <svg
                        className="w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                    </svg>
                </div>

                <DatePicker
                    disabled={disabled}
                    //  wrapperClassName='dateMain'
                    startDate={startDate}
                    endDate={endDate}
                    dateFormat="dd/MM/yyyy"
                    selected={value}
                    onChange={onChange}
                    className="p-2 pl-10 w-full  bg-black  text-white  rounded outline-none disabled:cursor-not-allowed focus:shadow-none disabled:text-slate-400"
                    placeholderText="Select date"
                    name={name}
                />
            </div>

            {error && <p className="text-red-600 font-normal text-end mt-1">{error}</p>}
        </div>
    );
}


export default DateInput;
