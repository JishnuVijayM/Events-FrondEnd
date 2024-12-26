import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import LogoImg from '../../assets/Logo.png';
import { Link } from 'react-router-dom';

const Login = () => {
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

    const handleSubmit = (values) => {
        console.log('Form Data:', values);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-cover bg-center w-full bg-black">
            <div className="w-full max-w-screen-xl h-auto lg:h-[34rem] bg-violet-300 shadow-lg flex flex-col lg:flex-row">
                {/* Left Section */}
                <div className="flex-1 bg-gradient-to-b from-white to-primary w-full h-full flex flex-col justify-around items-center p-6">
                    <img
                        src={LogoImg}
                        alt="Logo"
                        className="w-[60%] sm:w-[50%] lg:w-[70%] h-auto max-w-[280px] object-contain mb-4"
                    />
                    <p className="text-gray-700 font-medium text-sm sm:text-md leading-6 text-center lg:text-left lg:w-2/3 px-4 py-2">
                        Effortlessly manage job drives and events with the Softroniics Hiring Panel.
                        Create events, manage users, send notifications, and track reports—all in one place.
                        Log in to get started!
                    </p>

                    <div className="flex flex-col w-11/12 lg:w-2/3 mt-6 ps-3">
                        <p className="text-xs sm:text-sm text-black font-medium text-center lg:text-left">
                            Powered by: Softroniics
                        </p>
                        <p className="text-xs sm:text-sm text-black font-medium text-center lg:text-left">
                            Version: 1.0
                        </p>
                    </div>
                </div>

                {/* Right Section */}
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
                                        aria-label="Email"
                                        aria-required="true"
                                    />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="text-red-500 font-medium text-xs mb-4"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <Field
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                        className={`shadow appearance-none pb-4 border-black rounded-full w-full bg-black text-white py-2.5 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password && touched.password ? '' : 'mb-4'
                                            }`}
                                    />
                                    <ErrorMessage
                                        name="password"
                                        component="div"
                                        className="text-red-500 text-xs mb-4 font-medium"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="font-medium mt-14 w-full bg-orange text-white py-2.5 px-3 rounded-md hover:bg-orange-600 focus:outline-none focus:shadow-outline mb-1"
                                >
                                    Sign In
                                </button>
                                <div className="w-11/12 sm:w-10/12 lg:w-2/3 flex flex-col">
                                    <div className="w-auto">
                                        <Link
                                            to="/forgot-password"
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
                        to="/forgot-password"
                        className="text-black text-center text-sm sm:text-md lg:text-left"
                    >
                        Need help? Contact support.
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
