import React from 'react'
import TextInput from '../../../components/TextInput'
import Button from '../../../components/Button'

function CreateRole() {
    return (
        <div className='w-full h-screen rounded-md bg-gray'>
            <div className="flex justify-center items-center gap-5">
                <TextInput
                    label={'Role Name'}
                    placeholder={'Enter Role Name'}
                    // onChange={handleNameChange}
                    // width="w-1/4"
                />

                <TextInput
                    label={'Description'}
                    placeholder={'Enter Description'}
                    // onChange={handleNameChange}
                    // width="w-1/4"
                />
                <Button />
            </div>
        </div>
    )
}

export default CreateRole