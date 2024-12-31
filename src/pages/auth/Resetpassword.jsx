import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../service/api/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

function Resetpassword() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { token } = useParams();

    console.log(token);
    

    const initialValues = {
        password: '',
        confirmPassword: ''
    };

    const navigate = useNavigate();

    const validationSchema = Yup.object({
        password: Yup.string()
            .min(4, 'Password must be at least 4 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required')
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {

        if(!token){
            alert('token is missing')
            return
        }
        try {
            setSubmitting(true);
            const response = await resetPassword(values,token);

            if (response?.status === 200) {
                alert('reset success')
                navigate('/')
            } else if (response?.status === 400) {
                setErrors({ password: 'Invalid input or missing fields' });
            } else if (response?.status === 401) {
                alert('session expired')
                // setErrors({ password: 'Invalid credentials' });
            } else if (response?.status === 404) {
                alert('user not found')
            } else {
                setErrors({ password: 'Reset failed. Please try again later.' });
            }
        } catch (error) {
            console.error('Error:', error);
            setErrors({ password: 'An unexpected error occurred.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="flex-1 bg-white w-full h-full flex items-center justify-between flex-col p-6">
            <div className="w-11/12 sm:w-10/12 lg:w-2/3 flex flex-col mt-8 sm:mt-14">
                <p className="text-gray-800 font-semibold text-3xl sm:text-3xl">Reset Password!</p>
                <p className="text-sm text-gray-600 mb-6 mt-2">
                    Please enter your new password and confirm it to reset your password.
                </p>
            </div>

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form className="flex flex-col w-11/12 sm:w-10/12 lg:w-2/3">
                        <div className="flex flex-col relative">
                            <Field
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className={`shadow appearance-none border-black rounded-full w-full bg-black text-white py-2.5 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password && touched.password ? '' : 'mb-4'}`}
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
                                <FontAwesomeIcon  className='pb-2' icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
                        <div className="flex flex-col relative">
                            <Field
                                name="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                className={`shadow appearance-none border-black rounded-full w-full bg-black text-white py-2.5 px-3 leading-tight focus:outline-none focus:shadow-outline ${errors.confirmPassword && touched.confirmPassword ? '' : 'mb-4'}`}
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-red-500 text-xs mb-4 font-medium"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-4 top-3 text-white focus:outline-none"
                            >
                                <FontAwesomeIcon className='pb-2' icon={showConfirmPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="font-medium mt-14 w-full bg-orange text-white py-2.5 px-3 rounded-md hover:bg-orange-600 focus:outline-none focus:shadow-outline mb-1"
                        >
                            {isSubmitting ? 'Processing...' : 'Submit'}
                        </button>
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
    );
}

export default Resetpassword;
