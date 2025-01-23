import React, { useState, useEffect } from 'react';

function ImageUpload({
    className,
    label,
    required = false,
    error,
    onImageSelect,
    name,
    onBlur,
    initialImage,
    disabled,
    resetTrigger
}) {
    const [selectedImage, setSelectedImage] = useState(null);
    const serverUrl = import.meta.env.VITE_API_URL;

    useEffect(() => {
        if (initialImage && typeof initialImage === 'string') {
            setSelectedImage(`${serverUrl}/${initialImage}`);
        }
    }, [initialImage]);



    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
                if (onImageSelect) {
                    onImageSelect(file);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    var imageUrl = selectedImage ? selectedImage : initialImage ? `${serverUrl}${initialImage}` : null;

    useEffect(() => {
        if (resetTrigger) {
            setSelectedImage(null);
            imageUrl = null
        }
    }, [resetTrigger]);

    return (
        <>
            <label className="text-white mb-1 ms-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div
                className={`rounded-md h-44 shadow-md mt-1 ${className} ${disabled ? 'bg-gray-300 text-gray-500 cursor-not-allowed bg-opacity-85' : 'bg-gray-50 bg-black'}`}
            >
                <label htmlFor="upload" className="flex flex-col items-center cursor-pointer">
                    {imageUrl ? (
                        <img src={imageUrl} alt="Selected" className={`h-44 w-full pb-1 object-cover rounded-md ${disabled ? 'opacity-70' : ''}`} />
                    ) : (
                        <p className={`mt-20 ${disabled ? 'text-gray-500' : ''}`}>Choose File</p>
                    )}
                </label>
                <input
                    id="upload"
                    type="file"
                    name={name}
                    className="hidden"
                    onChange={handleImageChange}
                    onBlur={onBlur}
                    disabled={disabled}
                />
            </div>
            <p className="p-0 m-0 text-red-600 font-normal text-end">{error}</p>
        </>
    );
}

export default ImageUpload;
