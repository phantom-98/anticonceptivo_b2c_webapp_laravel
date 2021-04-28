import React, {Fragment} from 'react';

import {withRouter} from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const BaseTemplate = (props) => {

    return (
        <div className={`bg-app bg-menu-${props.menu}`}>
            <Header menu={props.menu}/>
            <div className="app-content">
                {
                    props.children
                }
            </div>
            <Footer/>
        </div>
    )

};

export default withRouter(BaseTemplate);
