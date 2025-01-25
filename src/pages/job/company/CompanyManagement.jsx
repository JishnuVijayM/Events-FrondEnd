import React from 'react'
import PageLayout from '../../layout/PageLayout';
import { getAllUser } from '../../../service/api/api';
import CreateCompany from './CreateCompany';

const CompanyManagement = () => {

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
        <>
            <PageLayout
                pageType="company"
                fetchData={getAllUser}
                columnHeaders={columnHeaders}
                addComponent={<CreateCompany/>}
                pathIdentifier="company-management"
            />
        </>
    )
}

export default CompanyManagement