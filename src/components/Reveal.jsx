import React from 'react';
import { useReveal } from '../hooks/useReveal';

/**
 * Wraps children in a div that fades + slides up into view when scrolled into viewport.
 * @param {string}  className  – extra classes forwarded to the wrapper div
 * @param {number}  delay      – transition-delay in ms (for staggered card grids)
 */
const Reveal = ({ children, className = '', delay = 0 }) => {
    const [ref, isVisible] = useReveal();

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            } ${className}`}
            style={delay ? { transitionDelay: `${delay}ms` } : undefined}
        >
            {children}
        </div>
    );
};

export default Reveal;
