import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faGaugeHigh, faUserLock, faStopwatch, faCalendarCheck, faGear, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LogoImg from '../../assets/Logo.png';
import Dashboard from '../dashboard/Index';
import RoleManagement from '../administation/roleManagement/RoleManagement';
import UserManagement from '../administation/userManagement/UserManagement';
import Authentication from '../administation/authentication/authentication';
import { getRole } from '../../service/api/api';
import { handleAddPermissions } from '../../redux/rolePrevilages/permissionsSlice';
import { setActiveTab } from '../../redux/tabContents/tabSlice';

const Avatar = () => (
    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
        <span className="text-sm font-semibold text-gray-700">Super Man</span>
    </div>
);

const Index = () => {
    const { permissions } = useSelector((state) => state.adminPermissions);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState('Dashboard');
    const [openSubMenu, setOpenSubMenu] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate();


    const handleFetchPermission = async () => {

        const roleId = localStorage.getItem('id')

        if (!roleId) {
            alert('session expired, login again')
            navigate('/')
            return
        }

        try {
            const response = await getRole(roleId)

            if (response.status === 200) {
                dispatch(handleAddPermissions(response?.data.permissions))
            } 
        } catch (error) {
            console.log("permission error", error);
        }
    }

    useEffect(() => {
        handleFetchPermission()
    }, [])



    const hasPermission = (menuId, subModule = null) => {
        if (!permissions || !permissions[0]) return false;

        const permissionGroup = permissions[0][menuId];
        if (!permissionGroup) return false;

        if (!subModule) {
            // For main menu items, check if any submodule has read permission
            return permissionGroup.some(module => module.read === true);
        }

        const modulePermission = permissionGroup.find(module =>
            module.module.toLowerCase() === subModule.toLowerCase()
        );
        return modulePermission?.read === true;
    };

    const menuItems = [
        {
            id: 'dashboard',
            name: 'Dashboard',
            icon: faGaugeHigh,
            href: '/admin/',
            permissionModule: 'dashboardManagement'
        },
        {
            id: 'administration',
            name: 'Administration',
            icon: faUserLock,
            href: '#',
            subMenu: [
                {
                    id: 'authentication',
                    name: 'Authentication',
                    href: '/admin/authentication',
                    permissionModule: 'authentication'
                },
                {
                    id: 'role-management',
                    name: 'Role Management',
                    href: '/admin/role-management',
                    permissionModule: 'roleManagement'
                },
                {
                    id: 'user-management',
                    name: 'User Management',
                    href: '/admin/user-management',
                    permissionModule: 'userManagement'
                }
            ]
        },
        {
            id: 'jobManagement',
            name: 'Job Management',
            icon: faStopwatch,
            href: '#',
            subMenu: [
                {
                    id: 'company-management',
                    name: 'Company Management',
                    href: '/home/company',
                    permissionModule: 'companyManagement'
                },
                {
                    id: 'job-openings',
                    name: 'Job Openings',
                    href: '/home/job-openings',
                    permissionModule: 'job'
                },
                {
                    id: 'candidate-list',
                    name: 'Candidate List',
                    href: '/home/candidates',
                    permissionModule: 'candidateManagement'
                }
            ]
        },
        {
            id: 'eventManagement',
            name: 'Event Management',
            icon: faCalendarCheck,
            href: '#',
            subMenu: [
                {
                    id: 'event',
                    name: 'Event',
                    href: '/home/event',
                    permissionModule: 'eventManagement'
                },
                {
                    id: 'user-registration',
                    name: 'User Registration',
                    href: '/home/registration',
                    permissionModule: 'eventUserManagement'
                }
            ]
        },
        {
            id: 'settings',
            name: 'Settings',
            icon: faGear,
            href: '#',
            subMenu: [
                {
                    id: 'country',
                    name: 'Country',
                    href: '/home/country',
                    permissionModule: 'countryManagement'
                },
                {
                    id: 'state',
                    name: 'State',
                    href: '/home/state',
                    permissionModule: 'stateManagement'
                },
                {
                    id: 'district',
                    name: 'District',
                    href: '/home/district',
                    permissionModule: 'districtManagement'
                },
                {
                    id: 'faq',
                    name: 'FAQ',
                    href: '/home/faq',
                    permissionModule: 'faq'
                },
                {
                    id: 'static-pages',
                    name: 'Static Pages',
                    href: '/home/static-pages',
                    permissionModule: 'staticPages'
                },
                {
                    id: 'notification',
                    name: 'Notification',
                    href: '/home/notification',
                    permissionModule: 'notification'
                },
                {
                    id: 'common-settings',
                    name: 'Common Settings',
                    href: '/home/common-settings',
                    permissionModule: 'commonSettings'
                }
            ]
        }
    ];

    const filteredMenuItems = menuItems.map(item => {
        if (item.subMenu) {
            const filteredSubMenu = item.subMenu.filter(subItem =>
                hasPermission(item.id, subItem.permissionModule)
            );

            // Only include main menu if it has visible submenu items
            if (filteredSubMenu.length > 0) {
                return { ...item, subMenu: filteredSubMenu };
            }
            return null;
        }

        // For main menu items without submenu
        return hasPermission(item.id, item.permissionModule) ? item : null;
    }).filter(Boolean);

    const handleMenu = (itemName) => {
        setSelectedMenu(itemName);
        dispatch(setActiveTab('list'));
    };

    const handleSubMenuToggle = (parentId) => {
        setOpenSubMenu(openSubMenu === parentId ? null : parentId);
    };

    const handleLogout = () => {
        alert('logout');
    };

    return (
        <>
            {/* Navbar */}
            <nav className="fixed top-0 z-50 w-full bg-gradient-to-r from-white to-primary border-b border-black">
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
                            <Link to="/admin/" className="flex ms-2">
                                <img
                                    src={LogoImg}
                                    alt="Logo"
                                    className="w-[60%] sm:w-[50%] lg:w-[70%] h-auto max-w-[280px] object-contain mb-0"
                                />
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
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
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} bg-stone-700 border-r border-black sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto flex flex-col">
                    <ul className="mt-4 space-y-2 font-medium flex-1">
                        {filteredMenuItems.map((item) => (
                            <li key={item.id}>
                                <div
                                    onClick={() => {
                                        if (item.subMenu) {
                                            handleSubMenuToggle(item.id);
                                        } else {
                                            handleMenu(item.name);
                                        }
                                    }}
                                    className={`group hover:scale-80 hover:shadow-lg hover:opacity-90 transition-transform duration-300 rounded-lg ${selectedMenu === item.name ? ' text-primary' : 'text-white'}`}
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
                                            <span className="ml-auto text-white">
                                                <FontAwesomeIcon
                                                    icon={faChevronRight}
                                                    className={`transform transition-transform duration-300 ${openSubMenu === item.id ? 'rotate-90' : ''}`}
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
                                                className={`hover:scale-80 hover:shadow-lg hover:opacity-90 transition-transform duration-300 rounded-lg ${selectedMenu === subItem.name ? 'bg-orange-500 text-primary' : 'text-white'}`}
                                            >
                                                <Link
                                                    to={subItem.href}
                                                    onClick={() => handleMenu(subItem.name)}
                                                    className="flex items-center p-2 font-light rounded-lg group-hover:text-gray-800"
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

                    <ul className="mt-auto">
                        <li className="hover:bg-gray-200 rounded-lg text-white">
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center p-2 text-md font-medium rounded-lg group-hover:text-gray-500"
                            >
                                <FontAwesomeIcon icon={faSignOutAlt} className="w-5 h-5 text-primary" />
                                <span className="ms-3">Logout</span>
                            </button>
                        </li>
                    </ul>
                </div>
            </aside>

            {/* Main Content */}
            <main className={`p-0 sm:ml-64 mt-16 md:mt-[74px] bg-gray-100 text-gray-800 `}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="role-management" element={<RoleManagement />} />
                    <Route path="user-management" element={<UserManagement />} />
                    <Route path="authentication" element={<Authentication />} />
                </Routes>
            </main>
        </>
    );
};

export default Index;