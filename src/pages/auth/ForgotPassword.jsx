import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../service/api/auth';


function ForgotPassword() {

    const initialValues = {
        email: '',
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email is required')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Email must be a valid format (e.g., example@domain.com)'
            ),
    });
    

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            setSubmitting(true);
            const response = await forgotPassword(values);

            console.log(response?.data);

            if (response?.status === 200) {
                alert('mail send to email')
            } else if (response?.status === 400) {
                setErrors({ email: 'Invalid input or missing fields' });
            } else if (response?.status === 404) {
                alert('User not found')
                // setErrors({ password: 'Invalid credentials' });
            } else if (response?.status === 451) {
                alert('Mail not send')
            } else {
                setErrors({ email: 'Login failed. Please try again later.' });
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrors({ email: 'An unexpected error occurred. Please try again later.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex-1 bg-white w-full h-full flex items-center justify-between flex-col p-6">
            <div className="w-11/12 sm:w-10/12 lg:w-2/3 flex flex-col mt-8 sm:mt-14">
                <p className="text-gray-800 font-semibold text-3xl sm:text-3xl">Forgot Password!</p>
                <p className="text-sm text-gray-600 mb-6 mt-2">
                    Please provide your registered email address, and we will send you instructions to reset your password.
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

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="font-medium mt-14 w-full bg-orange text-white py-2.5 px-3 rounded-md hover:bg-orange-600 focus:outline-none focus:shadow-outline mb-1"
                        >
                            {isSubmitting ? 'Processing...' : 'Submit'}
                        </button>
                        <div className="w-11/12 sm:w-10/12 lg:w-2/3 flex flex-col">
                            <div className="w-auto">
                                <Link
                                    to="/"
                                    className="text-black hover:underline text-center text-xs sm:text-sm lg:text-left"
                                >
                                    Back to Login
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
    )
}

export default ForgotPassword