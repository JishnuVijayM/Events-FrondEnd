import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Tab from '../../../components/Tab';
import Table from '../../../components/Table';
import Loader from '../../../components/Loader';
import CreateRole from './CreateRole';
import { getAllRole } from '../../../service/api/api';

const RoleManagement = () => {
    const location = useLocation();
    const { pathname } = location;
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { activeTab } = useSelector((state) => state.tabContent);

    const fetchRoles = useCallback(async () => {
        if (pathname.split('/')[2] !== 'role-management') return;

        setIsLoading(true);
        try {
            const res = await getAllRole();
            if (res?.data && Array.isArray(res.data)) {
                const formattedData = res.data.map((role, index) => ({
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
            console.error("Failed to fetch roles:", error);
            setTableData([]);
        } finally {
            setIsLoading(false);
        }
    }, [pathname]);

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles, activeTab]);

    const tabs = useMemo(() => [
        { id: "list", label: "Role List" },
        { id: "add", label: "New Role" },
    ], []);

    const columnHeaders = useMemo(() => [
        { key: 'no', label: 'NO', size: 50 },
        { key: 'role-name', label: 'ROLE NAME', size: 100 },
        { key: 'description', label: 'DESCRIPTION', size: 200 },
        { key: 'updated-by', label: 'UPDATED BY', size: 150 },
        { key: 'last-updated', label: 'LAST UPDATED', size: 150 },
    ], []);

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
    }), [isLoading, tableData, columnHeaders]);

    return (
        <div>
            <Tab pageName="Role Management" tabs={tabs} tabContent={tabContent} />
        </div>
    );
};

export default RoleManagement;
