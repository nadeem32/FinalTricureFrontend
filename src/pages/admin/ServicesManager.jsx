import React, { useState, useEffect } from 'react';
import { getServices, createService, deleteService } from '../../services/api';
import { PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

const ServicesManager = () => {
    const [services, setServices] = useState([]);
    const [newService, setNewService] = useState({ title: '', description: '', icon: 'CodeBracketIcon' });

    useEffect(() => {
        loadServices();
    }, []);

    const loadServices = async () => {
        const res = await getServices();
        setServices(res.data);
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        await createService(newService);
        setNewService({ title: '', description: '', icon: 'CodeBracketIcon' });
        loadServices();
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this service?')) {
            await deleteService(id);
            loadServices();
        }
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage Services</h1>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-8">
                <h2 className="text-lg font-semibold mb-4">Add New Service</h2>
                <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        type="text"
                        placeholder="Service Title"
                        className="rounded-lg border-slate-300"
                        value={newService.title}
                        onChange={e => setNewService({ ...newService, title: e.target.value })}
                        required
                    />
                    <select
                        className="rounded-lg border-slate-300"
                        value={newService.icon}
                        onChange={e => setNewService({ ...newService, icon: e.target.value })}
                    >
                        <option value="CodeBracketIcon">Code Icon</option>
                        <option value="BeakerIcon">Lab Icon</option>
                        <option value="CloudIcon">Cloud Icon</option>
                        <option value="CpuChipIcon">Chip Icon</option>
                    </select>
                    <textarea
                        placeholder="Description"
                        className="rounded-lg border-slate-300 md:col-span-2"
                        value={newService.description}
                        onChange={e => setNewService({ ...newService, description: e.target.value })}
                        required
                    />
                    <button type="submit" className="bg-primary text-white py-2 px-4 rounded-lg md:col-span-2 flex justify-center items-center">
                        <PlusIcon className="w-5 h-5 mr-2" /> Add Service
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => (
                    <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative group">
                        <button
                            onClick={() => handleDelete(service.id)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>
                        <h3 className="font-bold text-lg mb-2">{service.title}</h3>
                        <p className="text-slate-500 text-sm">{service.description}</p>
                        <span className="inline-block mt-4 text-xs bg-slate-100 px-2 py-1 rounded text-slate-600">Icon: {service.icon}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServicesManager;
