import { useFormik } from 'formik';
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import Loader from '../../../components/Loader';
import TextArea from '../../../components/TextArea';
import Reset from '../../../components/Reset';
import Save from '../../../components/Save';
import { setActiveTab } from '../../../redux/tabContents/tabSlice';
import { createFaq, editFaq, viewFaq } from '../../../service/api/api';
import { Error, Success, Warning } from '../../../components/Notification';

function CreateFaq() {
    const [isLoading, setIsLoading] = useState(false);
    const { viewItem, editItem } = useSelector((state) => state.tabContent);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        question: Yup.string().min(3, "Minimum 3 character required").required("Menu Name is required"),
        answer: Yup.string().min(3, "Minimum 3 character required").required("Page Title is required"),
    });

    const form = useFormik({
        initialValues: {
            question: '',
            answer: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setIsSubmitting(true)

            try {

                let response

                if (editItem.isEdit) {
                    response = await editFaq(editItem.id, values);
                } else {
                    response = await createFaq(values);
                }

                if (response.status === 400) {
                    Warning(response.response?.data?.message || 'An error occurred!');
                    return;
                }

                if (response.status === 404) {
                    Warning(response.response?.data?.message || 'An error occurred!');
                    return;
                }

                if (response.status === 201) {
                    Success(response.data.message);
                    dispatch(setActiveTab("list"));
                    return;
                }

            } catch (error) {
                console.log('faq', error);

                Error(`Failed to ${editItem.isEdit ? 'update' : 'create'} faq`);
            } finally {
                setIsSubmitting(false)
                setIsLoading(false);
            }
        }
    });

    const getFaqData = useCallback(async () => {
        if (!viewItem?.id && !editItem?.id) {
            Warning('Unexpected error occurred');
            dispatch(setActiveTab("list"));
            return;
        }

        setIsLoading(true);
        try {
            const response = await viewFaq(viewItem.id || editItem?.id);

            if (response.status === 200) {
                const data = response.data;

                form.setValues({
                    question: data.question || '',
                    answer: data.answer || '',
                });
            } else {
                dispatch(setActiveTab("list"));
                Error(response.data?.message || 'Unexpected error occurred');
                console.error('Error fetching page:');
            }
        } catch (error) {
            dispatch(setActiveTab("list"));
            Error(error.message || 'Failed to fetch page details');
            console.error('Error fetching page:', error);
        } finally {
            setIsLoading(false);
        }
    }, [viewItem?.id, editItem?.id]);

    useEffect(() => {
        if ((viewItem?.id && (viewItem.isView || viewItem.isEdit)) || (editItem?.id && (editItem.isView || editItem.isEdit))) {
            getFaqData();
        }
    }, [viewItem, editItem]);

    return (
        <Loader isLoading={isLoading}>
            <form onSubmit={form.handleSubmit} className="w-full rounded-md bg-gray p-5 flex flex-col">
                <div className="w-full flex">
                    <TextArea
                        disabled={viewItem.isView}
                        rows={2}
                        required
                        label="Question"
                        placeholder="Enter question"
                        width="w-1/2"
                        name="question"
                        value={form.values.question}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.question && form.errors.question}
                        className={'me-1'}
                    />
                    <TextArea
                        disabled={viewItem.isView}
                        rows={2}
                        required
                        label="Answer"
                        placeholder="Enter answer"
                        width="w-1/2"
                        name="answer"
                        value={form.values.answer}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.answer && form.errors.answer}
                        className={'ms-1'}
                    />
                </div>

                <div className="flex w-full mt-4 justify-end">
                    <Reset onClick={form.handleReset} className="me-1" disabled={viewItem.isView || isSubmitting} />
                    <Save
                        type="submit"
                        label={editItem.isEdit ? "Update" : "Save"}
                        className="ms-1"
                        disabled={viewItem.isView || isSubmitting}
                    />
                </div>
            </form>
        </Loader>
    )
}

export default CreateFaq