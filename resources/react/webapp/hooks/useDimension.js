import React, {useCallback, useEffect, useState} from 'react';
import {BREAKPOINTS, ORIENTATION} from "../helpers/vars";

const useDimension = () => {

    const hasWindow = typeof window !== 'undefined';

    const [breakpoint, setBreakpoint] = useState('');
    const [orientation, setOrientation] = useState('');
    const [device, setDevice] = useState('');

    const handleBreakpoint = useCallback(
        (width) => {
            let _breakpoint = '';

            if (width) {
                if (width >= 1400) {
                    _breakpoint = BREAKPOINTS.EXTRA_EXTRA_LARGE;
                } else if (width >= 1200) {
                    _breakpoint = BREAKPOINTS.EXTRA_LARGE;
                } else if (width >= 992) {
                    _breakpoint = BREAKPOINTS.LARGE;
                } else if (width >= 768) {
                    _breakpoint = BREAKPOINTS.MEDIUM;
                } else if (width >= 576) {
                    _breakpoint = BREAKPOINTS.SMALL;
                } else if (width < 576) {
                    _breakpoint = BREAKPOINTS.EXTRA_SMALL;
                }
            }

            if (_breakpoint != breakpoint) {
                setBreakpoint(_breakpoint);
            }
        },
        [breakpoint]
    );

    const handleDirection = useCallback(
        (width, height) => {
            let _orientation = ORIENTATION.PORTRAIT;

            if (width && height) {
                if (width >= height) {
                    _orientation = ORIENTATION.LANDSCAPE;
                }
            }

            if (_orientation != orientation) {
                setOrientation(_orientation);
            }
        },
        [orientation]
    );

    const getWindowDimensions = useCallback(() => {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;

        handleBreakpoint(width);
        handleDirection(width, height);
    }, [handleBreakpoint, handleDirection, hasWindow]);

    useEffect(() => {
        if (hasWindow) {
            const handleResize = () => {
                getWindowDimensions();
            };
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [getWindowDimensions, hasWindow]);

    return {breakpoint, orientation};
};

export default useDimension
