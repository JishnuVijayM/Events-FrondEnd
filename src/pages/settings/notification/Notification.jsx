import React from 'react'
import PageLayout from '../../layout/PageLayout'
import { getAllFaq } from '../../../service/api/api'
import CreateNotification from './CreateNotification';

function Notification() {

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 50 },
        // { key: 'question', label: 'QUESTION', size: 80 },
        // { key: 'answer', label: 'ANSWER', size: 100 },
        // { key: 'updated-by', label: 'UPDATED BY', size: 60 },
        { key: 'updated-date', label: 'UPDATED DATE', size: 60 },
    ];

    return (
        <PageLayout
        pageType="Notification"
        fetchData={getAllFaq}
        columnHeaders={columnHeaders}
        addComponent={<CreateNotification />}
        pathIdentifier="notification"
    />
    )
}

export default Notification