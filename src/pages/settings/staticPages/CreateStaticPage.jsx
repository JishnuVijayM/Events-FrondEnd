import React, { useCallback, useEffect, useState } from 'react';
import Loader from '../../../components/Loader';
import TextInput from '../../../components/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextArea from '../../../components/TextArea';
import Reset from '../../../components/Reset';
import Save from '../../../components/Save';
import { Success, Warning } from '../../../components/Notification';
import { setActiveTab } from '../../../redux/tabContents/tabSlice';
import { createPage, editPage, viewPage } from '../../../service/api/api';

const CreateStaticPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { viewItem, editItem } = useSelector((state) => state.tabContent);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        name: Yup.string().required("Menu Name is required"),
        title: Yup.string().required("Page Title is required"),
        pageSlug: Yup.string().required("Page Slug is required"),
        content: Yup.string().required("Page Content is required"),
        keyword: Yup.string().required("Meta Keyword is required"),
        description: Yup.string().required("Meta Description is required"),
    });

    const form = useFormik({
        initialValues: {
            name: '',
            title: '',
            pageSlug: '',
            content: '',
            keyword: '',
            description: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setIsSubmitting(true)

            try {

                let response

                if (editItem.isEdit) {
                    response = await editPage(editItem.id, values);
                } else {
                    response = await createPage(values);
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
                console.log('static', error);

                Error(`Failed to ${editItem.isEdit ? 'update' : 'create'} statuc page`);
            } finally {
                setIsSubmitting(false)
                setIsLoading(false);
            }

        }
    });

    const getPageData = useCallback(async () => {
        if (!viewItem?.id && !editItem?.id) {
            Warning('Unexpected error occurred');
            dispatch(setActiveTab("list"));
            return;
        }

        setIsLoading(true);
        try {
            const response = await viewPage(viewItem.id || editItem?.id);

            if (response.status === 200) {
                const data = response.data;

                form.setValues({
                    name: data.name || '',
                    title: data.title || '',
                    pageSlug: data.pageSlug || '',
                    content: data.content || '',
                    keyword: data.keyword || '',
                    description: data.description || '',
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
            getPageData();
        }
    }, [viewItem, editItem]);

    return (
        <Loader isLoading={isLoading}>
            <form onSubmit={form.handleSubmit} className="w-full rounded-md bg-gray p-5 flex flex-col">
                <div className="flex w-full">
                    <TextInput
                        disabled={viewItem.isView}
                        required
                        label="Menu Name"
                        placeholder="Enter name"
                        width="w-1/3"
                        name="name"
                        className={'me-1'}
                        value={form.values.name}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.name && form.errors.name}
                    />

                    <TextInput
                        disabled={viewItem.isView}
                        className={'mx-1'}
                        required
                        label="Page Title"
                        placeholder="Enter title"
                        width="w-1/3"
                        name="title"
                        value={form.values.title}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.title && form.errors.title}
                    />

                    <TextInput
                        disabled={viewItem.isView}
                        className={'ms-1'}
                        required
                        label="Page Slug"
                        placeholder="Enter page slug"
                        width="w-1/3"
                        name="pageSlug"
                        value={form.values.pageSlug}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.pageSlug && form.errors.pageSlug}
                    />
                </div>

                <div className="w-full mt-3">
                    <TextArea
                        disabled={viewItem.isView}
                        rows={3}
                        required
                        label="Page Content"
                        placeholder=""
                        width="w-full"
                        name="content"
                        value={form.values.content}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.content && form.errors.content}
                    />
                </div>

                <div className="w-full mt-3">
                    <TextArea
                        disabled={viewItem.isView}
                        required
                        label="Meta Keyword"
                        placeholder=""
                        width="w-full"
                        name="keyword"
                        value={form.values.keyword}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.keyword && form.errors.keyword}
                    />
                </div>

                <div className="w-full mt-3">
                    <TextArea
                        disabled={viewItem.isView}
                        required
                        label="Meta Description"
                        placeholder=""
                        width="w-full"
                        name="description"
                        value={form.values.description}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.description && form.errors.description}
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
    );
}

export default CreateStaticPage;