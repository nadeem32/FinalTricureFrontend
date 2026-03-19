import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
    const [isOpen, setIsOpen]   = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isActive = (path) => location.pathname === path;
    const isHome   = location.pathname === '/';
    const solid    = scrolled || !isHome;

    const navLinks = [
        { name: 'Home',     path: '/' },
        { name: 'Services', path: '/services' },
        { name: 'About Us', path: '/about' },
        { name: 'Contact',  path: '/contact' },
    ];

    const navClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
        solid
            ? 'bg-white/95 backdrop-blur-lg shadow-sm border-b border-slate-100/80 py-3'
            : 'bg-transparent py-5'
    }`;

    const linkBase   = 'relative text-sm font-medium transition-colors duration-200 group';
    const linkActive = solid ? 'text-blue-600 font-semibold' : 'text-white font-semibold';
    const linkIdle   = solid ? 'text-slate-600 hover:text-blue-600' : 'text-white/85 hover:text-white';
    const logoColor  = solid ? 'text-slate-900' : 'text-white';

    return (
        <nav className={navClasses}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-glow-sm group-hover:scale-105 transition-transform">
                            T
                        </div>
                        <span className={`text-xl font-bold font-display ${logoColor} transition-colors`}>
                            Tricore<span className="text-blue-600">Innovations</span>
                        </span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`${linkBase} ${isActive(link.path) ? linkActive : linkIdle}`}
                            >
                                {link.name}
                                {/* Active underline dot */}
                                {isActive(link.path) && (
                                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-500" />
                                )}
                            </Link>
                        ))}

                        {/* CTA */}
                        <Link
                            to="/contact"
                            className="ml-2 px-5 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold shadow-glow-sm hover:shadow-glow transition-all duration-200 transform hover:-translate-y-0.5"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className={`md:hidden p-2 rounded-lg focus:outline-none transition-colors ${
                            solid ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'
                        }`}
                    >
                        {isOpen
                            ? <XMarkIcon   className="w-6 h-6" />
                            : <Bars3Icon   className="w-6 h-6" />
                        }
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-card-xl">
                    <div className="px-4 pt-3 pb-6 space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                    isActive(link.path)
                                        ? 'bg-blue-50 text-blue-600 font-semibold'
                                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-3">
                            <Link
                                to="/contact"
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-center w-full px-5 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-500 transition-colors"
                            >
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
