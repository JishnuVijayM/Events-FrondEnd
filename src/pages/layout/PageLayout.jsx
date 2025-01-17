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
    pathIdentifier
}) => {
    const { pathname } = useLocation();
    const [tableData, setTableData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { activeTab } = useSelector((state) => state.tabContent);

    useEffect(() => {
        const fetchPageData = async () => {
            // Remove the pathname check or make it less strict if needed
            if (!pathname.includes(pathIdentifier)) {
                return;
            }

            setIsLoading(true);
            try {
                console.log('Fetching data for:', pageType);
                const response = await fetchData();
                console.log('API Response:', response);

                const responseData = response.data || response;

                if (Array.isArray(responseData)) {
                    console.log('Setting table data:', responseData);
                    setTableData(responseData);
                } else {
                    console.error('Response data is not an array:', responseData);
                    setTableData([]);
                }
            } catch (error) {
                console.error(`Error fetching ${pageType}s:`, error);
                console.error('Error details:', {
                    message: error.message,
                    response: error.response,
                    stack: error.stack
                });
                setTableData([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPageData();
    }, [pathname, activeTab, fetchData, pageType]);

    const tabs = useMemo(() => [
        { id: "list", label: `${pageType.charAt(0).toUpperCase() + pageType.slice(1)} List` },
        { id: "add", label: `New ${pageType.charAt(0).toUpperCase() + pageType.slice(1)}` },
    ], [pageType]);

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
    }), [isLoading, tableData, columnHeaders, addComponent, pageType]);

    return (
        <div>
            <Tab tabs={tabs} tabContent={tabContent} />
        </div>
    );
};

export default PageLayout;