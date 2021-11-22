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
                <div className="d-block d-sm-none float-whatsapp">
                    <FloatingWhatsApp backgroundColor={'#00DE39'} size={'65px'}
                                      popupMessage={'¿En qué podemos ayudarte?'}
                                      autoOpenTimeout={9999999999999} phone={'+56987380541'} zIndex={999} />
                </div>
                <div className="d-none d-md-block float-whatsapp">
                    <FloatingWhatsApp backgroundColor={'#00DE39'} size={'65px'}
                                      popupMessage={'¿En qué podemos ayudarte?'}
                                      autoOpenTimeout={9999999999999}
                                      phone={'+56987380541'} zIndex={999}/>
                </div>
            </div>
            <Footer/>
        </div>
    )

};

export default withRouter(BaseTemplate);
