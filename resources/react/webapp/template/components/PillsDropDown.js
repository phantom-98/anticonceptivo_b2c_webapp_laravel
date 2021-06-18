import React, {Fragment} from 'react';
import { v4 as uuidv4 } from 'uuid';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../routes/publicRoutes";

const PillsDropDown = ({laboratories, subscriptions, formats}) => {

    return (
        <Fragment>
            <div className="row mt-1">
                <div className="col-7">
                    <h3 className="pills-sub-header-title">FORMATO</h3>
                    {
                        formats.map((format) => {
                            
                            
                            let formatKey = uuidv4();
                            return (
                                <Link to={'#'} style={{textDecoration: 'none'}} key={formatKey}>
                                    <span className="font-poppins py-1 font-12 text-black my-auto d-block">{format}</span>
                                </Link>
                            )
                        })
                    }
                    <h3 className="pills-sub-header-title mt-3">SUSCRIPCIÓN</h3>
                    {
                        subscriptions.map((subscription) => {
                            let subscriptionKey = uuidv4();
                            let subscriptionId = subscription.id;
                            return (
                                <Link to={'#'} style={{textDecoration: 'none'}} key={subscriptionKey}>
                                    <span className="font-poppins py-1 font-12 text-black my-auto d-block">{subscription.months} Meses</span>
                                </Link>
                            )
                        })
                    }
                    <Link to={'#'} style={{textDecoration: 'none'}}>
                        <h3 className="pills-sub-header-title mt-3">VER TODO</h3>
                    </Link>
                </div>
                <div className="col-5">
                    <h3 className="pills-sub-header-title">LABORATORIO</h3>
                    {
                        laboratories.map((laboratory) => {
                            let laboratoryKey = uuidv4();

                            let url = PUBLIC_ROUTES.SHOP_PILLS.path;
                            
                            url = url.replace(":type", 'laboratorio');
                            url = url.replace(":filter", laboratory.name.replace(' ','-').toLowerCase());

                            return (
                                <Link to={url} style={{textDecoration: 'none'}} key={laboratoryKey}>
                                    <span key={laboratoryKey} className="font-poppins py-1 font-12 text-black my-auto d-block">{laboratory.name}</span>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </Fragment>
    );
};

export default PillsDropDown
