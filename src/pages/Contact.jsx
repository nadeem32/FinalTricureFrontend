import React, { useState, useEffect } from 'react';
import { createInquiry, getCompanySettings } from '../services/api';
import usePageTitle from '../hooks/usePageTitle';
import {
    EnvelopeIcon,
    PhoneIcon,
    MapPinIcon,
    CheckCircleIcon,
    ArrowRightIcon,
    ClockIcon,
} from '@heroicons/react/24/outline';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [settings, setSettings]   = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading]     = useState(false);
    usePageTitle('Contact Us');

    useEffect(() => {
        getCompanySettings().then(res => setSettings(res.data)).catch(console.error);
    }, []);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await createInquiry(formData);
            setSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error submitting inquiry:', error);
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            Icon:  EnvelopeIcon,
            title: 'Email Us',
            value:  'info@tricoreinnovations.com',
            sub:   'We respond within 24 hours.',
            iconClass: 'icon-box-blue',
        },
        {
            Icon:  PhoneIcon,
            title: 'Call Us',
            value: settings?.phone || '+1 (555) 000-0000',
            sub:   'Mon – Fri, 9 am – 6 pm.',
            iconClass: 'icon-box-indigo',
        },
        {
            Icon:  MapPinIcon,
            title: 'Visit Us',
            value: settings?.address || '123 Innovation Drive',
            sub:   'By appointment.',
            iconClass: 'icon-box-violet',
        },
        {
            Icon:  ClockIcon,
            title: 'Response Time',
            value: '< 24 Hours',
            sub:   'For all inquiries.',
            iconClass: 'icon-box-teal',
        },
    ];

    return (
        <div className="bg-white">

            {/* ── Page Header ─────────────────────────────────────────────── */}
            <div className="page-header">
                <div className="absolute inset-0 bg-dot-grid-dark" />
                <div className="absolute -top-20 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
                        Get In Touch
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto">
                        Have a project in mind or a question? We'd love to hear from you.
                    </p>
                </div>
            </div>

            {/* ── Body ────────────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">

                    {/* ── Left: info ──────────────────────────────────────── */}
                    <div className="lg:col-span-2 space-y-5">
                        <div>
                            <p className="section-tag-blue mb-3">Let's Connect</p>
                            <div className="section-divider" />
                            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                                We're Here to Help
                            </h2>
                            <p className="text-slate-500 leading-relaxed text-sm">
                                Whether you're looking to start a new project, need technical advice, or simply want to explore what's possible — reach out and let's have a conversation.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 pt-4">
                            {contactInfo.map((item) => (
                                <div key={item.title} className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-200 hover:shadow-card-md transition-all duration-200">
                                    <div className={`${item.iconClass} flex-shrink-0`}>
                                        <item.Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-0.5">{item.title}</p>
                                        <p className="text-sm font-semibold text-slate-900">{item.value}</p>
                                        <p className="text-xs text-slate-400 mt-0.5">{item.sub}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ── Right: form ─────────────────────────────────────── */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-3xl shadow-card-xl border border-slate-100 p-8 md:p-10">
                            {submitted ? (
                                <div className="text-center py-14">
                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                                        <CheckCircleIcon className="w-9 h-9 text-emerald-600" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                                    <p className="text-slate-500 text-sm max-w-xs mx-auto">
                                        Thank you for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setSubmitted(false)}
                                        className="mt-8 btn-outline text-sm"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <p className="section-tag-blue mb-2">Send a Message</p>
                                        <h3 className="text-xl font-bold text-slate-900">Tell us about your project</h3>
                                        <p className="text-slate-500 text-sm mt-1">Fill in the form and we'll be in touch shortly.</p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2">
                                        <div>
                                            <label className="form-label">Your Name</label>
                                            <input
                                                type="text"
                                                name="name"
                                                required
                                                placeholder="John Smith"
                                                className="form-input"
                                                value={formData.name}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label className="form-label">Email Address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                required
                                                placeholder="john@company.com"
                                                className="form-input"
                                                value={formData.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="form-label">Subject</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            required
                                            placeholder="How can we help you?"
                                            className="form-input"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <div>
                                        <label className="form-label">Message</label>
                                        <textarea
                                            name="message"
                                            rows={5}
                                            required
                                            placeholder="Tell us about your project, goals, and any specific requirements..."
                                            className="form-input resize-none"
                                            value={formData.message}
                                            onChange={handleChange}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-glow-sm hover:shadow-glow transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {loading ? 'Sending…' : (
                                            <>Send Message <ArrowRightIcon className="w-4 h-4" /></>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
