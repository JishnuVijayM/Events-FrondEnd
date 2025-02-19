import React, { useState } from "react";

function FileInput({
    className,
    accept = "application/pdf",
    label = "Upload",
    name,
    width = "w-1/3",
    onChange,
    disabled,
    error,
    required = false,
    onBlur,
    value
}) {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            onChange(selectedFile);
        }
        if (onChange) {
            onChange(event);
        }
    };

    return (
        <div className={`flex flex-col ${width} ${className} ` }>
            <label className='text-white mb-1'>
                {label} {required && <span className='text-red-500'>*</span>}
            </label>


            <div className={`flex items-center gap-4 rounded-md  h-10 bg-black`}>

                <input
                    type="file"
                    accept={accept}
                    name={name}
                    onChange={handleFileChange}
                    disabled={disabled}
                    className="hidden"
                    id="file-upload"
                    onBlur={onBlur}
                />

                <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-black text-gray-400 px-2 rounded-md disabled:opacity-50"
                >
                    Choose File
                </label>
                

                {file && (
                    <div className="flex items-center p-1 rounded-md">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-700">📄</span>
                            <span className="text-sm text-gray-700">{file.name}</span>
                        </div>
                    </div>
                )}
            </div>

            <p className='text-red-600 font-normal text-end'>{error}</p>

        </div>
    );
}

export default FileInput;
