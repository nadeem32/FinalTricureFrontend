import React, { useState, useEffect } from 'react';
import { getCompanySettings } from '../services/api';

const Footer = () => {
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        getCompanySettings().then(res => setSettings(res.data)).catch(console.error);
    }, []);

    if (!settings) return null;

    return (
        <footer className="bg-slate-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                            Tricore Innovations
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {settings.missionStatement}
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
                        <div className="space-y-2 text-slate-400 text-sm">
                            <p>Email: {settings.email}</p>
                            {/* <p>Phone: {settings.phone}</p>
                            <p>Address: {settings.address}</p> */}
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <div className="space-y-2">
                            <a href="/" className="block text-slate-400 hover:text-primary transition-colors">Home</a>
                            <a href="/services" className="block text-slate-400 hover:text-primary transition-colors">Services</a>
                            <a href="/about" className="block text-slate-400 hover:text-primary transition-colors">About Us</a>
                            <a href="/contact" className="block text-slate-400 hover:text-primary transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Tricore Innovations. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
