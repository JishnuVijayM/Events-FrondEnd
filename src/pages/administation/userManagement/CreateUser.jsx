import React, { useRef, useState } from 'react';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import Save from '../../../components/Save';
import Reset from '../../../components/Reset';
import ImageUpload from '../../../components/ImageUpload';

function CreateUser() {
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);
    const [country, setCountry] = useState("");

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

    const data = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' }
    ];

    return (
        <div className="w-full rounded-md bg-gray p-5 flex">

            <div className="w-4/5">
                <div className="flex w-full">
                    <TextInput
                        label={'Name'}
                        placeholder={'Enter name'}
                        width="w-1/3"
                    />

                    <TextInput
                        className="mx-2"
                        label={'Mobile'}
                        placeholder={'Enter mobile no'}
                        width="w-1/3"
                    />

                    <SelectInput
                        label={'Role'}
                        placeholder={'Select role'}
                        width="w-1/3"
                        data={[
                            { value: 'role1', label: 'role 1' },
                            { value: 'role2', label: 'role 2' }
                        ]}
                    />
                </div>


                <div className="flex w-full mt-4">
                    <SelectInput
                        label="Country"
                        onChange={(value) => setCountry(value)}
                        value={country}
                        data={data}
                    />

                    <SelectInput
                        className="mx-2"
                        label={'State'}
                        placeholder={'Select State'}
                        width="w-1/3"
                        data={[
                            { value: 'State1', label: 'State 1' },
                            { value: 'State2', label: 'State 2' }
                        ]}
                    />

                    <SelectInput
                        label={'District'}
                        placeholder={'Select District'}
                        width="w-1/3"
                        data={[
                            { value: 'District1', label: 'District 1' },
                            { value: 'District2', label: 'District 2' }
                        ]}
                    />
                </div>

                <div className="flex w-full mt-4">
                    <TextInput
                        label={'Email'}
                        placeholder={'Enter email'}
                        width="w-full"
                    />
                </div>

                <div className="flex w-full mt-4">
                    <TextInput
                        label={'Password'}
                        placeholder={'Enter password'}
                        width="w-1/2"
                        className={'me-1'}
                    />

                    <TextInput
                        className={'ms-1'}
                        label={'Confirm Password'}
                        placeholder={'Enter confirm password'}
                        width="w-1/2"
                    />
                </div>

                <div className="flex w-full mt-4">
                    <Save />
                    <Reset />
                </div>
            </div>

            <div className="w-1/5">
                <ImageUpload className="ms-2" />
            </div>

        </div>
    );
}

export default CreateUser;
