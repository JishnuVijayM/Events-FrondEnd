import React, { useCallback, useEffect, useState } from 'react'
import Save from '../../../components/Save'
import Reset from '../../../components/Reset'
import TextInput from '../../../components/TextInput'
import SelectInput from '../../../components/SelectInput'
import Loader from '../../../components/Loader'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup';
import { useFormik } from 'formik'
import DateInput from '../../../components/DateInput'
import { createEventUser, editEventUser, getCity, getEventList, getRoles, viewEventUser } from '../../../service/api/api'
import { Success, Warning } from '../../../components/Notification'
import { setActiveTab } from '../../../redux/tabContents/tabSlice'


function CreateEventUser() {
    const [isLoading, setIsLoading] = useState(false);
    const { viewItem, editItem } = useSelector((state) => state.tabContent);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const [eventList, setEventList] = useState([])
    const [roleList, setRoleList] = useState([])
    const [userStatus, setUserStatus] = useState([
        { value: "Registered", label: "Registered" },
        { value: "Checked In", label: "Checked In" },
        { value: "Attended", label: "Attended" },
        { value: "Cancelled", label: "Cancelled" },
    ]);
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
    const [cityList, setCityList] = useState([]);
    const [expertiseList, setExpertiseList] = useState([
        { value: "Software Development", label: "Software Development" },
        { value: "Data Science", label: "Data Science" },
        { value: "Design", label: "Design" },
        { value: "Marketing", label: "Marketing" }
    ]);
    const [fileUrl, setFileUrl] = useState("");


    const validationSchema = Yup.object({
        // name: Yup.string().required("User name is required").min(2, "Must be at least 2 characters"),
        // email: Yup.string().email("Invalid email format").required("Email is required"),
        // event: Yup.string().required("Please select an event"),
        // role: Yup.string().required("Role is required"),
        // qualification: Yup.string().required("Qualification is required"),
        // regDate: Yup.date()
        //     .transform((value, originalValue) => {
        //         if (originalValue instanceof Date) {
        //             return originalValue;
        //         }
        //         if (typeof originalValue === 'number') {
        //             const date = new Date(originalValue);
        //             return isNaN(date.getTime()) ? undefined : date;
        //         }
        //         return value;
        //     })
        //     .min(new Date().setHours(0, 0, 0, 0), "Date cannot be in the past")
        //     .required("Registration date is required"),
        // status: Yup.string().required("Please select participation status"),
        // phone: Yup.string()
        //     .required("Phone number is required")
        //     .matches(/^[0-9]+$/, "Phone number must contain only digits")
        //     .min(10, "Phone number must be at least 10 digits")
        //     .max(12, "Phone number must be at most 12 digits"),
        // resume: Yup.mixed().required("Resume is required"),
    });
    // // linkedIn: Yup.string().url("Invalid URL").required("LinkedIn profile is required"),


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
                    response = await editEventUser(editItem.id, formData);
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

    const handleFileChange = (event) => {
        form.setFieldValue('resume', event.currentTarget.files[0]);
    };


    const getEventData = useCallback(async () => {
        if (!viewItem?.id && !editItem?.id) {
            Warning('Unexpected error occurred');
            dispatch(setActiveTab("list"));
            return;
        }

        setIsLoading(true);
        try {
            const response = await viewEventUser(viewItem.id || editItem?.id);

            if (response.status === 200) {
                const data = response.data;

                form.setValues({
                    name: data.name || '',
                    email: data.email || '',
                    event: data.event || '',
                    role: data.role || '',
                    qualification: data.qualification || '',
                    gender: data.gender || '',
                    city: data.city || '',
                    expertise: data.experience || '',
                    regDate: data.regDate || null,
                    status: data.status || '',
                    phone: data.phone || '',
                    linkedIn: data.linkedIn || '',
                    experience: data.experience || '',
                    resume: data.resume || null,
                });

                const serverUrl = import.meta.env.VITE_API_URL;
                setFileUrl(`${serverUrl}/${data.resume}`);

            } else {
                dispatch(setActiveTab("list"));
                Error(response.data?.message || 'Unexpected error occurred');
                console.error('Error fetching user:');
            }
        } catch (error) {
            dispatch(setActiveTab("list"));
            Error(error.message || 'Failed to fetch user details');
            console.error('Error fetching event:', error);
        } finally {
            setIsLoading(false);
        }
    }, [viewItem?.id, editItem?.id]);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const [eventData, roleData, cityData] = await Promise.all([getEventList(), getRoles(), getCity("IN", "KL")]);

            if (eventData?.status === 200) {
                setEventList(eventData.data.data);
            }

            if (cityData?.status === 200) {
                const updatedData = cityData?.data?.map(item => ({
                    value: item.name,
                    label: item.name
                }));
                setCityList(updatedData);
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
        if ((viewItem?.id && (viewItem.isView || viewItem.isEdit)) || (editItem?.id && (editItem.isView || editItem.isEdit))) {
            getEventData();
        }
    }, [viewItem, editItem]);

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
                        <SelectInput className="ms-1" label="City" placeholder="city" width="w-1/4" name="city" {...form.getFieldProps('city')} error={form.touched.city && form.errors.city} disabled={viewItem.isView} data={cityList} />
                    </div>

                    <div className="flex w-full mt-2">
                        <SelectInput className="me-1" label="Area of Expertise" placeholder="expertise" width="w-1/4" name="expertise" {...form.getFieldProps('expertise')} error={form.touched.expertise && form.errors.expertise} disabled={viewItem.isView} data={expertiseList} />

                        <DateInput className="mx-1" label="Registration Date" width="w-1/4" name="regDate" value={form.values.regDate ? form.values.regDate.split('T')[0] : ''}
                            onChange={(e) => form.setFieldValue('regDate', e.target.value)} error={form.touched.regDate && form.errors.regDate} disabled={viewItem.isView} required />
                        <SelectInput className="mx-1" label="Participation Status" placeholder="status" width="w-1/4" name="status" {...form.getFieldProps('status')} error={form.touched.status && form.errors.status} disabled={viewItem.isView} required data={userStatus} />
                        <TextInput className="ms-1" label="Experience" placeholder="Enter Experience" width="w-1/4" name="experience" {...form.getFieldProps('experience')} error={form.touched.experience && form.errors.experience} disabled={viewItem.isView} />
                    </div>

                    <div className="flex w-full mt-2">
                        <TextInput className="me-1" label="LinkedIn Profile" placeholder="LinkedIn URL" width="w-1/4" name="linkedIn" {...form.getFieldProps('linkedIn')} error={form.touched.linkedIn && form.errors.linkedIn} disabled={viewItem.isView} />
                        {!viewItem.isView && (
                            <TextInput
                                onChange={handleFileChange}
                                type="file"
                                required
                                accept="application/pdf"
                                className="mx-1 h-10"
                                label="Resume"
                                width="w-1/4"
                                name="resume"
                                error={form.touched.resume && form.errors.resume}
                            />
                        )}

                        {fileUrl && (
                            <a
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-black h-10 mx-1 px-4 py-2 rounded-sm text-slate-300 mt-7 hover:text-slate-100"
                            >
                                View File
                            </a>
                        )}
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