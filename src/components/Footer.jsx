import React from 'react';
// import { useState, useEffect } from 'react';
// import { getCompanySettings } from '../services/api';

const COMPANY_EMAIL    = 'info@tricoreinnovations.com';
const COMPANY_TAGLINE  = "Engineering tomorrow's digital solutions for enterprises across every industry.";

const Footer = () => {
    // -- DB-driven settings (commented out until CMS is ready) --
    // const [settings, setSettings] = useState(null);
    // useEffect(() => {
    //     getCompanySettings().then(res => setSettings(res.data)).catch(console.error);
    // }, []);
    // if (!settings) return null;

    return (
        <footer className="bg-slate-950 border-t border-white/[0.06] text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2.5 mb-5">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-glow-sm">
                                T
                            </div>
                            <span className="text-xl font-bold font-display">
                                Tricore<span className="text-blue-400">Innovations</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            {COMPANY_TAGLINE}
                        </p>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-[0.08em] mb-5">Contact Us</h4>
                        <div className="space-y-2 text-slate-400 text-sm">
                            <p>Email: {COMPANY_EMAIL}</p>
                            {/* <p>Phone: {settings.phone}</p>
                            <p>Address: {settings.address}</p> */}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-[0.08em] mb-5">Quick Links</h4>
                        <div className="space-y-2.5">
                            <a href="/" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">Home</a>
                            <a href="/services" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">Services</a>
                            <a href="/about" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">About Us</a>
                            <a href="/contact" className="block text-slate-400 hover:text-blue-400 transition-colors text-sm">Contact</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/[0.06] pt-8 text-center text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} Tricore Innovations. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
