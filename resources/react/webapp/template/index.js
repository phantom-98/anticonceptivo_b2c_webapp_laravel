import React from 'react';

import {withRouter} from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import {FloatingWhatsApp} from 'react-floating-whatsapp-button'
import 'react-floating-whatsapp-button/dist/index.css'

const BaseTemplate = (props) => {

    return (
        <div className={`bg-app`}>
            <Header/>
            <div className="app-margin-top">
                {
                    props.children
                }
                <div className="d-block d-sm-none">
                    <FloatingWhatsApp size={'40px'} popupMessage={'¿En qué podemos ayudarte?'}
                                      autoOpenTimeout={9999999999999} phone={'+56975423779'} zIndex={999}/>
                </div>
                <div className="d-none d-md-block">
                    <FloatingWhatsApp popupMessage={'¿En qué podemos ayudarte?'} autoOpenTimeout={9999999999999}
                                      phone={'+56975423779'} zIndex={999}/>
                </div>
            </div>
            <Footer/>
        </div>
    )

};

export default withRouter(BaseTemplate);
