import React, { useState } from 'react';

function ImageUpload({ className, label, required = false, error, onImageSelect,name,onBlur }) {
    const [selectedImage, setSelectedImage] = useState(null);

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

    return (
        <>
            <label className='text-white mb-1 ms-2'>
                {label} {required && <span className='text-red-500'>*</span>}
            </label>
            <div className={`rounded-md bg-gray-50 h-44 shadow-md mt-1 bg-black ${className}`}>
                <label htmlFor="upload" className="flex flex-col items-center cursor-pointer">
                    {selectedImage ? (
                        <img src={selectedImage} alt="Selected" className="h-44 w-full pb-1 object-cover rounded-md" />
                    ) : (
                        <p className='mt-20'>Choose File</p>
                    )}
                </label>
                <input onBlur={onBlur} id="upload" type="file" name={name} className="hidden" onChange={handleImageChange} />
            </div>
            <p className="p-0 m-0 text-red-600 font-normal text-end">{error}</p>
        </>
    );
}

export default ImageUpload;