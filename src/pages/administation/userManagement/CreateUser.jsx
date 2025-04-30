import React, { useCallback, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import Save from '../../../components/Save';
import Reset from '../../../components/Reset';
import ImageUpload from '../../../components/ImageUpload';
import { createUser, editUser, getCity, getCountry, getRoles, getState, viewUser } from '../../../service/api/api';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { Error, Success, Warning } from '../../../components/Notification';
import { setActiveTab } from '../../../redux/tabContents/tabSlice';


function CreateUser() {
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [roleData, setRoleData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { viewItem, editItem } = useSelector((state) => state.tabContent);
    const [countryData, setCountryData] = useState([]);
    const [stateData, setStateData] = useState([]);
    const [cityData, setCityData] = useState([]);
    const [resetTrigger, setResetTrigger] = useState(false);


    const validationSchema = Yup.object({
        userName: Yup.string().required('Name is required'),
        profilePicture: Yup.mixed()
            .required('Profile picture is required')
            .test(
                'isStringOrFile',
                'File size should be less than 5 MB',
                (value) => {
                    if (typeof value === 'string') {
                        return /^(uploads\\userProfile\\.*\.(jpg|jpeg|png|gif))$/i.test(value);
                    }
                    if (value instanceof File) {
                        return value.size <= 5 * 1024 * 1024;
                    }
                    return false;
                }
            ),
        phone: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile is required'),
        role: Yup.string().required('Role is required'),
        country: Yup.string().required('Country is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: editItem?.isEdit ? Yup.string() : Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: editItem?.isEdit ? Yup.string() : Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    });

    const formik = useFormik({
        initialValues: {
            userName: '',
            phone: '',
            password: '',
            email: '',
            role: '',
            country: 'IN',
            state: 'KL',
            city: '',
            confirmPassword: '',
            profilePicture: ''
        },
        validationSchema,
        onSubmit: (values) => {
            const formData = new FormData();

            Object.keys(values).forEach(key => {
                if (key !== 'confirmPassword' && key !== 'profilePicture') {
                    formData.append(key, values[key]);
                }
            });

            if (imageFile) {
                formData.append('profilePicture', imageFile);
            }

            handleSubmit(event, formData);
        },
    });

    useEffect(() => {
        fetchDropdownData()
    }, [])

    const fetchDropdownData = async () => {
        try {
            const [roleRes, countryRes] = await Promise.all([getRoles(), getCountry()]);

            if (roleRes.status === 200) {
                setRoleData(roleRes.data);
            } else {
                console.warn('Failed to fetch roles:', roleRes.status);
            }

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

    const fetchState = async () => {
        try {
            const res = await getState(formik.values.country)

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
            const res = await getCity(formik.values.country, formik.values.state)

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
        if (formik.values.country) {
            fetchState();
        }
        if (formik.values.country && formik.values.state) {
            fetchCity();
        }
    }, [formik.values.country, formik.values.state]);


    const getUserData = useCallback(async () => {
        if (!viewItem?.id && !editItem?.id) {
            Warning('Unexpected error occurred');
            return;
        }

        setIsLoading(true);
        try {
            const response = await viewUser(viewItem.id || editItem?.id);

            if (response.status === 200) {
                const data = response.data;
                formik.setValues({
                    userName: data.userName || '',
                    phone: data.phone || '',
                    password: '',
                    email: data.email || '',
                    role: data.role || '',
                    country: data.country || '',
                    state: data.state || '',
                    city: data.city || '',
                    profilePicture: data.profilePicture || ''
                });

            } else {
                dispatch(setActiveTab("list"));
                Error(response.data?.message || 'Unexpected error occurred');
                console.error('Error fetching user:');
            }
        } catch (error) {
            dispatch(setActiveTab("list"));
            Error(error.message || 'Failed to fetch user details');
            console.error('Error fetching user:', error);
        } finally {
            setIsLoading(false);
        }
    }, [viewItem?.id, editItem?.id]);

    useEffect(() => {
        if ((viewItem?.id && (viewItem.isView || viewItem.isEdit)) || (editItem?.id && (editItem.isView || editItem.isEdit))) {
            getUserData();
        }
    }, [viewItem, editItem]);

    const handleSubmit = async (event, formData) => {
        event.preventDefault();
        setIsLoading(true);
        setIsSubmitting(true)

        try {

            let response

            response = editItem.isEdit
                ? await editUser(editItem.id, formData)
                : await createUser(formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                });

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
        setImageFile(file);
        formik.setFieldValue('profilePicture', file);
    };


    const handleFormReset = () => {
        formik.handleReset();
        setImageFile(null);
        setResetTrigger((prev) => !prev);
    };



    return (
        <Loader isLoading={isLoading}>
            <div className="w-full rounded-md bg-gray p-5 flex">

                <div className="w-4/5">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex w-full">
                            <TextInput
                                disabled={viewItem.isView}
                                required
                                label="Name"
                                placeholder="Enter name"
                                width="w-1/3"
                                name="userName"
                                value={formik.values.userName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.userName && formik.errors.userName}
                            />
                            <TextInput
                                disabled={viewItem.isView}
                                required
                                className="mx-2"
                                label="Mobile"
                                placeholder="Enter mobile no"
                                width="w-1/3"
                                name="phone"
                                value={formik.values.phone}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phone && formik.errors.phone}
                            />
                            <SelectInput
                                disabled={viewItem.isView}
                                required
                                label="Role"
                                placeholder="role"
                                width="w-1/3"
                                name="role"
                                value={formik.values.role}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.role && formik.errors.role}
                                data={roleData}
                            />
                        </div>

                        <div className="flex w-full mt-4">
                            <SelectInput
                                disabled
                                required
                                label="Country"
                                placeholder="country"
                                width="w-1/3"
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.country && formik.errors.country}
                                data={countryData}
                            />
                            <SelectInput
                                disabled
                                required
                                className="mx-2"
                                label="State"
                                placeholder="State"
                                width="w-1/3"
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.state && formik.errors.state}
                                data={stateData}
                            />
                            <SelectInput
                                disabled={viewItem.isView}
                                required
                                label="City"
                                placeholder="City"
                                width="w-1/3"
                                name="city"
                                value={formik.values.city}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.city && formik.errors.city}
                                data={cityData}
                            />
                        </div>

                        <div className="flex w-full mt-4">
                            <TextInput
                                disabled={viewItem.isView}
                                required
                                label="Email"
                                placeholder="Enter email"
                                width="w-full"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.email && formik.errors.email}
                            />
                        </div>

                        {!editItem.isEdit && !viewItem.isView && (

                            <div className="flex w-full mt-4">
                                <TextInput
                                    disabled={viewItem.isView}
                                    required
                                    label="Password"
                                    placeholder="Enter password"
                                    width="w-1/2"
                                    name="password"
                                    type="password"
                                    className="mr-1"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && formik.errors.password}
                                />
                                <TextInput
                                    disabled={viewItem.isView}
                                    required
                                    className="ml-1"
                                    label="Confirm Password"
                                    placeholder="Enter confirm password"
                                    width="w-1/2"
                                    name="confirmPassword"
                                    type="password"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                />
                            </div>

                        )}

                        <div className="flex w-full mt-4 justify-center">
                            <Reset className="me-1" type="reset" disabled={isSubmitting || viewItem.isView}
                                onClick={handleFormReset} />
                            <Save className="ms-1" label={editItem.isEdit ? "Update" : "Save"} type="submit" disabled={isSubmitting || viewItem.isView} />

                        </div>
                    </form>
                </div>

                <div className="w-1/5">
                    <ImageUpload
                        resetTrigger={resetTrigger}
                        disabled={viewItem.isView}
                        initialImage={formik.values.profilePicture}
                        onBlur={formik.handleBlur}
                        error={formik.touched.profilePicture && formik.errors.profilePicture}
                        label="Profile Picture"
                        required
                        className="ml-2"
                        name={'profilePicture'}
                        onImageSelect={handleImageSelect} />
                </div>

            </div>
        </Loader>
    );
}

export default CreateUser;