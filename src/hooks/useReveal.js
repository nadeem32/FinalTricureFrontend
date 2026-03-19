import { useEffect, useRef, useState } from 'react';

/**
 * Returns [ref, isVisible].
 * Attach ref to any DOM element; isVisible flips true once it enters the viewport.
 * Disconnects the observer after first trigger so it only fires once.
 */
export const useReveal = (threshold = 0.12) => {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return [ref, isVisible];
};
