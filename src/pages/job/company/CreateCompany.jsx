import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import TextArea from '../../../components/TextArea';
import ImageUpload from '../../../components/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { createCompany } from '../../../service/api/api';
import { Error, Success, Warning } from '../../../components/Notification';
import { setActiveTab } from '../../../redux/tabContents/tabSlice';

function CreateCompany() {
    const [imageFile, setImageFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { viewItem, editItem } = useSelector((state) => state.tabContent);

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
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: Yup.string()
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
                "fileType",
                "Only image files are allowed (JPEG/PNG)",
                (value) => value && ["image/jpeg", "image/png"].includes(value.type)
            )
            .test("fileSize", "File must be less than 5 MB", (value) => {
                return value && value.size <= 5 * 1024 * 1024; // 5 MB in bytes
            })
            .test("aspectRatio", "Image must have a 1:1 ratio", async (value) => {
                if (!value) return false;

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
            }),
    });


    const form = useFormik({
        initialValues: {
            companyName: '',
            industry: '',
            companyAddress: '',
            country: '',
            state: '',
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

            // if (imageFile) {
            //     formData.append('profilePicture', imageFile);
            // }

            handleSubmit(event, formData);
        },
    });

    const handleSubmit = async (event, formData) => {
        event.preventDefault();
        setIsLoading(true);
        // setIsSubmitting(true)

        try {

            let response

            response = editItem.isEdit
                ? null
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
            // setIsSubmitting(false)
            setIsLoading(false);
        }
    };

    const handleImageSelect = (file) => {
        // setImageFile(file);
        form.setFieldValue('companyLogo', file)
    };

    return (
        <form onSubmit={form.handleSubmit} className="w-full rounded-md bg-gray p-5 flex">
            <div className="w-5/6">
                {/* First Row */}
                <div className="flex w-full">
                    <TextInput
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
                        className="mx-2"
                        required
                        label="Industry"
                        placeholder="Select industry"
                        width="w-1/3"
                        name="industry"
                        value={form.values.industry}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.industry && form.errors.industry}
                        data={[{ label: "t1", value: 't1' },
                        { label: "t2", value: 't2' }
                        ]}
                    />

                    <TextArea
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
                        required
                        label="Country"
                        placeholder="Select country"
                        width="w-1/3"
                        name="country"
                        value={form.values.country}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.country && form.errors.country}
                        data={[{ label: "t1", value: 't1' },
                        { label: "t2", value: 't2' }]}
                    />

                    <SelectInput
                        className="mx-2"
                        required
                        label="State"
                        placeholder="Select state"
                        width="w-1/3"
                        name="state"
                        value={form.values.state}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.state && form.errors.state}
                        data={[{ label: "t1", value: 't1' },
                        { label: "t2", value: 't2' }]}
                    />

                    <SelectInput
                        required
                        label="City"
                        placeholder="Select city"
                        width="w-1/3"
                        name="city"
                        value={form.values.city}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.city && form.errors.city}
                        data={[{ label: "t1", value: 't1' },
                        { label: "t2", value: 't2' }]}
                    />
                </div>

                {/* Third Row */}
                <div className="flex w-full mt-2">
                    <TextInput
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
                <div className="flex w-full mt-2">
                    <TextInput
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

                {/* Fifth Row */}
                <div className="flex w-full mt-2">
                    <SelectInput
                        required
                        label="Job Position"
                        placeholder="Select position"
                        width="w-1/3"
                        name="jobPosition"
                        value={form.values.jobPosition}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                        error={form.touched.jobPosition && form.errors.jobPosition}
                        data={[{ label: "t1", value: 't1' },
                        { label: "t2", value: 't2' }]}
                        className="me-1"
                    />

                    <TextInput
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
                        //disabled={viewItem.isView}
                        required
                        label="Event Name"
                        placeholder="Select event"
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
                <div className="flex w-full mt-2">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Submit
                    </button>
                </div>
            </div>

            {/* Profile Picture */}
            <div className="w-1/6 ms-2">


                <ImageUpload
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
    );
}

export default CreateCompany;
