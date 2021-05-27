import React, {Fragment} from 'react';

import {useLocation} from "react-router-dom";
import HeaderTop from "./HeaderTop";
import HeaderNavbar from "./HeaderNavbar";
import HeaderBox from "./HeaderBox";

const Header = () => {

    const location = useLocation();

    const styleProps = {
        top: 0,
        position: 'fixed',
        right: 0,
        left: 0,
        zIndex: 1030,
        backgroundColor: 'white',
    }

    return (
        <Fragment>
            <section id="header" style={styleProps} className="header">
                <HeaderTop />
                <HeaderBox />
                <HeaderNavbar />
            </section>
        </Fragment>
    );

};

export default Header;

