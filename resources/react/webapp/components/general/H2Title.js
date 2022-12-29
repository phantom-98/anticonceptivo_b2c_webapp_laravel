import React, {useContext} from 'react';
import {BREAKPOINTS} from "../../helpers/vars";
import { AppContext } from "../../context/AppProvider";

const H2Title = ({text, className}) => {
    const {breakpoint} = useContext(AppContext)

    return (
        <h2 className={`font-poppins bold text-center text-primary ${className} ${breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? 'font-21' : 'font-18'}`} style={{letterSpacing : '2px'}}>{text}</h2>
    );
};

export default H2Title
