import React, { useState } from 'react'
import Save from '../../../components/Save'
import Reset from '../../../components/Reset'
import TextInput from '../../../components/TextInput'
import SelectInput from '../../../components/SelectInput'
import TextArea from '../../../components/TextArea'
import Loader from '../../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import DateInput from '../../../components/DateInput'


function CreateEventUser() {
    const [isLoading, setIsLoading] = useState(false);
    const { viewItem, editItem } = useSelector((state) => state.tabContent);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const [resetTrigger, setResetTrigger] = useState(false);

    const validationSchema = Yup.object({
        name: Yup.string().required("User name is required").min(2, "Must be at least 2 characters"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        event: Yup.string().required("Please select an event"),
        role: Yup.string().required("Role is required"),
        regDate: Yup.date().required("Registration date is required"),
        status: Yup.string().required("Please select participation status"),
        phone: Yup.string().required("Phone number is required"),
        linkedIn: Yup.string().url("Invalid URL").required("LinkedIn profile is required"),
        resume: Yup.mixed().required("Resume is required"),
    });

    const form = useFormik({
        initialValues: {
            name: '',
            email: '',
            event: '',
            role: '',
            regDate: null,
            status: '',
            phone: '',
            linkedIn: '',
            resume: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            console.log("Form submitted with values:", values);
        }
    });

    return (
        <Loader isLoading={isLoading}>
            <form onSubmit={form.handleSubmit} className="w-full rounded-md bg-gray p-5 flex">
                <div className="w-full">
                    <div className="flex w-full">
                        <TextInput className="me-1" label="User Name" placeholder="Enter user name" width="w-1/3" name="name" {...form.getFieldProps('name')} error={form.touched.name && form.errors.name} disabled={viewItem.isView} required />
                        <TextInput className="mx-1" label="Email" placeholder="Enter email address" width="w-1/3" name="email" {...form.getFieldProps('email')} error={form.touched.email && form.errors.email} disabled={viewItem.isView} required />
                        <SelectInput className="ms-1" label="Event" placeholder="Select event" width="w-1/3" name="event" {...form.getFieldProps('event')} error={form.touched.event && form.errors.event} disabled={viewItem.isView} required />
                    </div>

                    <div className="flex w-full mt-2">
                        <SelectInput className="me-1" label="Role" placeholder="Select role" width="w-1/3" name="role" {...form.getFieldProps('role')} error={form.touched.role && form.errors.role} disabled={viewItem.isView} required />
                        <DateInput className="mx-1" label="Registration Date" width="w-1/3" name="regDate" {...form.getFieldProps('regDate')} error={form.touched.regDate && form.errors.regDate} disabled={viewItem.isView} required />
                        <SelectInput className="ms-1" label="Participation Status" placeholder="Select status" width="w-1/3" name="status" {...form.getFieldProps('status')} error={form.touched.status && form.errors.status} disabled={viewItem.isView} required />
                    </div>

                    <div className="flex w-full mt-2">
                        <TextInput className="mr-1" label="Phone Number" placeholder="Enter phone number" width="w-1/2" name="phone" {...form.getFieldProps('phone')} error={form.touched.phone && form.errors.phone} disabled={viewItem.isView} required />
                        <TextArea className="ml-1" label="LinkedIn Profile" placeholder="LinkedIn URL" width="w-1/2" name="linkedIn" {...form.getFieldProps('linkedIn')} error={form.touched.linkedIn && form.errors.linkedIn} disabled={viewItem.isView} required />
                    </div>

                    <div className="flex w-full mt-2">
                        <TextInput className="mr-1" label="Resume" placeholder="Upload resume" width="w-1/3" name="resume" {...form.getFieldProps('resume')} error={form.touched.resume && form.errors.resume} disabled={viewItem.isView} required />
                    </div>

                    <div className="flex w-full mt-4 justify-center">
                        <Reset onClick={form.handleReset} className="me-1" disabled={viewItem.isView || isSubmitting} />
                        <Save type="submit" label={editItem.isEdit ? "Update" : "Save"} className="ms-1" disabled={viewItem.isView || isSubmitting} />
                    </div>
                </div>
            </form>
        </Loader>
    );
}

export default CreateEventUser;
