import React, { useCallback, useEffect, useState } from 'react';
import Loader from '../../../components/Loader';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import TextArea from '../../../components/TextArea';
import Reset from '../../../components/Reset';
import Save from '../../../components/Save';
import ImageUpload from '../../../components/ImageUpload';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import DateInput from '../../../components/DateInput';
import MultiSelectInput from '../../../components/MultiSelectInput';
import { createEvent, editEvent, getCity, getCompanyList, viewEvent } from '../../../service/api/api';
import { Error, Success, Warning } from '../../../components/Notification';
import { setActiveTab } from '../../../redux/tabContents/tabSlice';

function CreateEvent() {
    const [isLoading, setIsLoading] = useState(false);
    const { viewItem, editItem } = useSelector((state) => state.tabContent);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const [eventList, setEventList] = useState([
        { value: "Onsite", label: "Onsite" },
        { value: "Virtual", label: "Virtual" },
        { value: "Hybrid", label: "Hybrid" },
        { value: "Seminar", label: "Seminar" },
        { value: "Workshop", label: "Workshop" },
        { value: "Webinar", label: "Webinar" },
        { value: "Tech Expo", label: "Tech Expo" },
        { value: "Bootcamp", label: "Bootcamp" },
        { value: "Meetup", label: "Meetup" },
        { value: "Training Session", label: "Training Session" },
    ])
    const [eventStatus, setEventStatus] = useState([
        { value: "Upcoming", label: "Upcoming" },
        { value: "Ongoing", label: "Ongoing" },
        { value: "Completed", label: "Completed" },
        { value: "Cancelled", label: "Cancelled" },
        { value: "Postponed", label: "Postponed" }
    ])
    const [company, setCompany] = useState([])
    const [location, setLocation] = useState([])


    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Event name is required")
            .min(2, "Must be at least 2 characters"),
        type: Yup.string().required("Please select an event type"),
        location: Yup.string().required("Please select a location"),
        startDate: Yup.date()
            .required("Start date is required")
            .max(Yup.ref("endDate"), "Start date must be before end date"),
        endDate: Yup.date()
            .required("End date is required")
            .min(Yup.ref("startDate"), "End date must be after start date"),
        description: Yup.string()
            .required("Event description is required")
            .min(6, "Event description must be at least 6 characters"),
        companies: Yup.array().min(1, 'At least one company is required').required('Company is required'),
        info: Yup.string().required('Contact info is required'),
        coordinator: Yup.string().required("Event coordinator is required"),
        agenda: Yup.string().required("Event agenda is required"),
        participatingNo: Yup.number()
            .required("Number of participants is required")
            .min(1, "Number of participants must be at least 1"),
        vacancy: Yup.number()
            .required("Vacancy is required")
            .min(1, "Vacancy must be at least 1"),
        status: Yup.string().required("Please select event status"),
        eventBanner: Yup.mixed()
            .required("Event Banner is required")
            .test(
                "fileType",
                "Only image files (JPEG/PNG) are allowed and should be less than 5MB",
                (value) => {
                    if (typeof value === "string") return true;
                    return value && ["image/jpeg", "image/png"].includes(value.type) && value.size <= 5 * 1024 * 1024;
                }
            ),
    });

    const form = useFormik({
        initialValues: {
            name: '',
            type: '',
            location: '',
            startDate: null,
            endDate: null,
            description: '',
            companies: [],
            info: '',
            coordinator: '',
            agenda: '',
            participatingNo: '',
            vacancy: '',
            status: '',
            eventBanner: null,
        },
        validationSchema,
        onSubmit: async (values) => {

            setIsLoading(true);
            setIsSubmitting(true)

            const formData = new FormData();

            Object.keys(values).forEach(key => {
                if (Array.isArray(values[key])) {
                    values[key].forEach(item => {
                        formData.append(`${key}[]`, item);
                    });
                } else {
                    formData.append(key, values[key]);
                }
            });

            try {

                let response

                if (editItem.isEdit) {
                    response = await editEvent(editItem.id, formData);
                } else {
                    response = await createEvent(formData);
                }

                console.log('Full response event:', response);

                if (response.status === 400) {
                    Warning(response.response?.data?.message || 'An error occurred!');
                    return;
                }

                if (response.status === 404) {
                    Warning('An error occurred!');
                    return;
                }

                if (response.status === 201) {
                    Success(response.data.message);
                    dispatch(setActiveTab("list"));
                    return;
                }

            } catch (error) {
                console.log('event', error);

                Error(`Failed to ${editItem.isEdit ? 'update' : 'create'} event`);
            } finally {
                setIsSubmitting(false)
                setIsLoading(false);
            }

        }
    });

    const handleImageSelect = (file) => {
        form.setFieldValue('eventBanner', file)
    };

    const getEventData = useCallback(async () => {
        if (!viewItem?.id && !editItem?.id) {
            Warning('Unexpected error occurred');
            return;
        }

        setIsLoading(true);
        try {
            const response = await viewEvent(viewItem.id || editItem?.id);

            if (response.status === 200) {
                const data = response.data;
                form.setValues({
                    name: data.name || '',
                    type: data.type || '',
                    location: data.location || '',
                    startDate: data.startDate || '',
                    endDate: data.endDate || '',
                    description: data.description || '',
                    companies: data.companies || [],
                    info: data.info || '',
                    coordinator: data.coordinator || '',
                    agenda: data.agenda || '',
                    participatingNo: data.participatingNo || '',
                    vacancy: data.vacancy || '',
                    status: data.status || '',
                    eventBanner: data.eventBanner || null,
                });

            } else {
                dispatch(setActiveTab("list"));
                Error(response.data?.message || 'Unexpected error occurred');
                console.error('Error fetching event:');
            }
        } catch (error) {
            dispatch(setActiveTab("list"));
            Error(error.message || 'Failed to fetch event details');
            console.error('Error fetching event:', error);
        } finally {
            setIsLoading(false);
        }
    }, [viewItem?.id, editItem?.id]);

    const fetchData = async () => {
        try {
            const [companyRes, cityRes] = await Promise.all([getCompanyList(), getCity("IN", "KL")]);

            if (companyRes?.status === 200) {
                setCompany(companyRes.data.data);
            }

            if (cityRes?.status === 200) {
                const updatedData = cityRes?.data?.map(item => ({
                    value: item.name,
                    label: item.name
                }));
                setLocation(updatedData);
            }
        } catch (error) {
            console.error(error);
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
                <div className="w-5/6">
                    {/* First Row */}
                    <div className="flex w-full">
                        <TextInput
                            disabled={viewItem.isView}
                            required
                            label="Event Name"
                            placeholder="Enter event name"
                            width="w-1/3"
                            name="name"
                            value={form.values.name}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.name && form.errors.name}
                        />

                        <SelectInput
                            disabled={viewItem.isView}
                            className="mx-2"
                            required
                            label="Event Type"
                            placeholder="event type"
                            width="w-1/3"
                            name="type"
                            value={form.values.type}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.type && form.errors.type}
                            data={eventList}
                        />

                        <SelectInput
                            disabled={viewItem.isView}
                            required
                            label="Location"
                            placeholder="location"
                            width="w-1/3"
                            name="location"
                            value={form.values.location}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.location && form.errors.location}
                            data={location}
                        />
                    </div>

                    {/* Second Row */}
                    <div className="flex w-full mt-2">
                        <DateInput
                            disabled={viewItem.isView}
                            onChange={(e) => form.setFieldValue('startDate', e.target.value)}
                            width="w-1/3"
                            value={form.values.startDate ? form.values.startDate.split('T')[0] : ''}
                            required
                            label="Start Date"
                            name="startDate"
                            error={form.touched.startDate && form.errors.startDate}
                            className="me-1"
                        />

                        <DateInput
                            disabled={viewItem.isView}
                            className="mx-1"
                            onChange={(e) => form.setFieldValue('endDate', e.target.value)}
                            width="w-1/3"
                            value={form.values.endDate ? form.values.endDate.split('T')[0] : ''}
                            required
                            label="End Date"
                            name="endDate"
                            error={form.touched.endDate && form.errors.endDate}
                        />

                        <TextArea
                            className="ms-1"
                            disabled={viewItem.isView}
                            required
                            label="Event Description"
                            placeholder="Enter description"
                            width="w-1/3"
                            name="description"
                            value={form.values.description}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.description && form.errors.description}
                        />
                    </div>

                    {/* Third Row */}
                    <div className="flex w-full mt-2">
                        <MultiSelectInput
                            disabled={viewItem.isView}
                            required
                            label="Companies Participating"
                            placeholder="Select companies"
                            width="w-2/3"
                            name="companies"
                            data={company}
                            value={form.values.companies}
                            onChange={(selected) => form.setFieldValue('companies', selected)}
                            error={form.touched.companies && form.errors.companies}
                        />

                        <TextInput
                            disabled={viewItem.isView}
                            required
                            label="Contact Info"
                            placeholder="Enter contact info"
                            width="w-1/3"
                            name="info"
                            value={form.values.info}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.info && form.errors.info}
                            className="ms-1"
                        />
                    </div>

                    {/* Fourth Row */}
                    <div className="flex w-full mt-2">
                        <TextInput
                            disabled={viewItem.isView}
                            required
                            label="Event Coordinator"
                            placeholder="Enter Event Coordinator"
                            width="w-1/2"
                            name="coordinator"
                            value={form.values.coordinator}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.coordinator && form.errors.coordinator}
                            className="mr-1"
                        />

                        <TextInput
                            disabled={viewItem.isView}
                            required
                            label="Event Agenda"
                            placeholder="Enter Event Agenda"
                            width="w-1/2"
                            name="agenda"
                            value={form.values.agenda}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.agenda && form.errors.agenda}
                            className="ml-1"
                        />
                    </div>

                    {/* Fifth Row */}
                    <div className="flex w-full mt-2">
                        <TextInput
                            disabled={viewItem.isView}
                            required
                            label="Number of Participants"
                            placeholder="Enter number of participants"
                            width="w-1/3"
                            name="participatingNo"
                            type="number"
                            value={form.values.participatingNo}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.participatingNo && form.errors.participatingNo}
                            className="mr-1"
                        />

                        <TextInput
                            disabled={viewItem.isView}
                            required
                            label="Vacancy"
                            placeholder="Enter vacancy"
                            width="w-1/3"
                            name="vacancy"
                            type="number"
                            value={form.values.vacancy}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.vacancy && form.errors.vacancy}
                            className="mx-1"
                        />

                        <SelectInput
                            disabled={viewItem.isView}
                            required
                            label="Status"
                            placeholder="Select status"
                            width="w-1/3"
                            name="status"
                            value={form.values.status}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.status && form.errors.status}
                            data={eventStatus}
                            className="ml-1"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex w-full mt-4 justify-center">
                        <Reset onClick={form.handleReset} className="me-1" disabled={viewItem.isView || isSubmitting} />
                        <Save
                            type="submit"
                            label={editItem.isEdit ? "Update" : "Save"}
                            className="ms-1"
                            disabled={viewItem.isView || isSubmitting}
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div className="w-1/6 ms-2">
                    <ImageUpload
                        initialImage={form.values.eventBanner}
                        required
                        disabled={viewItem.isView}
                        label="Event Banner"
                        name="eventBanner"
                        onImageSelect={handleImageSelect}
                        error={form.touched.eventBanner && form.errors.eventBanner}
                    />
                </div>
            </form>
        </Loader>
    );
}

export default CreateEvent;