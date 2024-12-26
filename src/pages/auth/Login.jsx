import React, { useState } from 'react';
import LogoImg from '../../assets/Logo.png';
import { Link } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleForm = (e) => {
        const { id, value } = e.target;

        setForm({
            ...form,
            [id]: value
        })

    }

    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(form);

    }
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

                <div className="flex-1 bg-white w-full h-full flex items-center justify-between flex-col p-6">
                    <div className="w-11/12 sm:w-10/12 lg:w-2/3 flex flex-col mt-8 sm:mt-14">
                        <p className="text-gray-800 font-semibold text-3xl sm:text-3xl">Welcome back!</p>
                        <p className="mt-2 text-start font-medium text-gray-900 text-sm sm:text-base">
                            Please sign in to continue
                        </p>
                    </div>

                    <form className="flex flex-col w-11/12 sm:w-10/12 lg:w-2/3" onSubmit={handleSubmit}>
                        <input
                            className="shadow appearance-none pb-4 border-black rounded-full w-full py-2.5 px-3 bg-black text-white leading-tight focus:outline-none focus:shadow-outline mb-4"
                            id="email"
                            type="email"
                            placeholder="Email"
                            aria-label="Email"
                            onChange={handleForm}
                        />
                        <input
                            className="shadow appearance-none pb-4 border-black rounded-full w-full bg-black text-white py-2.5 px-3 leading-tight focus:outline-none focus:shadow-outline mb-4"
                            id="password"
                            type="password"
                            placeholder="Password"
                            aria-label="Password"
                            onChange={handleForm}
                        />
                    </form>

                    <div className="w-11/12 sm:w-10/12 lg:w-2/3 flex flex-col mt-6">
                        <button onClick={handleSubmit} className="w-full bg-orange text-white py-2.5 px-3 rounded-md hover:bg-orange-600 focus:outline-none focus:shadow-outline mb-1">
                            Sign In
                        </button>
                        <div className="w-auto">
                            <Link
                                to="/forgot-password"
                                className="text-black hover:underline text-center text-xs sm:text-sm lg:text-left"
                            >
                                Forgot Password?
                            </Link>
                        </div>
                    </div>

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
}

export default Login;
