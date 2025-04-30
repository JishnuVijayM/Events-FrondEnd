import React, { useState } from 'react'
import Loader from '../../../components/Loader';
import Table from '../../../components/Table';

function ShortListed() {
        const [tableData, setTableData] = useState([
            {
                "id": "679b26e0b547dc193c7dccaf",
                "no": 1,
                "job title": "Software Engineer",
                "company name": "Tech Solutions Ltd",
                "recruitment event": "pending",
                "location": "New York, USA",
                "candidates applied": "pending",
                "vacancies": 3,
                "status": "Active"
            },
            {
                "id": "679c57c711caa4c2b2bf5b20",
                "no": 2,
                "job title": "Job Fair 2k25",
                "company name": "6798573317641f7002a5c718",
                "recruitment event": "pending",
                "location": "test",
                "candidates applied": "pending",
                "vacancies": 5,
                "status": "Active"
            },
        ]);
        const [isLoading, setIsLoading] = useState(false);

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 10 },
        { key: 'recruitment event', label: 'EVENT', size: 80 },
        { key: 'location', label: 'LOCATION', size: 80 },
    ];
    return (
        <div>
            <Loader isLoading={isLoading}>
                {tableData.length > 0 ? (
                    <Table
                        data={tableData}
                        columnHeaders={columnHeaders}
                        exportFileName={"short"}
                    />
                ) : (
                    <div>No data available</div>
                )}
            </Loader>
        </div>
    )
}

export default ShortListed