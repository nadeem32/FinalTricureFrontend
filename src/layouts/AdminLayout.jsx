import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
    HomeIcon,
    UsersIcon,
    BeakerIcon,
    Cog6ToothIcon,
    ChatBubbleLeftRightIcon,
    QuestionMarkCircleIcon,
    BriefcaseIcon,
    UserGroupIcon,
    InboxIcon,
    ArrowRightOnRectangleIcon
} from '@heroicons/react/24/outline';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // const handleLogout = () => {
    //     localStorage.removeItem('isAuthenticated');
    //     navigate('/');
    // };

    const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    navigate('/login', { replace: true });
};


    const menuItems = [
        { name: 'Dashboard', path: '/admin', icon: HomeIcon },
        { name: 'Services', path: '/admin/services', icon: BriefcaseIcon },
        { name: 'Team', path: '/admin/team', icon: UserGroupIcon },
        { name: 'Products', path: '/admin/products', icon: BeakerIcon },
        { name: 'Customers', path: '/admin/customers', icon: UsersIcon },
        { name: 'Content (FAQ/Reviews)', path: '/admin/content', icon: ChatBubbleLeftRightIcon },
        { name: 'Inquiries', path: '/admin/inquiries', icon: InboxIcon },
        { name: 'Settings', path: '/admin/settings', icon: Cog6ToothIcon },
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white fixed h-full z-20 hidden md:block">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                        Tricore Admin
                    </h1>
                </div>
                <nav className="mt-6 px-4 space-y-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center px-4 py-3 rounded-lg transition-colors ${location.pathname === item.path
                                ? 'bg-primary text-white'
                                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5 mr-3" />
                            <span className="font-medium">{item.name}</span>
                        </Link>
                    ))}
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-3 rounded-lg text-slate-400 hover:bg-red-900/20 hover:text-red-500 transition-colors mt-8"
                    >
                        <ArrowRightOnRectangleIcon className="w-5 h-5 mr-3" />
                        <span className="font-medium">Logout</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
