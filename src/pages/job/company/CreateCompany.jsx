import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import TextArea from '../../../components/TextArea';
import ImageUpload from '../../../components/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany, editCompany, getCity, getCountry, getState, viewCompany } from '../../../service/api/api';
import { Error, Success, Warning } from '../../../components/Notification';
import { setActiveTab } from '../../../redux/tabContents/tabSlice';
import Reset from '../../../components/Reset';
import Save from '../../../components/Save';
import Loader from '../../../components/Loader';

function CreateCompany() {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { viewItem, editItem } = useSelector((state) => state.tabContent);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [resetTrigger, setResetTrigger] = useState(false);
    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [jobPosition, setJobPosition] = useState([
        { label: "Software Engineer", value: "software_engineer" },
        { label: "Data Scientist", value: "data_scientist" },
        { label: "Web Developer", value: "web_developer" },
        { label: "Project Manager", value: "project_manager" },
        { label: "UI/UX Designer", value: "ui_ux_designer" },
        { label: "Quality Assurance Engineer", value: "qa_engineer" },
        { label: "DevOps Engineer", value: "devops_engineer" },
    ])
    const [industry, setndustry] = useState([
        { label: "IT Services", value: "it_services" },
        { label: "Healthcare", value: "healthcare" },
        { label: "Finance", value: "finance" },
        { label: "Education", value: "education" },
        { label: "Manufacturing", value: "manufacturing" },
        { label: "E-commerce", value: "e_commerce" },
    ])


    const validationSchema = Yup.object({
        companyName: Yup.string()
            .required("Company name is required")
            .min(2, "Must be at least 2 characters"),
        industry: Yup.string().required("Please select an industry"),
        companyAddress: Yup.string()
            .required("Company address is required")
            .min(5, "Must be at least 5 characters"),
        country: Yup.string().required("Please select a country"),
        state: Yup.string().required("Please select a state"),
        city: Yup.string().required("Please select a city"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        phone: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile is required'),
        password: editItem?.isEdit ? Yup.string() : Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: editItem?.isEdit ? Yup.string() : Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
        jobPosition: Yup.string().required("Please select a job position"),
        vacancy: Yup.number()
            .required("Vacancy is required")
            .min(1, "Vacancy must be at least 1"),
        eventName: Yup.string().required("Event name is required"),
        companyLogo: Yup.mixed()
            .required("Company Logo is required")
            .test(
                "isStringOrFile",
                "Only image files are allowed (JPEG/PNG) and should be less than 5 MB",
                (value) => {
                    // If the value is a string, verify it matches the expected path pattern
                    if (typeof value === "string") {
                        return /^(uploads\\companyLogo\\.*\.(jpg|jpeg|png|gif))$/i.test(value);
                    }
                    // If the value is a File object, validate the type and size
                    if (value instanceof File) {
                        return (
                            ["image/jpeg", "image/png"].includes(value.type) &&
                            value.size <= 5 * 1024 * 1024 // 5 MB
                        );
                    }
                    return false; // Invalid type
                }
            )
            .test("aspectRatio", "Image must have a 1:1 ratio", async (value) => {
                if (value instanceof File) {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const img = new Image();
                            img.onload = () => {
                                const isSquare = img.width === img.height;
                                resolve(isSquare);
                            };
                            img.onerror = () => resolve(false);
                            img.src = e.target.result;
                        };
                        reader.readAsDataURL(value);
                    });
                }
                return true; 
            }),

    });

    const form = useFormik({
        initialValues: {
            companyName: '',
            industry: '',
            companyAddress: '',
            country: 'IN',
            state: 'KL',
            city: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            jobPosition: '',
            vacancy: '',
            eventName: '',
            companyLogo: null,
        },
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();

            Object.keys(values).forEach(key => {
                if (key !== 'confirmPassword' && key !== 'profilePicture') {
                    formData.append(key, values[key]);
                }
            });

            handleSubmit(event, formData);
        },
    });

    const getCompanyData = useCallback(async () => {
        if (!viewItem?.id && !editItem?.id) {
            Warning('Unexpected error occurred');
            return;
        }

        setIsLoading(true);
        try {
            const response = await viewCompany(viewItem.id || editItem?.id);

            if (response.status === 200) {
                const data = response.data;

                form.setValues({
                    companyName: data.companyName || '',
                    industry: data.industry || '',
                    companyAddress: data.companyAddress || '',
                    country: data.country || '',
                    state: data.state || '',
                    city: data.city || '',
                    email: data.email || '',
                    phone: data.phone || '',
                    password: '',
                    jobPosition: data.jobPosition || '',
                    vacancy: data.vacancy || '',
                    eventName: data.eventName || '',
                    companyLogo: data.companyLogo || null,
                });

            } else {
                dispatch(setActiveTab("list"));
                Error(response.data?.message || 'Unexpected error occurred');
                console.error('Error fetching company details:');
            }
        } catch (error) {
            dispatch(setActiveTab("list"));
            Error(error.message || 'Failed to fetch company details');
            console.error('Error fetching company:', error);
        } finally {
            setIsLoading(false);
        }
    }, [viewItem?.id, editItem?.id]);

    const fetchDropdownData = async () => {
        try {
            const countryRes = await getCountry()

            if (countryRes.status === 200) {
                const updatedData = countryRes?.data?.map((item) => ({
                    value: item.iso2,
                    label: item.name
                }));
                setCountryData(updatedData);
            } else {
                console.warn('Failed to fetch countries:', countryRes.status);
            }

        } catch (error) {
            console.error("Error fetching dropdown data:", error);
        }
    };

    useEffect(() => {
        fetchDropdownData()
    }, [])

    useEffect(() => {
        if ((viewItem?.id && (viewItem.isView || viewItem.isEdit)) || (editItem?.id && (editItem.isView || editItem.isEdit))) {
            getCompanyData();
        }
    }, [viewItem, editItem]);

    const handleSubmit = async (event, formData) => {
        event.preventDefault();
        setIsLoading(true);
        setIsSubmitting(true)

        try {

            let response

            response = editItem.isEdit
                ? await editCompany(editItem.id, formData)
                : await createCompany(formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

            console.log('Full response:', response);

            if (response.status === 400) {
                Warning(response.response.data.message || 'An error occurred!');
                return;
            }

            if (response.status === 201) {
                Success(response.data.message);
                dispatch(setActiveTab("list"));
                return;
            }

        } catch (error) {
            Error(`Failed to ${editItem.isEdit ? 'update' : 'create'} user`);
        } finally {
            setIsSubmitting(false)
            setIsLoading(false);
        }
    };

    const handleImageSelect = (file) => {
        form.setFieldValue('companyLogo', file)
    };

    const handleFormReset = () => {
        form.handleReset();
        setResetTrigger((prev) => !prev);
    };

    const fetchState = async () => {
        try {
            const res = await getState(form.values.country)

            if (res.status === 200) {
                const updatedData = res?.data?.map((item) => {
                    return {
                        value: item.iso2,
                        label: item.name
                    }
                })

                setStateData(updatedData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchCity = async () => {
        try {
            const res = await getCity(form.values.country, form.values.state)

            if (res.status === 200) {
                const updatedData = res?.data?.map((item) => {
                    return {
                        value: item.name,
                        label: item.name
                    }
                })

                setCityData(updatedData);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (form.values.country) {
            fetchState();
        }
        if (form.values.country && form.values.state) {
            fetchCity();
        }
    }, [form.values.country, form.values.state]);

    return (
        <Loader isLoading={isLoading}>
            <form onSubmit={form.handleSubmit} className="w-full rounded-md bg-gray p-5 flex">
                <div className="w-5/6">
                    {/* First Row */}
                    <div className="flex w-full">
                        <TextInput
                            disabled={viewItem.isView}
                            required
                            label="Company name"
                            placeholder="Enter company name"
                            width="w-1/3"
                            name="companyName"
                            value={form.values.companyName}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.companyName && form.errors.companyName}
                        />

                        <SelectInput
                            disabled={viewItem.isView}
                            className="mx-2"
                            required
                            label="Industry"
                            placeholder="industry"
                            width="w-1/3"
                            name="industry"
                            value={form.values.industry}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.industry && form.errors.industry}
                            data={industry}
                        />

                        <TextArea
                            disabled={viewItem.isView}
                            required
                            label="Company Address"
                            placeholder="Enter company address"
                            width="w-1/3"
                            name="companyAddress"
                            value={form.values.companyAddress}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.companyAddress && form.errors.companyAddress}
                        />
                    </div>

                    {/* Second Row */}
                    <div className="flex w-full mt-2">
                        <SelectInput
                            disabled
                            required
                            label="Country"
                            placeholder="country"
                            width="w-1/3"
                            name="country"
                            value={form.values.country}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.country && form.errors.country}
                            data={countryData}
                        />

                        <SelectInput
                            disabled
                            className="mx-2"
                            required
                            label="State"
                            placeholder="state"
                            width="w-1/3"
                            name="state"
                            value={form.values.state}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.state && form.errors.state}
                            data={stateData}
                        />

                        <SelectInput
                            disabled={viewItem.isView}
                            required
                            label="City"
                            placeholder="city"
                            width="w-1/3"
                            name="city"
                            value={form.values.city}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.city && form.errors.city}
                            data={cityData}
                        />
                    </div>

                    {/* Third Row */}
                    <div className="flex w-full mt-2">
                        <TextInput
                            disabled={viewItem.isView}
                            required
                            label="Email"
                            placeholder="Enter email"
                            width="w-2/3"
                            name="email"
                            value={form.values.email}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.email && form.errors.email}
                            className="me-1"
                        />

                        <TextInput
                            disabled={viewItem.isView}
                            required
                            label="Phone"
                            placeholder="Enter phone"
                            width="w-1/3"
                            name="phone"
                            value={form.values.phone}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.phone && form.errors.phone}
                            className="ms-1"
                        />
                    </div>

                    {/* Fourth Row */}
                    {!editItem.isEdit && !viewItem.isView && (

                        <div className="flex w-full mt-2">
                            <TextInput
                                disabled={viewItem.isView}
                                required
                                label="Password"
                                placeholder="Enter password"
                                width="w-1/2"
                                name="password"
                                type="text"
                                value={form.values.password}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={form.touched.password && form.errors.password}
                                className="mr-1"
                            />

                            <TextInput
                                disabled={viewItem.isView}
                                required
                                label="Confirm Password"
                                placeholder="Enter confirm password"
                                width="w-1/2"
                                name="confirmPassword"
                                type="text"
                                value={form.values.confirmPassword}
                                onChange={form.handleChange}
                                onBlur={form.handleBlur}
                                error={form.touched.confirmPassword && form.errors.confirmPassword}
                                className="ml-1"
                            />
                        </div>

                    )}

                    {/* Fifth Row */}
                    <div className="flex w-full mt-2">
                        <SelectInput
                            disabled={viewItem.isView}
                            required
                            label="Job Position"
                            placeholder="position"
                            width="w-1/3"
                            name="jobPosition"
                            value={form.values.jobPosition}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.jobPosition && form.errors.jobPosition}
                            data={jobPosition}
                            className="me-1"
                        />

                        <TextInput
                            disabled={viewItem.isView}
                            required
                            label="Vacancy"
                            placeholder="Enter Vacancy"
                            width="w-1/6"
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
                            label="Event Name"
                            placeholder="event"
                            width="w-1/3"
                            name="eventName"
                            value={form.values.eventName}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.touched.eventName && form.errors.eventName}
                            data={[{ label: "t1", value: 't1' },
                            { label: "t2", value: 't2' }]}
                            className={'ms-1'}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex w-full mt-4 justify-center">
                        <Reset className="me-1" type="reset" disabled={isSubmitting || viewItem.isView}
                            onClick={handleFormReset} />
                        <Save className="ms-1" label={editItem.isEdit ? "Update" : "Save"} type="submit" disabled={isSubmitting || viewItem.isView || !form.dirty} />

                    </div>
                </div>

                {/* Profile Picture */}
                <div className="w-1/6 ms-2">
                    <ImageUpload
                        resetTrigger={resetTrigger}
                        disabled={viewItem.isView}
                        initialImage={form.values.companyLogo}
                        label="Profile Picture"
                        required
                        className=""
                        name="companyLogo"
                        placeholder="Choose File (Ratio-1:1)"
                        onImageSelect={handleImageSelect}
                        onBlur={form.handleBlur}
                        error={form.touched.companyLogo && form.errors.companyLogo}
                    />
                </div>
            </form>
        </Loader>
    );
}

export default CreateCompany;
