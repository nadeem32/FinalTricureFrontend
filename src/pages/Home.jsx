import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCompanySettings, getTeam, getProductPages } from '../services/api';
import Reveal from '../components/Reveal';
import { useReveal } from '../hooks/useReveal';
import usePageTitle from '../hooks/usePageTitle';
import {
    ArrowRightIcon,
    CheckCircleIcon,
    SparklesIcon,
    PlayCircleIcon,
    XMarkIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    HeartIcon,
    BanknotesIcon,
    BuildingLibraryIcon,
    TruckIcon,
    WrenchScrewdriverIcon,
    ShoppingBagIcon,
    ComputerDesktopIcon,
    MagnifyingGlassCircleIcon,
    PencilSquareIcon,
    CodeBracketIcon,
    RocketLaunchIcon,
    LifebuoyIcon,
    CpuChipIcon,
    GlobeAltIcon,
    ShieldCheckIcon,
    BoltIcon,
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

/* ── Static Data ────────────────────────────────────────────────────────────── */
const expertiseCards = [
    {
        title: 'Custom Software Development',
        desc:  'Tailored applications engineered to your exact requirements, built for performance and long-term scalability.',
        Icon:  CodeBracketIcon,
        iconClass: 'icon-box-blue',
    },
    {
        title: 'Cloud & Infrastructure',
        desc:  'Cloud-native architectures, seamless migrations, and managed infrastructure that scales with your growth.',
        Icon:  GlobeAltIcon,
        iconClass: 'icon-box-indigo',
    },
    {
        title: 'Data & AI Solutions',
        desc:  'Unlock insights from your data with analytics platforms, machine learning models, and intelligent automation.',
        Icon:  CpuChipIcon,
        iconClass: 'icon-box-violet',
    },
];

const processSteps = [
    { num: '01', title: 'Discover', Icon: MagnifyingGlassCircleIcon, desc: 'We immerse in your domain to understand challenges, goals, and opportunities.' },
    { num: '02', title: 'Design',   Icon: PencilSquareIcon,          desc: 'Our architects craft solution blueprints aligned with your business objectives.' },
    { num: '03', title: 'Build',    Icon: CodeBracketIcon,           desc: 'Agile teams deliver quality software with continuous feedback and transparency.' },
    { num: '04', title: 'Deploy',   Icon: RocketLaunchIcon,          desc: 'Seamless go-live across cloud, on-premise, or hybrid environments.' },
    { num: '05', title: 'Evolve',   Icon: LifebuoyIcon,              desc: 'Ongoing optimization and strategic partnership as your business grows.' },
];

const industries = [
    { name: 'Healthcare & Life Sciences', Icon: HeartIcon,            iconClass: 'icon-box-rose',   desc: 'Digital solutions for providers, labs, and life sciences.' },
    { name: 'Financial Services',         Icon: BanknotesIcon,        iconClass: 'icon-box-amber',  desc: 'Secure, compliant platforms for banking, insurance, and fintech.' },
    { name: 'Government & Public Sector', Icon: BuildingLibraryIcon,  iconClass: 'icon-box-blue',   desc: 'Modern digital services for efficient public administration.' },
    { name: 'Logistics & Supply Chain',   Icon: TruckIcon,            iconClass: 'icon-box-teal',   desc: 'Real-time visibility, tracking, and operational optimization.' },
    { name: 'Manufacturing',              Icon: WrenchScrewdriverIcon, iconClass: 'icon-box-sky',   desc: 'Smart factory and Industry 4.0 automation solutions.' },
    { name: 'Retail & E-Commerce',        Icon: ShoppingBagIcon,      iconClass: 'icon-box-violet', desc: 'Omnichannel experiences that delight customers at scale.' },
    { name: 'Technology & Startups',      Icon: ComputerDesktopIcon,  iconClass: 'icon-box-indigo', desc: 'Scalable, resilient platforms for fast-growing companies.' },
];

const whyItems = [
    { Icon: CpuChipIcon,     title: 'Deep Technical Expertise',  desc: 'Our engineers bring proven experience across modern stacks, cloud platforms, and diverse industry domains.' },
    { Icon: BoltIcon,        title: 'Scalable by Design',        desc: 'We architect solutions built to grow — from startup to enterprise — with clean, API-first codebases.' },
    { Icon: ShieldCheckIcon, title: 'Security-First Approach',   desc: 'Security and compliance are embedded into every layer, from architecture design to deployment.' },
    { Icon: CheckCircleIcon, title: 'Committed Partnership',     desc: 'We don\'t just ship software — we stay invested in your success long after go-live.' },
];

/* ── Animated stat counter (triggers once on scroll) ───────────────────────── */
const CountStat = ({ num, suffix = '', display, decimals = 0, grad, isActive }) => {
    const [count, setCount] = useState(0);
    useEffect(() => {
        if (!isActive || num === null) return;
        const steps = 60;
        let c = 0;
        const t = setInterval(() => {
            c = Math.min(c + num / steps, num);
            setCount(c);
            if (c >= num) clearInterval(t);
        }, 1800 / steps);
        return () => clearInterval(t);
    }, [isActive, num]);
    const text = num === null
        ? display
        : `${decimals === 0 ? Math.floor(count) : count.toFixed(decimals)}${suffix}`;
    return (
        <p className={`text-4xl md:text-5xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${grad}`}>
            {text}
        </p>
    );
};

/* ── Tech stack badge data for ticker ──────────────────────────────────────── */
const techBadges = [
    { name: 'React',        dot: 'bg-sky-400' },
    { name: 'Spring Boot',  dot: 'bg-green-500' },
    { name: 'PostgreSQL',   dot: 'bg-blue-500' },
    { name: 'Docker',       dot: 'bg-blue-400' },
    { name: 'TypeScript',   dot: 'bg-blue-600' },
    { name: 'Java 17',      dot: 'bg-orange-500' },
    { name: 'Kubernetes',   dot: 'bg-indigo-500' },
    { name: 'Node.js',      dot: 'bg-green-400' },
    { name: 'Python',       dot: 'bg-yellow-500' },
    { name: 'AWS',          dot: 'bg-orange-400' },
    { name: 'Tailwind CSS', dot: 'bg-cyan-400' },
    { name: 'Linux',        dot: 'bg-slate-500' },
];

/* ── Component ──────────────────────────────────────────────────────────────── */
const Home = () => {
    const [settings, setSettings]             = useState(null);
    const [products, setProducts]             = useState([]);
    const [team, setTeam]                     = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [demoPages, setDemoPages]           = useState([]);
    const [currentSlide, setCurrentSlide]     = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, setRes, teamRes] = await Promise.all([
                    getProducts(), getCompanySettings(), getTeam()
                ]);
                setProducts(prodRes.data);
                setSettings(setRes.data);
                setTeam(teamRes.data.slice(0, 4));
            } catch (e) { console.error(e); }
        };
        fetchData();
    }, []);

    const handleProductClick = async (product) => {
        setSelectedProduct(product);
        setCurrentSlide(0);
        try {
            const res = await getProductPages(product.id);
            setDemoPages(res.data);
        } catch { setDemoPages([]); }
    };

    const nextSlide = () => setCurrentSlide(p => p === demoPages.length - 1 ? 0 : p + 1);
    const prevSlide = () => setCurrentSlide(p => p === 0 ? demoPages.length - 1 : p - 1);

    const [statsRef, statsVisible] = useReveal(0.3);
    usePageTitle(); // Homepage: "Tricore Innovations | Engineering Tomorrow's Digital Solutions"
    const activeProducts  = products.filter(p => p.status === 'Active');
    const productChartData = [
        { name: 'Active',         value: products.filter(p => p.status === 'Active').length },
        { name: 'In Development', value: products.filter(p => p.status === 'In Development').length },
    ].filter(d => d.value > 0);
    const CHART_COLORS = ['#2563eb', '#818cf8'];

    return (
        <div className="min-h-screen bg-white overflow-hidden">

            {/* ── HERO ─────────────────────────────────────────────────────── */}
            <section className="relative bg-hero-gradient pt-32 pb-24 lg:pt-52 lg:pb-36 overflow-hidden">
                {/* Animated orbs */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-32 -left-32 w-[700px] h-[700px] bg-blue-600/25 rounded-full blur-[140px] animate-orb-float" />
                    <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] animate-orb-float-alt" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-[100px] animate-pulse-slow" />
                </div>
                {/* Dot-grid texture */}
                <div className="absolute inset-0 bg-dot-grid-dark pointer-events-none" />

                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    {/* Animated badge */}
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.08] border border-white/15 backdrop-blur-sm text-blue-200 text-sm font-medium mb-8 animate-fade-in-up badge-glow">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping-dot absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
                        </span>
                        Driving Digital Transformation
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 animate-fade-in-up animate-delay-100 leading-[1.1]">
                        Engineering Tomorrow's{' '}
                        <span className="text-gradient-vivid">Digital Solutions</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300/90 max-w-3xl mx-auto mb-10 leading-relaxed animate-fade-in-up animate-delay-200">
                        We build enterprise-grade software that transforms operations, accelerates growth, and powers businesses across every industry.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 animate-fade-in-up animate-delay-300">
                        <Link to="/contact" className="btn-primary text-base px-8 py-4 shadow-glow">
                            Start a Conversation <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </Link>
                        <Link to="/services" className="btn-ghost-white text-base px-8 py-4">
                            <PlayCircleIcon className="w-5 h-5 mr-2" /> Explore Our Services
                        </Link>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 animate-fade-in-up animate-delay-400">
                        {['No commitment required', 'Expert consultation', 'Tailored for your needs'].map(item => (
                            <div key={item} className="flex items-center gap-1.5 text-slate-400 text-sm">
                                <CheckCircleIcon className="w-4 h-4 text-blue-400/80 flex-shrink-0" />
                                {item}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── STATS STRIP ──────────────────────────────────────────────── */}
            <section ref={statsRef} className="bg-slate-950 border-t border-white/[0.07] py-14">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4">
                        {[
                            { num: 7,    suffix: '+',  decimals: 0, grad: 'from-blue-400 to-cyan-400',     label: 'Industries Served' },
                            { num: 50,   suffix: '+',  decimals: 0, grad: 'from-indigo-400 to-violet-400', label: 'Years Combined Expertise' },
                            { num: null, display: '24/7',           grad: 'from-violet-400 to-purple-400', label: 'Dedicated Support' },
                            { num: 99.9, suffix: '%',  decimals: 1, grad: 'from-blue-400 to-indigo-400',   label: 'Uptime Commitment' },
                        ].map((s, i) => (
                            <div key={s.label} className={`text-center py-6 px-4 ${i > 0 ? 'border-l border-white/[0.08]' : ''}`}>
                                <CountStat {...s} isActive={statsVisible} />
                                <p className="text-slate-400 text-[11px] uppercase tracking-[0.15em]">{s.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── TECH STACK TICKER ────────────────────────────────────────── */}
            <div className="py-8 bg-white border-b border-slate-100">
                <p className="text-center text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400 mb-5">
                    Built with industry-leading technologies
                </p>
                <div className="relative overflow-hidden marquee-wrap">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                    <div className="flex animate-marquee whitespace-nowrap">
                        {[...techBadges, ...techBadges].map((badge, i) => (
                            <div key={i} className="inline-flex items-center gap-2 mx-4 px-4 py-2 rounded-lg bg-slate-50 border border-slate-100 text-slate-600 text-sm font-semibold flex-shrink-0">
                                <span className={`w-2 h-2 rounded-full ${badge.dot} flex-shrink-0`} />
                                {badge.name}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── OUR EXPERTISE ────────────────────────────────────────────── */}
            <section className="py-24 bg-white relative">
                <div className="absolute inset-0 bg-dot-grid" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Reveal>
                    <div className="text-center mb-16">
                        <p className="section-tag-blue mb-3">What We Do</p>
                        <div className="section-divider mx-auto" />
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Expertise</h2>
                        <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
                            Comprehensive technology solutions built for modern enterprises across every sector.
                        </p>
                    </div>
                    </Reveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {expertiseCards.map((item, idx) => (
                            <Reveal key={item.title} delay={idx * 120}>
                            <div className="gradient-border-card bg-white rounded-2xl p-8 group h-full">
                                <div className={`${item.iconClass} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <item.Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 mb-6 leading-relaxed text-sm">{item.desc}</p>
                                <Link to="/services" className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                    Learn more <ArrowRightIcon className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                            </Reveal>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link to="/services" className="btn-outline">
                            View All Services <ArrowRightIcon className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── OUR APPROACH ─────────────────────────────────────────────── */}
            <section className="py-24 bg-slate-950 relative overflow-hidden">
                {/* Layered background — gradient base + asymmetric ambient glows */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950/30 to-slate-950" />
                <div className="absolute inset-0 bg-dot-grid-dark" />
                <div className="absolute -top-24 -left-24 w-[560px] h-[400px] bg-blue-600/[0.14] rounded-full blur-[110px] pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-[480px] h-[360px] bg-indigo-600/[0.12] rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Reveal>
                    <div className="text-center mb-16">
                        <p className="section-tag-dark mb-3">How We Work</p>
                        <div className="section-divider mx-auto" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Approach</h2>
                        <p className="text-slate-300 max-w-xl mx-auto leading-relaxed">
                            A structured, collaborative process that consistently delivers high-quality outcomes — on time and within scope.
                        </p>
                    </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                        {processSteps.map((step, idx) => (
                            <Reveal key={step.num} delay={idx * 80} className="relative group">
                                <div className="glass-dark rounded-2xl p-6 text-center h-full group-hover:border-blue-500/50 group-hover:bg-white/[0.10] transition-all duration-300">
                                    {/* Icon */}
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center mx-auto mb-4 shadow-glow-sm group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
                                        <step.Icon className="w-7 h-7 text-white" />
                                    </div>
                                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{step.num}</span>
                                    <h3 className="text-base font-bold text-white mt-1 mb-2">{step.title}</h3>
                                    <p className="text-slate-300 text-sm leading-relaxed">{step.desc}</p>
                                </div>
                                {/* Connector arrow */}
                                {idx < processSteps.length - 1 && (
                                    <div className="hidden lg:flex absolute top-1/2 -right-3 -translate-y-1/2 z-10 items-center justify-center w-6 h-6 rounded-full bg-blue-950 border border-blue-700/60">
                                        <ArrowRightIcon className="w-3 h-3 text-blue-400" />
                                    </div>
                                )}
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── INDUSTRIES WE SERVE ───────────────────────────────────────── */}
            <section className="py-24 bg-slate-50 relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-60" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <Reveal>
                    <div className="text-center mb-16">
                        <p className="section-tag-blue mb-3">Who We Serve</p>
                        <div className="section-divider mx-auto" />
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Industries We Serve</h2>
                        <p className="text-slate-600 max-w-xl mx-auto leading-relaxed">
                            Deep domain knowledge across diverse sectors — we understand the unique challenges of each industry.
                        </p>
                    </div>
                    </Reveal>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {industries.map((industry, idx) => (
                            <Reveal key={industry.name} delay={idx * 70}>
                            <div
                                className="group bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-6 shadow-card hover:shadow-card-lg hover:-translate-y-1 transition-all duration-300 h-full"
                            >
                                <div className={`${industry.iconClass} mb-4`}>
                                    <industry.Icon className="w-6 h-6" />
                                </div>
                                <h3 className="font-bold text-slate-900 mb-1.5 text-sm">{industry.name}</h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{industry.desc}</p>
                            </div>
                            </Reveal>
                        ))}
                        {/* CTA tile */}
                        <div className="group bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 rounded-2xl p-6 flex flex-col justify-between shadow-glow-sm hover:shadow-glow hover:-translate-y-1 transition-all duration-300">
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
                                    <SparklesIcon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="font-bold text-white text-sm mb-2">Don't see yours?</h3>
                                <p className="text-blue-100 text-sm leading-relaxed">We work across all verticals. Let's talk.</p>
                            </div>
                            <Link to="/contact" className="mt-5 inline-flex items-center text-white font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                Get in Touch <ArrowRightIcon className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── OUR SOLUTIONS (Products) ─────────────────────────────────── */}
            {activeProducts.length > 0 && (
                <section className="py-24 bg-slate-950 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-indigo-950/20 to-slate-950" />
                    <div className="absolute inset-0 bg-dot-grid-dark" />
                    <div className="absolute -top-16 left-1/4 w-[480px] h-[420px] bg-blue-600/[0.16] rounded-full blur-[110px] pointer-events-none" />
                    <div className="absolute -bottom-16 right-16 w-[380px] h-[320px] bg-indigo-600/[0.12] rounded-full blur-[100px] pointer-events-none" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <Reveal>
                        <div className="text-center mb-16">
                            <p className="section-tag-dark mb-3">What We&#39;ve Built</p>
                            <div className="section-divider mx-auto" />
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Solutions</h2>
                            <p className="text-slate-300 max-w-xl mx-auto">
                                Purpose-built software designed to streamline operations and accelerate growth. Click to view a demo.
                            </p>
                        </div>
                        </Reveal>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {activeProducts.slice(0, 3).map((product) => (
                                <div
                                    key={product.id}
                                    onClick={() => handleProductClick(product)}
                                    className="group rounded-2xl overflow-hidden border border-white/[0.10] bg-white/[0.05] backdrop-blur-sm hover:border-blue-500/50 hover:bg-white/[0.09] hover:-translate-y-1 shadow-card hover:shadow-card-xl transition-all duration-300 cursor-pointer"
                                >
                                    <div className="aspect-video bg-slate-800/80 relative overflow-hidden">
                                        {product.imageUrl
                                            ? <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                            : <div className="w-full h-full flex items-center justify-center"><SparklesIcon className="w-12 h-12 text-slate-600" /></div>
                                        }
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                            <span className="text-white font-semibold text-sm flex items-center">
                                                <PlayCircleIcon className="w-5 h-5 mr-2" /> View Live Demo
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-white mb-2">{product.name}</h3>
                                        <p className="text-slate-300 text-sm line-clamp-2 mb-4">{product.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="px-3 py-1 rounded-full bg-blue-900/60 text-blue-400 text-xs font-semibold border border-blue-800/60">
                                                {product.category}
                                            </span>
                                            {product.price > 0 && (
                                                <span className="text-slate-400 text-xs font-medium">From ${product.price}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Demo Modal */}
            {selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-md animate-fade-in">
                    <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 text-white/60 hover:text-white z-50 transition-colors">
                        <XMarkIcon className="w-9 h-9" />
                    </button>
                    <div className="w-full max-w-5xl">
                        {demoPages.length > 0 ? (
                            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                                <img src={demoPages[currentSlide].imageUrl} alt={demoPages[currentSlide].caption} className="w-full h-full object-contain" />
                                {demoPages.length > 1 && (
                                    <>
                                        <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"><ChevronLeftIcon className="w-7 h-7" /></button>
                                        <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"><ChevronRightIcon className="w-7 h-7" /></button>
                                    </>
                                )}
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                                    <h3 className="text-xl font-bold text-white mb-1">{selectedProduct.name}</h3>
                                    {demoPages[currentSlide].caption && <p className="text-slate-300 text-sm">{demoPages[currentSlide].caption}</p>}
                                    <div className="flex justify-center mt-4 gap-1.5">
                                        {demoPages.map((_, idx) => (
                                            <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'bg-white w-6' : 'bg-white/30 w-1.5'}`} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-white py-16">
                                <SparklesIcon className="w-16 h-16 mx-auto text-slate-600 mb-4" />
                                <h3 className="text-2xl font-bold mb-2">Demo Coming Soon</h3>
                                <p className="text-slate-400">Contact us for a personal walkthrough.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}  

            {/* ── LEADERSHIP TEAM (temporarily hidden) ─────────────────────────
                Cards (CEO/CTO etc.) come from CMS via getTeam(). When you have real
                profiles, remove `false &&` below so only `team.length > 0 &&` remains.
            */}
            {false && team.length > 0 && (
                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-dot-grid" />
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <p className="section-tag-blue mb-3">The People Behind It</p>
                            <div className="section-divider mx-auto" />
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Leadership Team</h2>
                            <p className="text-slate-500 max-w-xl mx-auto">Guided by experienced professionals with deep expertise across technology and business.</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {team.map((member, idx) => {
                                const gradients = [
                                    'from-blue-500 to-indigo-600',
                                    'from-indigo-500 to-violet-600',
                                    'from-violet-500 to-purple-600',
                                    'from-sky-500 to-blue-600',
                                    'from-teal-500 to-emerald-600',
                                    'from-rose-500 to-pink-600',
                                ];
                                const initials = member.name
                                    .split(' ')
                                    .map(n => n[0])
                                    .slice(0, 2)
                                    .join('');
                                const gradient = gradients[idx % gradients.length];
                                return (
                                <div key={member.id} className="group gradient-border-card bg-white rounded-2xl overflow-hidden">
                                    <div className={`h-48 bg-gradient-to-br ${gradient} relative flex items-center justify-center`}>
                                        <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center">
                                            <span className="text-white text-2xl font-bold tracking-wide">{initials}</span>
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                    </div>
                                    <div className="p-5 text-center">
                                        <h3 className="text-base font-bold text-slate-900">{member.name}</h3>
                                        <p className="text-blue-600 text-sm font-medium mt-0.5">{member.role}</p>
                                        {member.bio && <p className="text-slate-500 text-xs mt-2 line-clamp-3 leading-relaxed">{member.bio}</p>}
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                        <div className="text-center mt-10">
                            <Link to="/about" className="inline-flex items-center text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                                Meet the full team <ArrowRightIcon className="w-4 h-4 ml-1" />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── VISION & ROADMAP ─────────────────────────────────────────── */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-dot-grid" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-50 rounded-full blur-[100px] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left */}
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold uppercase tracking-[0.08em] mb-6">
                                <SparklesIcon className="w-3.5 h-3.5" /> Future Roadmap
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-5 leading-tight">
                                Pioneering the Next Era of{' '}
                                <span className="text-gradient-primary">Enterprise Technology</span>
                            </h2>
                            <p className="text-slate-600 leading-relaxed mb-8">
                                We're actively building AI-driven automation platforms and cloud-native frameworks that will redefine how businesses operate and compete in the digital economy.
                            </p>
                            <div className="space-y-5">
                                {[
                                    { Icon: CpuChipIcon,  title: 'AI & Intelligent Automation',    desc: 'Machine learning models that surface insights and automate complex workflows.' },
                                    { Icon: GlobeAltIcon, title: 'Universal System Integration',    desc: 'Seamless data exchange and interoperability across any platform or system.' },
                                ].map(item => (
                                    <div key={item.title} className="flex items-start gap-4">
                                        <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0">
                                            <item.Icon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                                            <p className="text-slate-600 text-sm mt-1 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right - Roadmap card */}
                        <div className="relative">
                            <div className="absolute -inset-3 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-3xl opacity-10 blur-lg transform rotate-2" />
                            <div className="relative bg-white rounded-3xl p-8 border border-slate-200 shadow-card-xl">
                                <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">Current Milestone</p>
                                        <span className="font-bold text-slate-900 text-lg">Q3 2026</span>
                                    </div>
                                    <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-200">
                                        In Progress
                                    </span>
                                </div>
                                <div className="space-y-6">
                                    {[
                                        { title: 'Enterprise Platform Suite', desc: 'Fully cloud-native enterprise software platform with multi-tenant architecture and role-based access.' },
                                        { title: 'API Integration Hub',       desc: 'Universal connector enabling seamless integration with any third-party system or data source.' },
                                    ].map((item, i) => (
                                        <div key={item.title} className="flex gap-4">
                                            <div className="w-7 h-7 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <span className="text-blue-600 text-xs font-bold">{i + 1}</span>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h4>
                                                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-8">
                                    <Link to="/contact" className="block w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm hover:from-blue-500 hover:to-indigo-500 transition-all text-center shadow-glow-sm hover:shadow-glow">
                                        Discuss Your Project
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── WHY CHOOSE US ────────────────────────────────────────────── */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Visual panel */}
                        <div className="relative order-2 lg:order-1">
                            <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl opacity-8 blur-2xl" />
                            <div className="relative glass-panel p-8 rounded-3xl">
                                <h3 className="text-lg font-bold text-slate-900 mb-1">Our Capabilities at a Glance</h3>
                                <p className="text-slate-600 text-sm mb-6">Core engineering disciplines we excel at</p>

                                {productChartData.length > 0 ? (
                                    <div className="h-48 mb-4">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie data={productChartData} cx="50%" cy="50%" innerRadius={50} outerRadius={72} paddingAngle={4} dataKey="value">
                                                    {productChartData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
                                                </Pie>
                                                <Tooltip />
                                            </PieChart>
                                        </ResponsiveContainer>
                                    </div>
                                ) : (
                                    <div className="space-y-3 mb-6">
                                        {[
                                            { label: 'Frontend & UX',        pct: 95 },
                                            { label: 'Backend & APIs',       pct: 92 },
                                            { label: 'Cloud & DevOps',       pct: 88 },
                                            { label: 'Data & AI',            pct: 80 },
                                        ].map(bar => (
                                            <div key={bar.label}>
                                                <div className="flex justify-between text-xs text-slate-600 mb-1 font-medium">
                                                    <span>{bar.label}</span><span>{bar.pct}%</span>
                                                </div>
                                                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                                                        style={{ width: `${bar.pct}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
                                    {['React', 'Spring Boot', 'PostgreSQL', 'Docker', 'AWS / GCP', 'Tailwind CSS'].map(tech => (
                                        <span key={tech} className="text-center text-xs font-medium text-slate-500 bg-slate-50 rounded-lg px-2 py-1.5 border border-slate-100">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="order-1 lg:order-2">
                            <p className="section-tag-blue mb-3">Why Tricore</p>
                            <div className="section-divider" />
                            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
                                Why Choose <span className="text-gradient-primary">Tricore Innovations?</span>
                            </h2>
                            <div className="space-y-6">
                                {whyItems.map((item, idx) => (
                                    <Reveal key={item.title} delay={idx * 90}>
                                    <div className="flex items-start gap-4 group">
                                        <div className="w-10 h-10 rounded-xl bg-blue-50 group-hover:bg-blue-600 flex items-center justify-center flex-shrink-0 transition-colors duration-300 mt-0.5">
                                            <item.Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors duration-300" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-900">{item.title}</h4>
                                            <p className="text-slate-600 text-sm mt-1 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                    </Reveal>
                                ))}
                            </div>
                            <div className="mt-10">
                                <Link to="/about" className="btn-dark">
                                    Learn About Us <ArrowRightIcon className="w-4 h-4 ml-2" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ───────────────────────────────────────────────── */}
            <section className="relative bg-slate-950 py-28 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-950/80 via-slate-950 to-indigo-950/60" />
                    <div className="absolute -top-20 left-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] animate-pulse-slow" />
                    <div className="absolute -bottom-20 right-1/4 w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
                </div>
                <div className="absolute inset-0 bg-dot-grid-dark" />

                <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <Reveal>
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-8">
                        <SparklesIcon className="w-3.5 h-3.5" /> Let's Work Together
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight">
                        Ready to Build Something{' '}
                        <span className="text-gradient-vivid">Exceptional?</span>
                    </h2>
                    <p className="text-slate-300 text-lg mb-10 leading-relaxed">
                        Let's discuss your challenge and explore how Tricore Innovations can help you design and deliver the right solution.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/contact" className="btn-primary text-base px-8 py-4 shadow-glow">
                            Start a Conversation <ArrowRightIcon className="w-5 h-5 ml-2" />
                        </Link>
                        <Link to="/services" className="btn-ghost-white text-base px-8 py-4">
                            View Our Services
                        </Link>
                    </div>
                    </Reveal>
                </div>
            </section>

        </div>
    );
};

export default Home;
