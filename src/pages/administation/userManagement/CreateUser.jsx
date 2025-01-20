import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextInput from '../../../components/TextInput';
import SelectInput from '../../../components/SelectInput';
import Save from '../../../components/Save';
import Reset from '../../../components/Reset';
import ImageUpload from '../../../components/ImageUpload';
import { createUser, getRoles } from '../../../service/api/api';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../components/Loader';
import { Error, Success, Warning } from '../../../components/Notification';

const validationSchema = Yup.object({
    userName: Yup.string().required('Name is required'),
    // profilePicture: Yup.string().required('required'),
    // phone: Yup.string().matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits').required('Mobile is required'),
    // role: Yup.string().required('Role is required'),
    // country: Yup.string().required('Country is required'),
    // state: Yup.string().required('State is required'),
    // district: Yup.string().required('District is required'),
    // email: Yup.string().email('Invalid email address').required('Email is required'),
    // password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    // confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
});

function CreateUser() {
    const [imageFile, setImageFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [roleData, setRoleData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { viewItem, editItem } = useSelector((state) => state.tabContent);

    console.log(viewItem, editItem);


    useEffect(() => {
        fetchDropdownData()
    }, [])

    const fetchDropdownData = async () => {
        try {
            const roleRes = await getRoles()

            if (roleRes.status === 200) {
                setRoleData(roleRes.data)
            }

        } catch (error) {
            console.log("fetching dropdown error", error);
        }
    }



    const handleSubmit = async (event, formData) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const response = await createUser(formData, {
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
                return;
            }

        } catch (error) {

            console.log("e",error);

            // Handle network errors or unexpected issues
            // const errorMessage = error?.response?.data?.message || error.message || 'An unexpected error occurred. Please try again later.';
            // Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };




    const formik = useFormik({
        initialValues: {
            userName: '',
            phone: '',
            password: '',
            email: '',
            role: '',
            country: '',
            state: '',
            district: '',
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


    const handleImageSelect = (file) => {
        setImageFile(file);
        formik.setFieldValue('profilePicture', file);
    };



    return (
        <Loader isLoading={isLoading}>
            <div className="w-full rounded-md bg-gray p-5 flex">

                <div className="w-4/5">
                    <form onSubmit={formik.handleSubmit}>
                        <div className="flex w-full">
                            <TextInput
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
                                required
                                label="Role"
                                placeholder="Select role"
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
                                required
                                label="Country"
                                placeholder="Select country"
                                width="w-1/3"
                                name="country"
                                value={formik.values.country}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.country && formik.errors.country}
                                data={[
                                    { value: 'option1', label: 'Option 1' },
                                    { value: 'option2', label: 'Option 2' }
                                ]}
                            />
                            <SelectInput
                                required
                                className="mx-2"
                                label="State"
                                placeholder="Select State"
                                width="w-1/3"
                                name="state"
                                value={formik.values.state}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.state && formik.errors.state}
                                data={[
                                    { value: 'State1', label: 'State 1' },
                                    { value: 'State2', label: 'State 2' }
                                ]}
                            />
                            <SelectInput
                                required
                                label="District"
                                placeholder="Select District"
                                width="w-1/3"
                                name="district"
                                value={formik.values.district}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.district && formik.errors.district}
                                data={[
                                    { value: 'District1', label: 'District 1' },
                                    { value: 'District2', label: 'District 2' }
                                ]}
                            />
                        </div>

                        <div className="flex w-full mt-4">
                            <TextInput
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

                        <div className="flex w-full mt-4">
                            <TextInput
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

                        <div className="flex w-full mt-4 justify-center">
                            <Save className="mr-1" type="submit" disabled={isSubmitting} />
                            <Reset className="ml-1" type="reset" onClick={formik.handleReset} disabled={isSubmitting} />
                        </div>
                    </form>
                </div>

                <div className="w-1/5">
                    <ImageUpload onBlur={formik.handleBlur}
                        error={formik.touched.profilePicture && formik.errors.profilePicture} label="Profile Picture"
                        required className="ml-2" name={'profilePicture'} onImageSelect={handleImageSelect} />
                </div>

            </div>
        </Loader>
    );
}

export default CreateUser;