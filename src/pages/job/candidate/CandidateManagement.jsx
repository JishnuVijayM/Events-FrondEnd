import React from 'react'
import PageLayout from '../../layout/PageLayout';
import { getAllJobs } from '../../../service/api/api';
import ShortListed from './ShortListed';
import SelectedStudent from './SelectedStudent';

function CandidateManagement() {

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 10 },
        { key: 'job title', label: 'JOB TITLE', size: 80 },
    ];

    return (
        <PageLayout
            firstTabName='Job Application'
            secondTabName={'Shortlisted'}
            thirdTabName="Selected"

            addComponent={<ShortListed/>}
            otherComponent={<SelectedStudent/>}

            pageType="candidate"
            fetchData={getAllJobs}
            columnHeaders={columnHeaders}
            pathIdentifier="candidate-management"
        />
    )
}

export default CandidateManagement;
