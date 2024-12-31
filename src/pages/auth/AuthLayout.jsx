import React, { useState } from 'react';
import LogoImg from '../../assets/Logo.png';
import {  Route, Routes } from 'react-router-dom';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import Resetpassword from './Resetpassword';

function AuthLayout() {

    const [version,_]=useState({
        name : "Softroniics",
        version:"1.0"
    })


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
                            Powered by: {version?.name}
                        </p>
                        <p className="text-xs sm:text-sm text-black font-medium text-center lg:text-left">
                            Version: {version?.version}
                        </p>
                    </div>
                </div>

                <>
                    <Routes>
                        <Route index element={<Login />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="reset-password/:token" element={<Resetpassword />} />
                    </Routes>
                </>
            </div>
        </div>
    );
};
export default AuthLayout