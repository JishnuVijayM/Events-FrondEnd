import React from 'react'
import PageLayout from '../../layout/PageLayout'
import {  getAllNotify } from '../../../service/api/api'
import CreateNotification from './CreateNotification';

function Notification() {

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 50 },
        { key: 'title', label: 'TITLE', size: 80 },
        { key: 'event', label: 'EVENT', size: 100 },
        { key: 'date and time', label: 'DATE AND TIME', size: 60 },
        { key: 'updated-by', label: 'UPDATED BY', size: 60 },
    ];

    return (
        <PageLayout
        pageType="Notification"
        fetchData={getAllNotify}
        columnHeaders={columnHeaders}
        addComponent={<CreateNotification />}
        pathIdentifier="notification"
    />
    )
}

export default Notification