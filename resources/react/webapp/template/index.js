import React, {Fragment} from 'react';

import {withRouter} from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

const BaseTemplate = (props) => {

    return (
        <div className={`bg-app`}>
            <Header />
            {/*<div className="app-content">*/}
            <div>
                {
                    props.children
                }
            </div>
            <Footer/>
        </div>
    )

};

export default withRouter(BaseTemplate);
