import React, { useEffect, useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';

const SplashScreen = ({ onComplete }) => {
    const [animate, setAnimate] = useState(false);

    useEffect(() => {
        setAnimate(true);
        const timer = setTimeout(() => {
            onComplete();
        }, 3500); // Duration of the splash screen
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900 flex items-center justify-center overflow-hidden">
            <div className="relative z-10 text-center">
                <div className={`transition-all duration-1000 transform ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 mb-6 shadow-2xl shadow-blue-500/30 animate-float">
                        <SparklesIcon className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-2">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Tricore</span> Innovations
                    </h1>
                    <p className="text-slate-400 text-lg tracking-widest uppercase text-sm mt-4 animate-pulse-slow">
                        Engineering Tomorrow's Digital Solution
                    </p>
                </div>
            </div>

            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-900 to-slate-900"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
        </div>
    );
};

export default SplashScreen;
