import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import TextArea from '../../../components/TextArea';
import Reset from '../../../components/Reset';
import Save from '../../../components/Save';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import DateTimePicker from '../../../components/DateTimePicker';
import DateInput from '../../../components/DateInput';

function CreateNotification() {
    const [isLoading, setIsLoading] = useState(false);
    const { viewItem, editItem } = useSelector((state) => state.tabContent);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const validationSchema = Yup.object({
        title: Yup.string().min(3, "Minimum 3 characters required").required("Notification Title is required"),
        type: Yup.string().min(3, "Minimum 3 characters required").required("Notification Type is required"),
        event: Yup.string().required("Event Name is required"),
        target: Yup.string().required("Target Audience is required"),
        content: Yup.string().min(5, "Minimum 5 characters required").required("Content is required"),
        dateAndTime: Yup.date().nullable().required("Date and Time are required"),
        channel: Yup.string().min(3, "Minimum 3 characters required").required("Notification Channel is required"),
        expDate: Yup.date().nullable().required("Expiration Date is required"),
    });

    const form = useFormik({
        initialValues: {
            title: '',
            type: '',
            event: '',
            target: '',
            content: '',
            dateAndTime: null,
            channel: '',
            expDate: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log(values);
            // API Call Logic
        }
    });

    return (
        <Loader isLoading={isLoading}>
            <form onSubmit={form.handleSubmit} className="w-full rounded-md bg-gray p-5 flex flex-col">
                <div className="flex w-full">
                    <TextInput
                        disabled={viewItem.isView}
                        required
                        label="Notification Title"
                        placeholder="Enter title"
                        width="w-1/5"
                        name="title"
                        className={'me-1'}
                        value={form.values.title}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.title && form.errors.title}
                    />

                    <TextInput
                        disabled={viewItem.isView}
                        className={'mx-1'}
                        required
                        label="Notification Type"
                        placeholder="Enter type"
                        width="w-2/5"
                        name="type"
                        value={form.values.type}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.type && form.errors.type}
                    />

                    <SelectInput
                        disabled={viewItem.isView}
                        required
                        label="Event Name"
                        placeholder="event"
                        width="w-2/5"
                        name="event"
                        value={form.values.event}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.event && form.errors.event}
                        data={[{ label: "t1", value: "t1" }, { label: "t2", value: "t2" }]}
                    />
                </div>

                <div className="w-full flex mt-2">
                    <SelectInput
                        disabled={viewItem.isView}
                        required
                        label="Target Audience"
                        placeholder="target"
                        width="w-1/5"
                        name="target"
                        value={form.values.target}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.target && form.errors.target}
                        data={[{ label: "t1", value: "t1" }, { label: "t2", value: "t2" }]}
                    />
                    <TextArea
                        disabled={viewItem.isView}
                        required
                        label="Content"
                        placeholder="Enter content"
                        width="w-4/5"
                        name="content"
                        value={form.values.content}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.content && form.errors.content}
                        className={'ms-1'}
                    />
                </div>

                <div className="w-full flex mt-2">
                    <DateTimePicker
                        error={form.touched.dateAndTime && form.errors.dateAndTime}
                        width="w-1/2"
                        onChange={(date) => form.setFieldValue('dateAndTime', date)}
                        className={'me-1'}
                        name={'dateAndTime'}
                    />

                    <TextInput
                        disabled={viewItem.isView}
                        required
                        label="Notification Channel"
                        placeholder="Enter channel"
                        width="w-1/2"
                        name="channel"
                        className={'ms-1'}
                        value={form.values.channel}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.channel && form.errors.channel}
                    />
                </div>

                <div className="w-full flex mt-2">
                    <DateInput
                        disabled={viewItem.isView}
                        onChange={(e) => form.setFieldValue('expDate', e.target.value)}
                        width="w-1/5"
                        value={form.values.expDate || ''}
                        required
                        label="Expiration Date"
                        name="expDate"
                        error={form.touched.expDate && form.errors.expDate}
                        className="me-1"
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

export default CreateNotification;
