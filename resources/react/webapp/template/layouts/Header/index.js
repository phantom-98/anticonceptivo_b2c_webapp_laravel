import React, { useContext } from 'react';
import { AppContext } from "../../../context/AppProvider";
import { BREAKPOINTS } from '../../../helpers/vars';
import Desktop from './Desktop';
import Mobile from './Mobile';

const Header = () => {
    const {breakpoint} = useContext(AppContext);

    return (
        <>
            <section id="header" className="header">
                {
                    breakpoint === BREAKPOINTS.MEDIUM ||breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                        <Desktop/>
                    :
                        <Mobile/>
                }
            </section>
        </>
    );

};

export default Header;

