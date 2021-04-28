import React from 'react';
import {Link} from "react-router-dom";
import PANEL_COMPANY_ROUTES from "../../../../../routes/companyRoutes";
import {createOrder} from "../../actions";

const Result = ({status}) => {

    return (
        <div className="row py-4">

            <div className="col-md-12 text-center mb-3">
                <h3 className="font-signika font-25 text-primary bold">
                    {status.title}
                </h3>
                <p className="font-epilogue font-14 light color-3C3C3E">
                    {status.message}
                </p>
            </div>

            {
                status.status == 'PAID' ?
                    <div className="col-md-12 text-center">
                        <Link to={PANEL_COMPANY_ROUTES.PROJECTS.path}
                                className="btn btn-form btn-primary btn-rounded px-4">
                            <span>Ir a Objetivos</span>
                        </Link>
                    </div> : null
            }

            {
                status.status == 'REJECTED' || status.status == 'CANCELED' ?
                    <div className="col-md-12 text-center">
                        <Link to={PANEL_COMPANY_ROUTES.QUOTATIONS.path}
                              className="btn btn-form btn-outline-primary btn-rounded px-4">
                            <span>Cancelar</span>
                        </Link>
                        <button
                            onClick={() => createOrder(status.order.quotation_id)}
                              className="btn btn-form btn-primary btn-rounded px-4 ml-2">
                            <span>Reintentar</span>
                        </button>
                    </div> : null
            }

            {
                status.status == 'WAITING' ?
                    <div className="col-md-12 text-center">
                        <Link to={PANEL_COMPANY_ROUTES.PROJECTS.path}
                              className="btn btn-form btn-primary btn-rounded px-4">
                            <span>Ir a Solicitudes</span>
                        </Link>
                    </div> : null
            }


        </div>
    );
};

export default Result;
