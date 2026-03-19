import { useEffect } from 'react';

const BASE = 'Tricore Innovations';
const TAGLINE = 'Engineering Tomorrow\'s Digital Solutions';

/**
 * Sets the browser window/tab title.
 * Usage:  usePageTitle('About Us')
 *   → "About Us | Tricore Innovations"
 * Pass no argument for the homepage:
 *   → "Tricore Innovations | Engineering Tomorrow's Digital Solutions"
 */
const usePageTitle = (pageTitle) => {
    useEffect(() => {
        document.title = pageTitle
            ? `${pageTitle} | ${BASE}`
            : `${BASE} | ${TAGLINE}`;
        return () => {
            document.title = `${BASE} | ${TAGLINE}`;
        };
    }, [pageTitle]);
};

export default usePageTitle;
