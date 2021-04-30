import React, {Fragment} from 'react';

import {useLocation} from "react-router-dom";
import HeaderTop from "./HeaderTop";
import HeaderNavbar from "./HeaderNavbar";
import HeaderBox from "./HeaderBox";

const Header = () => {

    const location = useLocation();

    return (
        <Fragment>
            <section id="header" className="header">
                <HeaderTop />
                <HeaderBox />
                <HeaderNavbar />
            </section>
        </Fragment>
    );

};

export default Header;

