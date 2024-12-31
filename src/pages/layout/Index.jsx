import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../redux/darkMode/darkModeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faChevronRight, faGaugeHigh, faUserLock, faStopwatch, faCalendarCheck, faGear } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LogoImg from '../../assets/Logo.png';
import Dashboard from '../dashboard/Index';
import Login from '../auth/Login';

const Avatar = () => (
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-700">A</span>
    </div>
);

const Index = () => {
    const dispatch = useDispatch();
    const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('Dashboard');
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const location = useLocation();

    console.log(location);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    const menuItems = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            icon: faGaugeHigh,
            href: '/admin/dashboard'
        },
        {
            id: 'administration',
            name: 'Administration',
            icon: faUserLock,
            href: '#',
            subMenu: [
                { id: 'authentication', name: 'Authentication', href: '/admin/dashboard' },
                { id: 'role-management', name: 'Role Management', href: '/admin/dashboard' },
                { id: 'user-management', name: 'User Management', href: '/home/user' }
            ]
        },
        {
            id: 'job-management',
            name: 'Job Management',
            icon: faStopwatch,
            href: '#',
            subMenu: [
                { id: 'company-management', name: 'Company Management', href: '/home/company' },
                { id: 'job-openings', name: 'Job Openings', href: '/home/job-openings' },
                { id: 'candidate-list', name: 'Candidate List', href: '/home/candidates' }
            ]
        },
        {
            id: 'event-management',
            name: 'Event Management',
            icon: faCalendarCheck,
            href: '#',
            subMenu: [
                { id: 'event', name: 'Event', href: '/home/event' },
                { id: 'user-registration', name: 'User Registration', href: '/home/registration' }
            ]
        },
        {
            id: 'settings',
            name: 'Settings',
            icon: faGear,
            href: '#',
            subMenu: [
                { id: 'country', name: 'Country', href: '/home/country' },
                { id: 'state', name: 'State', href: '/home/state' },
                { id: 'district', name: 'District', href: '/home/district' },
                { id: 'faq', name: 'FAQ', href: '/home/faq' },
                { id: 'static-pages', name: 'Static Pages', href: '/home/static-pages' },
                { id: 'notification', name: 'Notification', href: '/home/notification' },
                { id: 'common-settings', name: 'Common Settings', href: '/home/common-settings' }
            ]
        }
    ];

    const handleMenu = (itemName) => {
        setSelectedMenu(itemName);
    };

    const handleSubMenuToggle = (parentId) => {
        setOpenSubMenu(openSubMenu === parentId ? null : parentId);
    };

    const handleLogout = () => {
        // Add your logout logic here
    };

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-white to-primary border-b border-gray-200">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                            >
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                            <a href="/home/dashboard" className="flex ms-2">
                                <img
                                    src={LogoImg}
                                    alt="Logo"
                                    className="w-[60%] sm:w-[50%] lg:w-[70%] h-auto max-w-[280px] object-contain mb-0"
                                />
                            </a>
                        </div>
                        <div className="flex items-center space-x-4">
                            {/* <button
                                onClick={() => dispatch(toggleDarkMode())}
                                className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
                            >
                                {isDarkMode ? (
                                    <>
                                        <FontAwesomeIcon icon={faSun} className="me-2" />
                                        Light Mode
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faMoon} className="me-2" />
                                        Dark Mode
                                    </>
                                )}
                            </button> */}
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center text-sm bg-gray-100 rounded-full focus:ring-4 focus:ring-gray-300"
                                aria-expanded={userMenuOpen}
                            >
                                <Avatar />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>


            {/* Sidebar */}
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-stone-700 border-r border-gray-200 sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col">
                    <ul className="mt-4 space-y-2 font-medium flex-1">
                        {menuItems.map((item) => (
                            <li key={item.id}>
                                <div
                                    onClick={() => {
                                        if (item.subMenu) {
                                            handleSubMenuToggle(item.id);
                                        } else {
                                            handleMenu(item.name);
                                        }
                                    }}
                                    className={`group hover:bg-gray-200 rounded-lg ${selectedMenu === item.name ? ' text-primary' : 'text-white'}`}
                                >
                                    <Link
                                        to={item.href}
                                        className="flex items-center p-2 font-normal rounded-lg group-hover:text-gray-500"
                                    >
                                        <FontAwesomeIcon
                                            icon={item.icon}
                                            className="w-5 h-5 text-primary"
                                        />
                                        <span className="ms-3">{item.name}</span>
                                        {item.subMenu && (
                                            <span className="ml-auto text-white " >
                                                <FontAwesomeIcon icon={faChevronRight}
                                                    className={` transform transition-transform duration-300 ${openSubMenu === item.id ? 'rotate-90' : ''}`}
                                                />
                                            </span>
                                        )}
                                    </Link>
                                </div>


                                {item.subMenu && openSubMenu === item.id && (
                                    <ul className="pl-6 mt-2 space-y-2">
                                        {item.subMenu.map((subItem) => (
                                            <li
                                                key={subItem.id}
                                                className={`hover:bg-gray-200 rounded-lg ${selectedMenu === subItem.name ? 'bg-orange-500 text-primary' : 'text-white'
                                                    }`}
                                            >
                                                <Link
                                                    to={subItem.href}
                                                    onClick={() => handleMenu(subItem.name)}
                                                    className="flex  items-center p-2 font-light rounded-lg group-hover:text-gray-800"
                                                >
                                                    <span className="ms-3">{subItem.name}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>


            {/* Main Content */}
            <main className={`p-0 sm:ml-64 mt-16 md:mt-[73px] bg-gray-100 text-gray-800`}>
                <Routes>
                    <Route index element={<Dashboard />} />
                    <Route path="dashboard" element={<Dashboard />} />
                </Routes>
            </main>
        </>
    );
};

export default Index;
