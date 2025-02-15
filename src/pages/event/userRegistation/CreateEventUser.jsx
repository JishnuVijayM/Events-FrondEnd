import React, { useEffect, useState } from 'react'
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
import { createEventUser, getEventList, getRoles } from '../../../service/api/api'
import { Success, Warning } from '../../../components/Notification'
import { setActiveTab } from '../../../redux/tabContents/tabSlice'


function CreateEventUser() {
    const [isLoading, setIsLoading] = useState(false);
    const { viewItem, editItem } = useSelector((state) => state.tabContent);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const [resetTrigger, setResetTrigger] = useState(false);
    const [eventList, setEventList] = useState([])
    const [roleList, setRoleList] = useState([])
    const [userStatus, setUserStatus] = useState([
        { value: "Registered", label: "Registered" },
        { value: "Checked In", label: "Checked In" },
        { value: "Attended", label: "Attended" },
        { value: "Cancelled", label: "Cancelled" },
    ]);

    // Added qualification, gender, city, and expertise lists
    const [qualificationList, setQualificationList] = useState([
        { value: "High School", label: "High School" },
        { value: "Bachelor's", label: "Bachelor's" },
        { value: "Master's", label: "Master's" },
        { value: "PhD", label: "PhD" }
    ]);

    const [genderList, setGenderList] = useState([
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Other", label: "Other" },
        { value: "Prefer not to say", label: "Prefer not to say" }
    ]);

    const [cityList, setCityList] = useState([
        { value: "New York", label: "New York" },
        { value: "Los Angeles", label: "Los Angeles" },
        { value: "Chicago", label: "Chicago" },
        { value: "Houston", label: "Houston" }
    ]);

    const [expertiseList, setExpertiseList] = useState([
        { value: "Software Development", label: "Software Development" },
        { value: "Data Science", label: "Data Science" },
        { value: "Design", label: "Design" },
        { value: "Marketing", label: "Marketing" }
    ]);

    const validationSchema = Yup.object({
        name: Yup.string().required("User name is required").min(2, "Must be at least 2 characters"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        event: Yup.string().required("Please select an event"),
        role: Yup.string().required("Role is required"),
        qualification: Yup.string().required("Qualification is required"),
        city: Yup.string().required("City is required"),
        expertise: Yup.string().required("Area of expertise is required"),
        regDate: Yup.date().required("Registration date is required"),
        status: Yup.string().required("Please select participation status"),
        phone: Yup.string()
            .required("Phone number is required")
            .matches(/^[0-9]+$/, "Phone number must contain only digits")
            .min(10, "Phone number must be at least 10 digits")
            .max(12, "Phone number must be at most 12 digits"),
        linkedIn: Yup.string().url("Invalid URL").required("LinkedIn profile is required"),
        experience: Yup.string().required("Experience is required"),
        resume: Yup.mixed().required("Resume is required"),
    });

    const form = useFormik({
        initialValues: {
            name: '',
            email: '',
            event: '',
            role: '',
            qualification: '',
            gender: '',
            city: '',
            expertise: '',
            regDate: null,
            status: '',
            phone: '',
            linkedIn: '',
            experience: '',
            resume: null,
        },
        validationSchema,
        onSubmit: async (values) => {
            setIsLoading(true);
            setIsSubmitting(true)

            const formData = new FormData();

            Object.keys(values).forEach(key => {
                formData.append(key, values[key]);
            });

            try {
                let response

                if (editItem.isEdit) {
                    // response = await editEvent(editItem.id, formData);
                } else {
                    response = await createEventUser(formData);
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
                console.log('event', error);

                Error(`Failed to ${editItem.isEdit ? 'update' : 'create'} user`);
            } finally {
                setIsSubmitting(false)
                setIsLoading(false);
            }
        }
    });

    // Handle file input change
    const handleFileChange = (event) => {
        form.setFieldValue('resume', event.currentTarget.files[0]);
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [eventData, roleData] = await Promise.all([getEventList(), getRoles()]);

            if (eventData?.status === 200) {
                setEventList(eventData.data.data);
            }

            if (roleData?.status === 200) {
                setRoleList(roleData.data);
            } else {
                console.warn('Failed to fetch roles:', roleData);
            }

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Loader isLoading={isLoading}>
            <form onSubmit={form.handleSubmit} className="w-full rounded-md bg-gray p-5 flex">
                <div className="w-full">
                    <div className="flex w-full">
                        <TextInput className="me-1" label="User Name" placeholder="Enter user name" width="w-1/4" name="name" {...form.getFieldProps('name')} error={form.touched.name && form.errors.name} disabled={viewItem.isView} required />
                        <TextInput className="mx-1" label="Phone" placeholder="Enter phone" width="w-1/4" name="phone" {...form.getFieldProps('phone')} error={form.touched.phone && form.errors.phone} disabled={viewItem.isView} required />
                        <TextInput className="mx-1" label="Email" placeholder="Enter email address" width="w-1/4" name="email" {...form.getFieldProps('email')} error={form.touched.email && form.errors.email} disabled={viewItem.isView} required />
                        <SelectInput className="ms-1" label="Event" placeholder="event" width="w-1/4" name="event" {...form.getFieldProps('event')} error={form.touched.event && form.errors.event} disabled={viewItem.isView} required data={eventList} />
                    </div>

                    <div className="flex w-full mt-2">
                        <SelectInput className="me-1" label="Role" placeholder="role" width="w-1/4" name="role" {...form.getFieldProps('role')} error={form.touched.role && form.errors.role} disabled={viewItem.isView} required data={roleList} />
                        <SelectInput className="mx-1" label="Qualification" placeholder="qualification" width="w-1/4" name="qualification" {...form.getFieldProps('qualification')} error={form.touched.qualification && form.errors.qualification} disabled={viewItem.isView} required data={qualificationList} />
                        <SelectInput className="mx-1" label="Gender" placeholder="gender" width="w-1/4" name="gender" {...form.getFieldProps('gender')} error={form.touched.gender && form.errors.gender} disabled={viewItem.isView} data={genderList} />
                        <SelectInput className="ms-1" label="City" placeholder="city" width="w-1/4" name="city" {...form.getFieldProps('city')} error={form.touched.city && form.errors.city} disabled={viewItem.isView} required data={cityList} />
                    </div>

                    <div className="flex w-full mt-2">
                        <SelectInput className="me-1" label="Area of Expertise" placeholder="expertise" width="w-1/4" name="expertise" {...form.getFieldProps('expertise')} error={form.touched.expertise && form.errors.expertise} disabled={viewItem.isView} required data={expertiseList} />
                        <DateInput className="mx-1" label="Registration Date" width="w-1/4" name="regDate" {...form.getFieldProps('regDate')} error={form.touched.regDate && form.errors.regDate} disabled={viewItem.isView} required />
                        <SelectInput className="mx-1" label="Participation Status" placeholder="status" width="w-1/4" name="status" {...form.getFieldProps('status')} error={form.touched.status && form.errors.status} disabled={viewItem.isView} required data={userStatus} />
                        <TextInput className="ms-1" label="Experience" placeholder="Enter Experience" width="w-1/4" name="experience" {...form.getFieldProps('experience')} error={form.touched.experience && form.errors.experience} disabled={viewItem.isView} required />
                    </div>

                    <div className="flex w-full mt-2">
                        <TextInput className="mx-1" label="LinkedIn Profile" placeholder="LinkedIn URL" width="w-1/4" name="linkedIn" {...form.getFieldProps('linkedIn')} error={form.touched.linkedIn && form.errors.linkedIn} disabled={viewItem.isView} />
                        <TextInput onChange={handleFileChange} type="file" required
                            accept="application/pdf" className="mx-1" label="Resume"
                            placeholder="LinkedIn URL" width="w-1/4" name="resume" error={form.touched.resume && form.errors.resume} disabled={viewItem.isView} />
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