import React, {Fragment} from 'react';

import {useLocation} from "react-router-dom";

const Header = () => {

    const location = useLocation();

    return (
        <Fragment>
            <section id="header" className="header">
                header
            </section>
        </Fragment>
    );

};

export default Header;

