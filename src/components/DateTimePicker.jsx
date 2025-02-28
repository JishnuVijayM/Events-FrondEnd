import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

const DateTimePicker = ({ onChange, className, name, label = "Select Date & Time", required = false, error, disabled, width = 'w-1/3' }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleChange = (date) => {
        setSelectedDate(date);
        onChange && onChange(date);
    };

    return (
        <div className={`flex flex-col ${width} ${className} disabled:cursor-not-allowed focus:shadow-none`}>
            <label className="text-white mb-1">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <DatePicker
                placeholderText="yyyy-MM-dd hh:mm"
                name={name}
                selected={selectedDate}
                onChange={handleChange}
                showTimeSelect
                timeFormat="hh:mm aa"
                timeIntervals={10}
                dateFormat="yyyy-MM-dd hh:mm aa"
                className="w-full h-10 bg-black p-2 text-white rounded cursor-pointer outline-none disabled:cursor-not-allowed focus:shadow-none"
                disabled={disabled}
                style={{ WebkitAppearance: "none", colorScheme: "dark" }}
            />
            {error && <p className="text-red-600 font-normal text-end mt-1">{error}</p>}
            <p className="text-sm text-amber-600 mt-1">
                Selected: {selectedDate ? format(selectedDate, "yyyy-MM-dd hh:mm aa") : "None"}
            </p>
        </div>
    );
};

export default DateTimePicker;
