import React from 'react'
import PageLayout from '../../layout/PageLayout';
import { getAllEvents, getAllPages } from '../../../service/api/api';
import CreateStaticPage from './CreateStaticPage';

function StaticPages() {

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 50 },
        { key: 'name', label: 'MENU NAME', size: 80 },
        { key: 'title', label: 'PAGE TITLE', size: 60 },
        { key: 'slug', label: 'PAGE SLUG', size: 60 },
        { key: 'updated-by', label: 'UPDATED BY', size: 60 },
        { key: 'updated-date', label: 'UPDATED DATE', size: 60 },
    ];


    return (
        <div>
            <PageLayout
                pageType="Page"
                fetchData={getAllPages}
                columnHeaders={columnHeaders}
                addComponent={<CreateStaticPage />}
                pathIdentifier="static-pages"
            />
        </div>
    )
}

export default StaticPages