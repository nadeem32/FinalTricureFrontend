import React, { useState, useEffect } from 'react';
import { getCompanySettings, updateCompanySettings } from '../services/api';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        missionStatement: '',
        history: '',
        email: '',
        phone: '',
        address: '',
        facebookUrl: '',
        linkedinUrl: '',
        twitterUrl: ''
    });
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const response = await getCompanySettings();
            setSettings(response.data);
        } catch (error) {
            console.error('Error loading settings:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCompanySettings(settings);
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Settings</h1>
            <p className="text-slate-500 mb-8">Update company information and website content.</p>

            <div className="glass-panel rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Mission Statement</label>
                        <textarea
                            rows={3}
                            value={settings.missionStatement}
                            onChange={(e) => setSettings({ ...settings, missionStatement: e.target.value })}
                            className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary"
                        />
                        <p className="text-xs text-slate-400 mt-1">Displayed in the Footer and Home page.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Company History</label>
                        <textarea
                            rows={5}
                            value={settings.history}
                            onChange={(e) => setSettings({ ...settings, history: e.target.value })}
                            className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary"
                        />
                        <p className="text-xs text-slate-400 mt-1">Displayed on the Home page.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                value={settings.email}
                                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                                className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                            <input
                                type="text"
                                value={settings.phone}
                                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                                className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                            <input
                                type="text"
                                value={settings.address}
                                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                                className="w-full rounded-lg border-slate-300 focus:border-primary focus:ring-primary"
                            />
                        </div>
                    </div>

                    <div className="pt-4 flex items-center justify-between">
                        <button
                            type="submit"
                            className="px-8 py-3 bg-primary text-white rounded-lg font-medium shadow-lg hover:bg-primary-dark transition-all"
                        >
                            Save Changes
                        </button>
                        {saved && (
                            <div className="flex items-center text-green-600 animate-fade-in">
                                <CheckCircleIcon className="w-5 h-5 mr-2" />
                                <span>Settings saved successfully!</span>
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminSettings;
