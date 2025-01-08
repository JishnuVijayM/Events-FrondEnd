import React, { useEffect, useState } from 'react'
import Tab from '../../../components/Tab'
import Table from '../../../components/Table'
import { getAllRole } from '../../../service/api/api'
import { useLocation } from 'react-router-dom'
import Loader from '../../../components/Loader'
import CreateRole from './CreateRole'

const RoleManagement = () => {
    const location = useLocation()
    const [tableData, setTableData] = useState([])
    const [isLoading, setIsLoading] = useState(false);

    const fetchRoles = async () => {
        setIsLoading(true)
        try {
            const res = await getAllRole()

            if (res?.data && Array.isArray(res?.data)) {
                const formattedData = res?.data.map((role, index) => ({
                    id: role._id,
                    no: index + 1,
                    'role-name': role.name,
                    description: role.description,
                    'updated-by': 'System',
                    'last-updated': new Date(role.updatedAt).toLocaleString()
                }))
                setTableData(formattedData)
            }
        } catch (error) {
            console.log("all role error", error)
            setTableData([])
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const pathname = location.pathname
        const secondSegment = pathname.split('/')[2]

        if (secondSegment === 'role-management') {
            fetchRoles()
        }
    }, [location])

    const tabs = [
        { id: "list", label: "Role List" },
        { id: "role", label: "New Role" },
    ]

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 50 },
        { key: 'role-name', label: 'ROLE NAME', size: 100 },
        { key: 'description', label: 'DESCRIPTION', size: 200 },
        { key: 'updated-by', label: 'UPDATED BY', size: 150 },
        { key: 'last-updated', label: 'LAST UPDATED', size: 150 },
    ]

    const tabContent = {
        list: (
            <>
                <Loader isLoading={isLoading}>
                    <Table
                        data={tableData}
                        columnHeaders={columnHeaders}
                        exportFileName="Role"
                    />
                </Loader>
            </>

        ),
        role: <CreateRole/>,
    }

    return (
        <div>
            <Tab pageName="Role Management" tabs={tabs} tabContent={tabContent} />
        </div>
    )
}

export default RoleManagement