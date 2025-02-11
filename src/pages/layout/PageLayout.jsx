import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader';
import Tab from '../../components/Tab';
import Table from '../../components/Table';

const PageLayout = ({
    pageType,
    fetchData,
    columnHeaders,
    addComponent,
    pathIdentifier,
    firstTabName,
    secondTabName,
    thirdTabName,
    otherComponent
}) => {
    const { pathname } = useLocation();
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const { activeTab } = useSelector((state) => state.tabContent);

    useEffect(() => {
        const fetchPageData = async () => {
            if (!pathname.includes(pathIdentifier)) return;

            setIsLoading(true);
            try {
                const response = await fetchData();
                const responseData = response.data || response;

                setTableData(Array.isArray(responseData) ? responseData : []);
            } catch (error) {
                console.error(`Error fetching ${pageType}s:`, error.message);
                setTableData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPageData();
    }, [pathname, fetchData, pageType]);

    const tabs = useMemo(() => {
        const capitalizePageType = pageType.charAt(0).toUpperCase() + pageType.slice(1);

        return [
            {
                id: 'list',
                label: firstTabName?.trim() || `${capitalizePageType} List`
            },
            {
                id: 'add',
                label: secondTabName?.trim() || `New ${capitalizePageType}`
            },
            ...(thirdTabName?.trim() ? [{ id: 'other', label: thirdTabName }] : [])
        ];
    }, [pageType, firstTabName, secondTabName, thirdTabName]);

    const tabContent = useMemo(() => ({
        list: (
            <Loader isLoading={isLoading}>
                {tableData.length > 0 ? (
                    <Table
                        data={tableData}
                        columnHeaders={columnHeaders}
                        exportFileName={pageType.charAt(0).toUpperCase() + pageType.slice(1)}
                    />
                ) : (
                    <div>No data available</div>
                )}
            </Loader>
        ),
        add: addComponent,
        other: otherComponent,
    }), [isLoading, tableData, columnHeaders, addComponent, otherComponent, pageType]);

    return (
        <div>
            <Tab tabs={tabs} tabContent={tabContent} />
        </div>
    );
};

export default PageLayout;
