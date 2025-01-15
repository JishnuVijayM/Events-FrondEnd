import React, { useEffect, useState, useCallback } from 'react';
import TextInput from '../../../components/TextInput';
import Button from '../../../components/Button';
import { createRole, getRole } from '../../../service/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveTab } from '../../../redux/tabContents/tabSlice';
import Loader from '../../../components/Loader';
import { Error, Success, Warning } from '../../../components/Notification';

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
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        name: "",
        description: ""
    })
    const dispatch = useDispatch();
    const { viewItem } = useSelector((state) => state.tabContent);

    const getRoleData = useCallback(async () => {
        if (!viewItem?.id) {
            Warning('Role ID is required');
            return;
        }

        setIsLoading(true);
        try {
            const response = await getRole(viewItem.id);

            if (response.status === 200) {
                setRoleName(response.data?.name || '');
                setDescription(response.data?.description || '');
                setPermissions(response.data?.permissions || initialPermissions);
            } else {
                const errorMessages = {
                    400: 'Invalid role ID',
                    404: 'An error occurred',
                    500: 'Server error occurred'
                };
                dispatch(setActiveTab("list"));
                Error(response.data?.message || errorMessages[response.status] || 'Unexpected error occurred');
            }
        } catch (error) {
            dispatch(setActiveTab("list"));
            Error(error.message || 'Failed to fetch role details');
            console.error('Error fetching role:', error);
        } finally {
            setIsLoading(false);
        }
    }, [viewItem?.id]);

    useEffect(() => {
        if (viewItem?.id && (viewItem?.isView || viewItem?.isEdit)) {
            getRoleData();
        }
    }, [getRoleData, viewItem?.id, viewItem?.isView, viewItem?.isEdit]);

    const handleCheckboxChange = useCallback((category, moduleIndex, permission) => {
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
    }, []);

    const handleSubmit = useCallback(async () => {
        if (!roleName?.trim() || !description?.trim()) {
            setError({
                name: "Enter role name",
                description: "Enter description"
            })
            return;
        }

        if (roleName.trim().length < 3) {
            setError({
                ...error,
                name: "Role name must be at least 3 characters long"
            });
            return;
        }

        try {
            const formData = {
                name: roleName.trim(),
                description: description.trim(),
                permissions
            };

            const response = await createRole(formData);

            if (response.status === 201) {
                Success('Role created successfully');
                dispatch(setActiveTab("list"));
            } else {
                const errorMessages = {
                    400: 'Role already exists',
                    404: 'Resource not found',
                    500: 'An internal server error occurred'
                };
                Error(response.data?.message || errorMessages[response.status] || 'Unexpected error occurred');
            }
        } catch (error) {
            Error(error.message || 'Failed to create role');
            console.error('Error details:', error);
        }
    }, [roleName, description, permissions, dispatch]);

    const PermissionModule = React.memo(({ module, category, moduleIndex }) => (
        <div className="flex bg-black h-52 w-72 rounded-md p-4 mb-4 flex-col">
            <p className="text-white font-semibold mb-4">
                {module.module.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim()}
            </p>
            <div className="flex flex-col gap-3">
                {['read', 'add', 'edit', 'delete'].map((permission) => (
                    module[permission] !== undefined && (
                        <label key={permission} className="flex items-center cursor-pointer text-white">
                            <input
                                type="checkbox"
                                checked={module[permission]}
                                onChange={() => handleCheckboxChange(category, moduleIndex, permission)}
                                className="mr-2 h-4 w-4 bg-black  border-white outline-none focus:ring-0 disabled:cursor-not-allowed"
                                disabled={viewItem.isView || (permission !== 'read' && !module.read)}
                            />
                            {permission.charAt(0).toUpperCase() + permission.slice(1)}
                        </label>
                    )
                ))}
            </div>
        </div>
    ));

    const allModules = Object.entries(permissions).flatMap(([category, modules]) =>
        modules.map((module, moduleIndex) => ({
            module,
            category,
            moduleIndex
        }))
    );

    const rows = Math.ceil(allModules.length / 4);

    return (
        <div className="w-full h-auto rounded-md bg-gray p-5">
            <Loader isLoading={isLoading}>
                <div className="flex justify-center items-start gap-5">
                    <div className="w-1/2">
                        <TextInput
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
                            width="w-full"
                            error={error.name}
                        />
                    </div>
                    <div className="w-1/2">
                        <TextInput
                            disabled={viewItem.isView}
                            value={description}
                            onChange={(e) => {
                                setDescription(e.value); 
                                setError(prevState => ({
                                    ...prevState, 
                                    name: "",  
                                    description: ""
                                }));
                            }}
                            label={'Description'}
                            placeholder={'Enter Description'}
                            width="w-full"
                            error={error.description}
                        />
                    </div>
                    <Button
                        disabled={viewItem.isView}
                        onClick={handleSubmit}
                        className='mt-7'
                    />
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
            </Loader>
        </div>
    );
}

export default React.memo(CreateRole);