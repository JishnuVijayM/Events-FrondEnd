import React, { useState } from 'react';

function ImageUpload({ className }) {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <> <span className="text-gray-600 font-medium">Upload file</span>
            <div className={`rounded-md border border-white bg-gray-50 h-32 shadow-md  ${className}`}>
                <label htmlFor="upload" className="flex flex-col items-center cursor-pointer">
                    {selectedImage ? (
                        <img src={selectedImage} alt="Selected" className="h-32 w-full pb-1  object-cover rounded-md" />
                    ) : (
                        <p className='mt-12'>Choose File</p>
                    )}
                </label>
                <input id="upload" type="file" className="hidden" onChange={handleImageChange} />
            </div>
        </>
    );
}

export default ImageUpload;
