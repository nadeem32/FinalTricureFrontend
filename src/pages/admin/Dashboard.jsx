import React, { useState, useEffect } from 'react';
import { getCustomers, getProducts, getInquiries } from '../../services/api';
import {
    UserGroupIcon,
    BeakerIcon,
    InboxIcon,
    CheckCircleIcon
} from '@heroicons/react/24/outline';

const Dashboard = () => {
    const [stats, setStats] = useState({
        customers: 0,
        products: 0,
        inquiries: 0
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [custRes, prodRes, inqRes] = await Promise.all([
                    getCustomers(),
                    getProducts(),
                    getInquiries()
                ]);
                setStats({
                    customers: custRes.data.length,
                    products: prodRes.data.length,
                    inquiries: inqRes.data.filter(i => !i.isRead).length
                });
            } catch (error) {
                console.error("Error fetching dashboard stats", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-blue-100 text-primary">
                        <UserGroupIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Total Customers</p>
                        <p className="text-2xl font-bold text-slate-800">{stats.customers}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-violet-100 text-accent">
                        <BeakerIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Active Products</p>
                        <p className="text-2xl font-bold text-slate-800">{stats.products}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex items-center space-x-4">
                    <div className="p-3 rounded-xl bg-amber-100 text-amber-600">
                        <InboxIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">New Inquiries</p>
                        <p className="text-2xl font-bold text-slate-800">{stats.inquiries}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold text-slate-900 mb-4">System Status</h2>
                <div className="flex items-center text-green-600">
                    <CheckCircleIcon className="w-6 h-6 mr-2" />
                    <span className="font-medium">All systems operational</span>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
