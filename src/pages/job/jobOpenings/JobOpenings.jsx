import React from 'react'
import PageLayout from '../../layout/PageLayout';
import { getAllCompanies } from '../../../service/api/api';
import CreateJob from './CreateJob';

const JobOpenings = () => {

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 50 },
        { key: 'company name', label: 'COMPANY NAME', size: 100 },
        { key: 'industry', label: 'INDUSTRY', size: 70 },
        { key: 'recruitment event', label: 'RECRUITMENT EVENT', size: 100 },
        { key: 'job position', label: 'JOB POSITION', size: 100 },
        { key: 'candidates applied', label: 'CANDIDATES APPLIED', size: 10 },
        { key: 'event date', label: 'EVENT DATE', size: 100 },
        { key: 'status', label: 'STATUS', size: 50 },
    ];


    return (
        <>
            <PageLayout
                pageType="job"
                fetchData={getAllCompanies}
                columnHeaders={columnHeaders}
                addComponent={<CreateJob/>}
                pathIdentifier="job-management"
            />
        </>
    )
}

export default JobOpenings