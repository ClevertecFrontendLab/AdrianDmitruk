import { useEffect, useState } from 'react';

export const useWindowWidth = (breakpoint: number): boolean => {
    const [isBelowBreakpoint, setIsBelowBreakpoint] = useState<boolean>(
        window.innerWidth <= breakpoint,
    );

    useEffect(() => {
        const handleResize = () => {
            setIsBelowBreakpoint(window.innerWidth <= breakpoint);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [breakpoint]);

    return isBelowBreakpoint;
};
