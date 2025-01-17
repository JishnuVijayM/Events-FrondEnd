import React from 'react';
import { getAllUser } from '../../../service/api/api';
import PageLayout from '../../layout/PageLayout';
import CreateUser from './CreateUser';

const UserManagement = () => {
    const columnHeaders = [
        { key: 'no', label: 'NO', size: 50 },
        { key: 'name', label: 'NAME', size: 100 },
        { key: 'role', label: 'ROLE', size: 100 },
        { key: 'mobile', label: 'MOBILE', size: 100 },
        { key: 'email', label: 'EMAIL', size: 100 },
        { key: 'updated-by', label: 'UPDATED BY', size: 100 },
        { key: 'last-login', label: 'LAST LOGIN', size: 100 },
        { key: 'last-updated', label: 'LAST UPDATED', size: 100 },
    ];

    return (
        <PageLayout
            pageType="user"
            fetchData={getAllUser}
            columnHeaders={columnHeaders}
            addComponent={<CreateUser/>}
            pathIdentifier="user-management"
        />
    );
};

export default UserManagement;