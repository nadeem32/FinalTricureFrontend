import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';
import {
    CodeBracketIcon,
    BeakerIcon,
    CloudIcon,
    CpuChipIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    BoltIcon,
    ArrowRightIcon,
    SparklesIcon,
} from '@heroicons/react/24/outline';

const iconMap = {
    CodeBracketIcon: CodeBracketIcon,
    BeakerIcon:      BeakerIcon,
    CloudIcon:       CloudIcon,
    CpuChipIcon:     CpuChipIcon,
    GlobeAltIcon:    GlobeAltIcon,
    ShieldCheckIcon: ShieldCheckIcon,
    BoltIcon:        BoltIcon,
};

const iconBoxClasses = [
    'icon-box-blue',
    'icon-box-indigo',
    'icon-box-violet',
    'icon-box-teal',
    'icon-box-sky',
    'icon-box-rose',
];

const placeholderServices = [
    { id: 'p1', title: 'Custom Software Development', description: 'Tailored web and mobile applications engineered to your exact requirements, built for performance and long-term scalability.', icon: 'CodeBracketIcon', content: 'React, Vue, Node.js, Spring Boot, mobile apps, progressive web apps.' },
    { id: 'p2', title: 'Cloud & Infrastructure',      description: 'Cloud-native architectures, migrations, and fully managed infrastructure that scales seamlessly with your business growth.', icon: 'CloudIcon',        content: 'AWS, GCP, Azure, Docker, Kubernetes, CI/CD pipelines.' },
    { id: 'p3', title: 'Data & AI Solutions',          description: 'Transform raw data into business intelligence with analytics platforms, machine learning models, and intelligent workflow automation.', icon: 'CpuChipIcon',    content: 'Data pipelines, ML models, BI dashboards, predictive analytics.' },
    { id: 'p4', title: 'API & Integration Services',   description: 'Connect your systems and third-party tools through robust, well-documented API design and enterprise integration patterns.', icon: 'GlobeAltIcon',   content: 'REST, GraphQL, microservices, message queues, webhooks.' },
    { id: 'p5', title: 'Security & Compliance',        description: 'Security-first engineering with threat modelling, penetration testing, code audits, and regulatory compliance guidance built in.', icon: 'ShieldCheckIcon', content: 'ISO 27001, SOC 2, GDPR, security architecture reviews.' },
    { id: 'p6', title: 'Digital Transformation',       description: 'End-to-end modernisation of legacy systems, processes, and workflows to unlock efficiency and competitive advantage.', icon: 'BoltIcon',       content: 'Legacy migration, process automation, change management.' },
];

const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading]   = useState(true);

    useEffect(() => {
        getServices()
            .then(res => { setServices(res.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const displayServices = services.length > 0 ? services : placeholderServices;

    return (
        <div className="bg-white">

            {/* ── Page Header ─────────────────────────────────────────────── */}
            <div className="page-header">
                <div className="absolute inset-0 bg-dot-grid-dark" />
                <div className="absolute -top-20 left-1/3 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
                        What We Offer
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto">
                        Comprehensive technology solutions engineered for enterprises across every industry.
                    </p>
                </div>
            </div>

            {/* ── Services Grid ────────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-14">
                    <p className="section-tag-blue mb-3">Our Capabilities</p>
                    <div className="section-divider mx-auto" />
                    <h2 className="text-3xl font-bold text-slate-900 mb-3">How We Can Help</h2>
                    <p className="text-slate-500 text-sm max-w-lg mx-auto">
                        From strategy and architecture through to build, deployment, and ongoing support.
                    </p>
                </div>

                {loading ? (
                    /* Skeleton loader */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 p-8 animate-pulse">
                                <div className="w-12 h-12 rounded-xl bg-slate-200 mb-6" />
                                <div className="h-5 w-2/3 bg-slate-200 rounded mb-3" />
                                <div className="space-y-2">
                                    <div className="h-3 bg-slate-200 rounded" />
                                    <div className="h-3 bg-slate-200 rounded w-5/6" />
                                    <div className="h-3 bg-slate-200 rounded w-4/6" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {displayServices.map((service, idx) => {
                            const IconComponent = iconMap[service.icon] || SparklesIcon;
                            const boxClass      = iconBoxClasses[idx % iconBoxClasses.length];
                            return (
                                <div
                                    key={service.id}
                                    className="gradient-border-card bg-white rounded-2xl p-8 group"
                                >
                                    <div className={`${boxClass} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-3">{service.title}</h3>
                                    <p className="text-slate-500 text-sm leading-relaxed mb-4">{service.description}</p>
                                    {service.content && (
                                        <p className="text-xs text-slate-400 border-t border-slate-100 pt-4 leading-relaxed">
                                            {service.content}
                                        </p>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* ── CTA ─────────────────────────────────────────────────────── */}
            <div className="bg-slate-50 py-20 border-t border-slate-100">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <SparklesIcon className="w-10 h-10 text-blue-500 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Not sure which service fits?</h2>
                    <p className="text-slate-500 text-sm mb-8 leading-relaxed max-w-lg mx-auto">
                        Every project is unique. Let's discuss your specific goals and we'll recommend the right approach.
                    </p>
                    <Link to="/contact" className="btn-primary text-base px-8 py-4 shadow-glow-sm hover:shadow-glow">
                        Start a Conversation <ArrowRightIcon className="w-5 h-5 ml-2" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Services;
