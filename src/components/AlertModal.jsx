import React from "react";
import TimerIcon from "../assets/Timeout.svg";

function AlertModal({ isOpen, onConfirm, message, label }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-zinc-800 rounded-lg shadow-sm bg-gray-700 p-6 w-full max-w-md">
                <div className="text-center flex flex-col items-center">
                    <div className="flex justify-center align-center">
                        <img src={TimerIcon} alt="icon" className="w-10 h-10  text-white" />
                        <h3 className="mt-1 ms-3 text-lg font-bold text-slate-200">
                            {label}
                        </h3>
                    </div>

                    <h2 className="mb-5 mt-4 text-lg font-normal text-slate-200">
                        {message}
                    </h2>

                    {/* Buttons */}
                    <div className="flex justify-end align-middle">
                        <button
                            type="button"
                            className="text-white bg-primary hover:bg-orange focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5"
                            onClick={onConfirm}
                        >
                            Ok, Got it!
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AlertModal;
