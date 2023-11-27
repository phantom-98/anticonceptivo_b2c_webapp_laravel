import React from 'react';
import { useState, useEffect } from 'react';

export default function UseWindowDimensions() {

    // how two use it
    // import and declare
    // import UseWindowDimensions from "./UseWindowDimensions";
    // const { height, width } = useWindowDimensions();

    const hasWindow = typeof window !== 'undefined';

    function getWindowDimensions() {
        const width = hasWindow ? window.innerWidth : null;
        const height = hasWindow ? window.innerHeight : null;
        return {
            width,
            height,
        };
    }

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        if (hasWindow) {
            function handleResize() {
                setWindowDimensions(getWindowDimensions());
            }

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [hasWindow]);

    return windowDimensions;
}
