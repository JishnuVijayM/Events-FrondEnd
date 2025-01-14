import React, { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tab from '../../../components/Tab';
import Table from '../../../components/Table';
import Loader from '../../../components/Loader';
import CreateRole from './CreateRole';
import { getAllRole } from '../../../service/api/api';

const RoleManagement = () => {
    const { pathname } = useLocation();
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { activeTab } = useSelector((state) => state.tabContent);

    useEffect(() => {
        const fetchRoles = async () => {
            if (!pathname.includes('role-management')) return;

            setIsLoading(true);
            try {
                const { data } = await getAllRole();
                if (Array.isArray(data)) {
                    const formattedData = data.map((role, index) => ({
                        id: role._id,
                        no: index + 1,
                        'role-name': role.name,
                        description: role.description,
                        'updated-by': 'System',
                        'last-updated': new Date(role.updatedAt).toLocaleString(),
                    }));
                    setTableData(formattedData);
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

    const tabs = useMemo(() => [
        { id: "list", label: "Role List" },
        { id: "add", label: "New Role" },
    ], []);

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 50 },
        { key: 'role-name', label: 'ROLE NAME', size: 100 },
        { key: 'description', label: 'DESCRIPTION', size: 200 },
        { key: 'updated-by', label: 'UPDATED BY', size: 150 },
        { key: 'last-updated', label: 'LAST UPDATED', size: 150 },
    ];

    const tabContent = useMemo(() => ({
        list: (
            <Loader isLoading={isLoading}>
                <Table
                    data={tableData}
                    columnHeaders={columnHeaders}
                    exportFileName="Role"
                />
            </Loader>
        ),
        add: <CreateRole />,
    }), [isLoading, tableData]);

    return (
        <div>
            <Tab pageName="Role Management" tabs={tabs} tabContent={tabContent} />
        </div>
    );
};

export default RoleManagement;
