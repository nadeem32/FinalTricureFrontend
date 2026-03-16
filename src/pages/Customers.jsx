import React, { useState, useEffect } from 'react';
import { getCustomers, createCustomer, deleteCustomer } from '../services/api';
import { TrashIcon, PlusIcon, UserPlusIcon } from '@heroicons/react/24/outline';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({ name: '', email: '', companyName: '', phone: '', address: '', notes: '', logoUrl: '' });
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const response = await getCustomers();
            setCustomers(response.data);
        } catch (error) {
            console.error('Error loading customers:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createCustomer(newCustomer);
            setNewCustomer({ name: '', email: '', companyName: '', phone: '', address: '', notes: '', logoUrl: '' });
            setShowForm(false);
            loadCustomers();
        } catch (error) {
            console.error('Error creating customer:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await deleteCustomer(id);
                loadCustomers();
            } catch (error) {
                console.error('Error deleting customer:', error);
            }
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Customer Management</h1>
                    <p className="text-slate-500 mt-1">Manage your client relationships</p>
                </div>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30"
                >
                    {showForm ? 'Cancel' : <><UserPlusIcon className="w-5 h-5 mr-2" /> Add Customer</>}
                </button>
            </div>

            {showForm && (
                <div className="glass-panel rounded-2xl p-8 mb-8 animate-fade-in">
                    <h2 className="text-xl font-semibold mb-6 text-slate-800">New Customer Details</h2>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-2">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input type="text" required value={newCustomer.name} onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input type="email" value={newCustomer.email} onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                            <input type="text" value={newCustomer.companyName} onChange={(e) => setNewCustomer({ ...newCustomer, companyName: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input type="text" value={newCustomer.phone} onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Logo URL</label>
                            <input type="text" placeholder="https://example.com/logo.png" value={newCustomer.logoUrl || ''} onChange={(e) => setNewCustomer({ ...newCustomer, logoUrl: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                            <input type="text" value={newCustomer.address} onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })} className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                            <textarea value={newCustomer.notes} onChange={(e) => setNewCustomer({ ...newCustomer, notes: e.target.value })} rows={3} className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary" />
                        </div>
                        <div className="sm:col-span-2 pt-4">
                            <button type="submit" className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-medium shadow-lg hover:shadow-xl transition-all">
                                Save Customer
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {customers.map((customer) => (
                    <div key={customer.id} className="glass-card rounded-xl p-6 relative group">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-4">
                                {customer.logoUrl ? (
                                    <img src={customer.logoUrl} alt={customer.companyName} className="h-12 w-12 rounded-full object-cover border border-slate-200" />
                                ) : (
                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center text-primary font-bold text-lg">
                                        {customer.name[0]}
                                    </div>
                                )}
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">{customer.name}</h3>
                                    <p className="text-sm text-slate-500">{customer.companyName || 'Individual'}</p>
                                </div>
                            </div>
                            <button onClick={() => handleDelete(customer.id)} className="text-slate-400 hover:text-red-500 transition-colors">
                                <TrashIcon className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="mt-6 space-y-2">
                            <p className="text-sm text-slate-600 flex items-center">
                                <span className="w-20 text-slate-400">Email:</span> {customer.email || 'N/A'}
                            </p>
                            <p className="text-sm text-slate-600 flex items-center">
                                <span className="w-20 text-slate-400">Phone:</span> {customer.phone || 'N/A'}
                            </p>
                            <p className="text-sm text-slate-600 flex items-center">
                                <span className="w-20 text-slate-400">Address:</span> <span className="truncate">{customer.address || 'N/A'}</span>
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {customers.length === 0 && !loading && (
                <div className="text-center py-20">
                    <p className="text-slate-500 text-lg">No customers found. Start by adding one!</p>
                </div>
            )}
        </div>
    );
};

export default Customers;
