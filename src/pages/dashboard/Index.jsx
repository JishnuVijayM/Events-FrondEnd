import React from 'react';
import Tab from '../../components/Tab';

function Dashboard() {

    return (
        <div className='h-auto'>
            {/* <Table
                data={data}
                columnHeaders={columnHeaders}
                // onEdit={handleEdit}
                // onDelete={handleDelete}
                exportFileName="Role"
            /> */}

            <Tab/>
        </div>
    );
}

export default Dashboard;
