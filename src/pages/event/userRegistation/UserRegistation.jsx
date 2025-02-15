import React from 'react'
import PageLayout from '../../layout/PageLayout';
import { getAllEvents } from '../../../service/api/api';
import CreateEventUser from './CreateEventUser';

function UserRegistation() {

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 50 },
        // { key: 'name', label: 'EVENT NAME', size: 100 },
        // { key: 'type', label: 'EVENT TYPE', size: 60 },
        // { key: 'location', label: 'LOCATION', size: 60 },
        // { key: 'start-date', label: 'START DATE', size: 60 },
        // { key: 'end-date', label: 'END DATE', size: 60 },
        { key: 'participants', label: 'COMPANIES PARTICIPATING', size: 50 },
        { key: 'status', label: 'STATUS', size: 50 },
    ];

    return (
        <div>
            <PageLayout
                pageType="user"
                fetchData={getAllEvents}
                columnHeaders={columnHeaders}
                addComponent={<CreateEventUser/>}
                pathIdentifier="event-user-management"
            />
        </div>
    )
}

export default UserRegistation