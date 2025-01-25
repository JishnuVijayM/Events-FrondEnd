import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../service/api/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { handleAddPermissions, handleClearPermission, setRoleId } from '../../redux/rolePrevilages/permissionsSlice';
import { Error, Success, Warning } from '../../components/Notification';
import { viewRole } from '../../service/api/api';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(4, 'Password must be at least 4 characters')
            .required('Password is required'),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            setSubmitting(true);
            localStorage.clear();
            dispatch(handleClearPermission());

            const response = await login(values);

            if (response?.status === 200) {
                const { role, token } = response.data;

                if (role && token) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('id', role);
                    dispatch(setRoleId(role));

                    // Fetch permissions
                    const permissionResponse = await viewRole(role);

                    console.log('permissionResponse', permissionResponse);


                    if (permissionResponse?.status === 200) {
                        dispatch(handleAddPermissions(permissionResponse.data.permissions));
                        Success('Login successful!');
                        navigate('/admin');

                    } else {
                        handleFetchError(permissionResponse);
                    }
                } else {
                    handleError(400, setErrors);
                }
            } else {
                handleError(response?.status, setErrors);
            }
        } catch (error) {
            console.error('Error during login or permission fetch:', error);
            setErrors({ email: 'An unexpected error occurred. Please try again later.' });
            Error('An unexpected error occurred. Please try again later.');
        } finally {
            setSubmitting(false);
        }
    };

    const handleError = (status, setErrors) => {
        const errorMessages = {
            400: 'Invalid input or missing fields',
            401: 'Invalid credentials',
            default: 'Login failed. Please try again later.'
        };

        const message = errorMessages[status] || errorMessages.default;
        setErrors({ email: message });
        Warning(message);
    };

    const handleFetchError = (response) => {
        Error('Failed to fetch permissions');
        console.error('Permission fetch error:', response);
    };


    return (
        <div className="flex-1 bg-white w-full h-full flex items-center justify-between flex-col p-6">
            <div className="w-11/12 sm:w-10/12 lg:w-2/3 flex flex-col mt-8 sm:mt-14">
                <p className="text-gray-800 font-semibold text-3xl sm:text-3xl">Welcome back!</p>
                <p className="mt-2 text-start font-medium text-gray-900 text-sm sm:text-base">
                    Please sign in to continue
                </p>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form className="flex flex-col w-11/12 sm:w-10/12 lg:w-2/3">
                        <div className="flex flex-col">
                            <Field
                                name="email"
                                type="email"
                                placeholder="Email"
                                className={`shadow appearance-none pb-4 border-black rounded-full w-full py-2.5 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline ${errors.email && touched.email ? '' : 'mb-5'
                                    }`}
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 font-medium text-xs mb-4"
                            />
                        </div>

                        <div className="flex flex-col relative">
                            <Field
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className={`shadow appearance-none pb-4 border-black rounded-full w-full bg-black text-white py-2.5 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password && touched.password ? '' : 'mb-4'
                                    }`}
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 text-xs mb-4 font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-3 text-white focus:outline-none"
                            >
                                <FontAwesomeIcon className='pb-1' icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="font-medium mt-14 w-full bg-orange text-white py-2.5 px-3 rounded-md hover:bg-orange-600 focus:outline-none focus:shadow-outline mb-1"
                        >
                            {isSubmitting ? 'Signing In...' : 'Sign In'}
                        </button>
                        <div className="w-11/12 sm:w-10/12 lg:w-2/3 flex flex-col">
                            <div className="w-auto">
                                <Link
                                    to="forgot-password"
                                    // to="reset-password/344"
                                    className="text-black hover:underline text-center text-xs sm:text-sm lg:text-left"
                                >
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>

            <Link
                to="forgot-password"
                className="text-black text-center text-sm sm:text-md lg:text-left"
            >
                Need help? Contact support.
            </Link>
        </div>
    );
}

export default Login;
