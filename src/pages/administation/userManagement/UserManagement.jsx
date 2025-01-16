import React, { useEffect, useMemo, useState } from 'react'
import Tab from '../../../components/Tab'
import Table from '../../../components/Table';
import { getAllUser } from '../../../service/api/api';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../../components/Loader';

const UserManagement = () => {
    const { pathname } = useLocation();
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { activeTab } = useSelector((state) => state.tabContent);

    useEffect(() => {
        const fetchRoles = async () => {
            if (!pathname.includes('user-management')) return;

            setIsLoading(true);
            try {
                const { data } = await getAllUser();

                if (Array.isArray(data)) {

                    setTableData(data);
                }
            } catch (error) {
                console.error("Error fetching roles:", error);
                setTableData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRoles();
    }, [pathname, activeTab]);


    const columnHeaders = [
        { key: 'no', label: 'NO', size: 50 },
        { key: 'name', label: 'NAME', size: 100 },
        { key: 'role', label: 'ROLE', size: 100 },
        { key: 'mobile', label: 'MOBILE', size: 100 },
        { key: 'email', label: 'EMAIL', size: 100 },
        { key: 'updated-by', label: 'UPDATED BY', size: 100 },
        { key: 'last-login', label: 'LAST LOGIN', size: 100 },
        { key: 'last-updated', label: 'LAST UPDATED', size: 100 },
    ];

    const tabContent = useMemo(() => ({
        list: (
            <Loader isLoading={isLoading}>
                <Table
                    data={tableData}
                    columnHeaders={columnHeaders}
                    exportFileName="User"
                />
            </Loader>
        ),
        add: <p>New User</p>,
    }), [isLoading, tableData]);

    const tabs = useMemo(() => [
        { id: "list", label: "User List" },
        { id: "add", label: "New user" },
    ], []);


    return (
        <div>
            <Tab pageName="User Management" tabs={tabs} tabContent={tabContent} />
        </div>
    )
}

export default UserManagement