import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from '@heroicons/react/24/outline';

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className={`
                fixed bottom-8 right-8 z-50
                w-11 h-11 rounded-full
                bg-blue-600 hover:bg-blue-500
                border border-blue-500/60
                flex items-center justify-center
                shadow-lg shadow-blue-900/40
                transition-all duration-300 ease-out
                ${visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}
            `}
        >
            <ChevronUpIcon className="w-5 h-5 text-white" strokeWidth={2.5} />
        </button>
    );
};

export default ScrollToTopButton;
