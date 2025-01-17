import React, { useRef, useState } from 'react'
import TextInput from '../../../components/TextInput';

function CreateUser() {

    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };




    return (
        <div>

            {/* <TextInput
                disabled={viewItem.isView}
                value={roleName}
                onChange={(e) => {
                    setRoleName(e.value);
                    setError(prevState => ({
                        ...prevState,
                        name: "",
                        description: ""
                    }));
                }}
                label={'Role Name'}
                placeholder={'Enter Role Name'}
                width="w-1/2"
                error={error.name}
            /> */}

        </div>
    )
}

export default CreateUser