import React, { useState, useEffect } from 'react';
import { getTeam, getCompanySettings } from '../services/api';
import { LightBulbIcon, UsersIcon, RocketLaunchIcon } from '@heroicons/react/24/outline';
import usePageTitle from '../hooks/usePageTitle';

const values = [
    { Icon: LightBulbIcon,  title: 'Innovation',   desc: 'We challenge conventions and explore new ideas to deliver solutions that are ahead of the curve.' },
    { Icon: UsersIcon,      title: 'Partnership',  desc: 'We treat every client relationship as a long-term partnership, not just a project transaction.' },
    { Icon: RocketLaunchIcon, title: 'Excellence', desc: 'We hold ourselves to the highest engineering standards — clean code, robust architecture, quality delivery.' },
];

const About = () => {
    const [team, setTeam]         = useState([]);
    const [settings, setSettings] = useState(null);
    usePageTitle('About Us');

    useEffect(() => {
        Promise.all([getTeam(), getCompanySettings()]).then(([teamRes, settingsRes]) => {
            setTeam(teamRes.data);
            setSettings(settingsRes.data);
        }).catch(console.error);
    }, []);

    return (
        <div className="bg-white">

            {/* ── Page Header ─────────────────────────────────────────────── */}
            <div className="page-header">
                <div className="absolute inset-0 bg-dot-grid-dark" />
                <div className="absolute -top-20 right-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/15 text-blue-300 text-xs font-semibold uppercase tracking-widest mb-6">
                        Who We Are
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">About Us</h1>
                    <p className="text-lg text-slate-400 max-w-xl mx-auto">
                        Engineering innovative technology solutions that transform businesses since 2024.
                    </p>
                </div>
            </div>

            {/* ── Story Section ───────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <p className="section-tag-blue mb-3">Our Story</p>
                        <div className="section-divider" />
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-5">Built by Engineers, for Enterprise</h2>
                        <div className="text-slate-600 leading-relaxed space-y-4 text-sm">
                            <p>{settings?.history || 'Tricore Innovations was founded with a clear purpose: to bridge the gap between cutting-edge technology and real-world business problems. We started as a small but deeply technical team, driven by the belief that great software can fundamentally change how organizations operate.'}</p>
                        </div>
                        {settings?.missionStatement && (
                            <blockquote className="mt-6 pl-5 border-l-4 border-blue-500 bg-blue-50 rounded-r-xl py-4 pr-4">
                                <p className="text-blue-900 font-medium italic text-sm">"{settings.missionStatement}"</p>
                                <p className="text-blue-600 text-xs font-bold mt-2 uppercase tracking-widest">Our Mission</p>
                            </blockquote>
                        )}
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-3xl opacity-10 blur-2xl transform rotate-2" />
                        <div className="relative rounded-3xl overflow-hidden shadow-card-xl">
                            <img
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                alt="Team collaboration"
                                className="w-full object-cover aspect-[4/3]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 to-transparent" />
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Values ──────────────────────────────────────────────────── */}
            <div className="bg-slate-50 py-20 relative">
                <div className="absolute inset-0 bg-grid-pattern opacity-60" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-14">
                        <p className="section-tag-blue mb-3">What Drives Us</p>
                        <div className="section-divider mx-auto" />
                        <h2 className="text-3xl font-bold text-slate-900">Our Core Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {values.map((v) => (
                            <div key={v.title} className="gradient-border-card bg-white rounded-2xl p-8 group">
                                <div className="icon-box-blue mb-5 group-hover:scale-110 transition-transform duration-300">
                                    <v.Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold text-slate-900 mb-2">{v.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Team Section — hidden until real profiles are added ─────── */}
            {false && team.length > 0 && (
                <div className="py-20 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-14">
                            <p className="section-tag-blue mb-3">Meet the Team</p>
                            <div className="section-divider mx-auto" />
                            <h2 className="text-3xl font-bold text-slate-900 mb-3">The Experts Behind Our Solutions</h2>
                            <p className="text-slate-500 text-sm">A talented, driven team united by a passion for engineering excellence.</p>
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
                    </div>
                </div>
            )}
        </div>
    );
};

export default About;
