import React from 'react';
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import {Link} from "react-router-dom";
import Icon from "../../../../components/general/Icon";
import errorCircle from "../../../../assets/images/icons/close-circle-outline.svg";

const Error = () => {
    return (
        <div className="row pb-5">
            <div className="col-md-8 offset-md-2">
                <div className="panel">
                    <div className="panel-body text-center panel-bordered">
                        <div className="text-center mb-3">
                            <Icon path={errorCircle} />
                        </div>
                        <span className="bold font-poppins font-26 d-block">Lo sentimos</span>
                        <span className="light font-poppins font-22">La transacción no pudo realizarse.</span>
                        <div className="row">
                            <div className="col-md-4 offset-md-4 mt-5">
                                <Link to={PUBLIC_ROUTES.CART.path} className="btn btn-bicolor btn-block d-flex">
                                    <span className="m-auto font-poppins font-14 bold">VOLVER A INTENTAR</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Error