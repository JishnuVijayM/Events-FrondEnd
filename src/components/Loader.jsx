import React from 'react';

const Loader = ({ isLoading, children }) => {
    if (!isLoading) return children;

    return (
        <div className="relative">
            <div className={`${isLoading ? 'opacity-50' : ''}`}>
                {children}
            </div>

            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="w-10 h-10 border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
                </div>
            )}
        </div>
    );
};

export default Loader;