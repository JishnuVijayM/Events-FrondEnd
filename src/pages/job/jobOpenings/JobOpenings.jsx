import React from 'react'
import PageLayout from '../../layout/PageLayout';
import { getAllJobs } from '../../../service/api/api';
import CreateJob from './CreateJob';

const JobOpenings = () => {

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 10 },
        { key: 'job title', label: 'JOB TITLE', size: 80 },
        { key: 'company name', label: 'COMPANY NAME', size: 70 },
        { key: 'recruitment event', label: 'RECRUITMENT EVENT', size: 80 },
        { key: 'location', label: 'LOCATION', size: 50 },
        { key: 'candidates applied', label: 'CANDIDATES APPLIED', size: 10 },
        { key: 'vacancies', label: 'VACANCIES', size: 20 },
        { key: 'status', label: 'STATUS', size: 20 },
    ];

    return (
        <>
            <PageLayout
                pageType="job"
                fetchData={getAllJobs}
                columnHeaders={columnHeaders}
                addComponent={<CreateJob/>}
                pathIdentifier="job-management"
            />
        </>
    )
}

export default JobOpenings