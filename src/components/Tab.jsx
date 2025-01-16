import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/tabContents/tabSlice";
import { useLocation } from 'react-router-dom';

const Tab = ({ tabs, tabContent }) => {
    const { activeTab } = useSelector((state) => state.tabContent);
    const dispatch = useDispatch();
    const location = useLocation();
    const { pathname } = location;
    const [urlName] = useState(pathname.split('/')[2]);
    const { permissions } = useSelector((state) => state.adminPermissions);

    const currentPage = pathname?.split('/')[2] || '';

    const getPermissionModule = (page) => {
        if (!page) return '';
        return page
            .split('-')
            .map((word, index) =>
                index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join('');
    };

    const getModulePermissions = () => {
        const module = getPermissionModule(currentPage);
        if (!module || !permissions?.[0]) return null;

        for (const section of Object.values(permissions[0])) {
            const modulePermissions = section.find(item => item.module === module);
            if (modulePermissions) {
                return modulePermissions;
            }
        }
        return null;
    };

    const modulePermissions = getModulePermissions();

    const toTitleCase = (str) => {
        return str
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    return (
        <div className="w-full mx-auto bg-black p-2">
            <div className="p-5">
                <h1 className="font-bold text-4xl text-white">{toTitleCase(urlName)}</h1>
                <div className="flex">
                    <p className="text-primary">Dashboard</p>
                    <p className="text-slate-500 ms-2">{toTitleCase(urlName)}</p>
                </div>
            </div>

            <div className="ms-4">
                <ul className="flex flex-wrap -mb-px" role="tablist">
                    {tabs.map((tab) => {
                        // Only show the "add" tab if the "add" permission is true
                        if (tab.id === 'add' && !modulePermissions?.add) {
                            return null;
                        }
                        return (
                            <li key={tab.id} className="" role="presentation">
                                <button
                                    className={`px-2 py-2 inline-block text-slate-200 hover:border-gray-300 rounded-sm text-lg font-small text-center border-transparent ${activeTab === tab.id
                                        ? "text-white bg-black ring-1 ring-white"
                                        : "ring-1 ring-white bg-gray text-gray-600"
                                        }`}
                                    onClick={() => dispatch(setActiveTab(tab.id))}
                                    type="button"
                                    role="tab"
                                    aria-controls={tab.id}
                                    aria-selected={activeTab === tab.id}
                                >
                                    {tab.label}
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>
            <div>
                <div
                    className="p-4 h-auto rounded-lg bg-black text-white"
                    role="tabpanel"
                    aria-labelledby={`${activeTab}-tab`}
                >
                    {tabContent[activeTab]}
                </div>
            </div>
        </div>
    );
};

export default Tab;
