import React from 'react'
import PageLayout from '../../layout/PageLayout'
import { getAllFaq } from '../../../service/api/api'
import CreateFaq from './CreateFaq';

function Faq() {

    const columnHeaders = [
        { key: 'no', label: 'NO', size: 50 },
        { key: 'question', label: 'QUESTION', size: 80 },
        { key: 'answer', label: 'ANSWER', size: 100 },
        { key: 'updated-by', label: 'UPDATED BY', size: 60 },
        { key: 'updated-date', label: 'UPDATED DATE', size: 60 },
    ];

    return (
        <div>
            <PageLayout
                pageType="FAQ"
                fetchData={getAllFaq}
                columnHeaders={columnHeaders}
                addComponent={<CreateFaq />}
                pathIdentifier="faq"
            />
        </div>)
}

export default Faq