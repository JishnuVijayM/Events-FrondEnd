import React, { useState } from 'react';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { createRole } from '../../../service/api/api';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '../../../redux/tabContents/tabSlice';

const initialPermissions = {
    dashboard: [
        { module: 'dashboardManagement', read: true },
    ],
    administration: [
        { module: 'authentication', read: false },
        { module: 'roleManagement', read: false, add: false, edit: false, delete: false },
        { module: 'userManagement', read: false, add: false, edit: false, delete: false },
    ],
    jobManagement: [
        { module: 'companyManagement', read: false, add: false, edit: false, delete: false },
        { module: 'job', read: false, add: false, edit: false, delete: false },
        { module: 'candidateManagement', read: false, edit: false },
    ],
    eventManagement: [
        { module: 'eventManagement', read: false, add: false, edit: false, delete: false },
        { module: 'eventUserManagement', read: false },
    ],
    settings: [
        { module: 'staticPages', read: false, add: false, edit: false, delete: false },
        { module: 'faq', read: false, add: false, edit: false, delete: false },
        { module: 'notification', read: false, add: false, edit: false, delete: false },
    ],
};

function CreateRole() {
    const [permissions, setPermissions] = useState(initialPermissions);
    const [roleName, setRoleName] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch()

    const handleCheckboxChange = (category, moduleIndex, permission) => {
        setPermissions(prevPermissions => {
            const updatedPermissions = JSON.parse(JSON.stringify(prevPermissions));

            updatedPermissions[category][moduleIndex][permission] =
                !updatedPermissions[category][moduleIndex][permission];

            if (permission === 'read' && !updatedPermissions[category][moduleIndex][permission]) {
                ['add', 'edit', 'delete'].forEach(perm => {
                    if (updatedPermissions[category][moduleIndex][perm] !== undefined) {
                        updatedPermissions[category][moduleIndex][perm] = false;
                    }
                });
            }

            if (permission !== 'read' &&
                updatedPermissions[category][moduleIndex][permission] &&
                !updatedPermissions[category][moduleIndex].read) {
                updatedPermissions[category][moduleIndex].read = true;
            }

            return updatedPermissions;
        });
    };

    function formatModuleName(moduleName) {
        return moduleName
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim();
    }

    const PermissionModule = ({ module, category, moduleIndex }) => (
        <div className="flex bg-black h-52 w-72 rounded-md p-4 mb-4 flex-col">
            <p className="text-white font-semibold mb-4">{formatModuleName(module.module)}</p>
            <div className="flex flex-col gap-3">
                {['read', 'add', 'edit', 'delete'].map((permission) => (
                    module[permission] !== undefined && (
                        <label key={permission} className="flex items-center cursor-pointer text-white">
                            <input
                                type="checkbox"
                                checked={module[permission]}
                                onChange={() => handleCheckboxChange(category, moduleIndex, permission)}
                                className="mr-2 h-4 w-4 bg-black border-white outline-none focus:ring-0"
                                disabled={permission !== 'read' && !module.read}
                            />

                            {permission.charAt(0).toUpperCase() + permission.slice(1)}
                        </label>
                    )
                ))}
            </div>
        </div>
    );

    const allModules = Object.entries(permissions).flatMap(([category, modules]) =>
        modules.map((module, moduleIndex) => ({
            module,
            category,
            moduleIndex
        }))
    );

    const rows = Math.ceil(allModules.length / 4);


    const handleSubmit = async () => {

        try {

            if (!roleName || !description) {
                alert('must have value')
                return
            }

            if (roleName.length < 3) {
                alert('enter valid role name , min 3 ')
                return
            }

            const formData = {
                name: roleName,
                description,
                permissions
            };

            const response = await createRole(formData)

            console.log("create role res", response);


            if (response.status === 201) {
                alert('role created succesfully')
                dispatch(setActiveTab("list"))
                return
            }

            if (response.status === 400) {
                alert('Role with this name already exists')
                return
            }

        } catch (error) {
            alert('api failed ')
        }

    };




    return (
        <div className="w-full h-auto rounded-md bg-gray p-5">
            <div className="flex justify-center items-start gap-5">
                <div className="w-1/2">
                    <TextInput
                        onChange={(e) => setRoleName(e.value)}
                        label={'Role Name'}
                        placeholder={'Enter Role Name'}
                        width="w-full"
                    />
                </div>

                <div className="w-1/2">
                    <TextInput
                        onChange={(e) => setDescription(e.value)}
                        label={'Description'}
                        placeholder={'Enter Description'}
                        width="w-full"
                    />
                </div>


                <Button onClick={handleSubmit} className='mt-7' />
            </div>

            <div className="mt-8 flex flex-col gap-4">
                {[...Array(rows)].map((_, rowIndex) => (
                    <div key={rowIndex} className="flex gap-4 justify-start">
                        {allModules.slice(rowIndex * 4, (rowIndex + 1) * 4).map((item, index) => (
                            <PermissionModule
                                key={`${item.category}-${item.moduleIndex}`}
                                module={item.module}
                                category={item.category}
                                moduleIndex={item.moduleIndex}
                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CreateRole;