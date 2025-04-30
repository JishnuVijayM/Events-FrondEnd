import React from 'react'
import PageLayout from '../../layout/PageLayout';
import { getAllEventUsers } from '../../../service/api/api';
import CreateEventUser from './CreateEventUser';

function UserRegistation() {

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 50 },
        { key: 'name', label: 'USER NAME', size: 100 },
        { key: 'email', label: 'EMAIL', size: 60 },
        { key: 'event', label: 'EVENT NAME', size: 60 },
        { key: 'reg-date', label: 'REGISTRATION DATE', size: 60 },
        { key: 'status', label: 'PARTICIPATING STATUS', size: 50 },
        { key: 'role', label: 'ROLE', size: 50 },
    ];

    return (
        <div>
            <PageLayout
                pageType="user"
                fetchData={getAllEventUsers}
                columnHeaders={columnHeaders}
                addComponent={<CreateEventUser/>}
                pathIdentifier="event-user-management"
            />
        </div>
    )
}

export default UserRegistation