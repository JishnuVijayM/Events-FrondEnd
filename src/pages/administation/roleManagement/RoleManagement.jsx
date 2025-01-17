import React from 'react';
import { getAllRole } from '../../../service/api/api';
import CreateRole from './CreateRole';
import PageLaout from '../../layout/PageLayout';

const RoleManagement = () => {
    const columnHeaders = [
        { key: 'no', label: 'NO', size: 20 },
        { key: 'name', label: 'ROLE NAME', size: 100 },
        { key: 'description', label: 'DESCRIPTION', size: 200 },
        { key: 'updated-by', label: 'UPDATED BY', size: 150 },
        { key: 'last-updated', label: 'LAST UPDATED', size: 150 },
    ];

    return (
        <PageLaout
            pageType="role"
            fetchData={getAllRole}
            columnHeaders={columnHeaders}
            addComponent={<CreateRole />}
            pathIdentifier="role-management"
        />
    );
};

export default RoleManagement;