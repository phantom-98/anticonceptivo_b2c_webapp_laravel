import React, {useContext} from 'react';
import Breadcrumbs from "../components/Breadcrumbs";
import UseWindowDimensions from "../components/customHooks/UseWindowDimensions";
import {Link, useLocation} from "react-router-dom";
import {AuthContext} from "../context/AuthProvider";

const BasePanelOne = (props) => {

    const { width } = UseWindowDimensions();
    const { logout } = useContext(AuthContext)

    let location = useLocation();
    return (
        <div style={{background : '#FAFAFA'}}>
            <div className="container py-4">

                <Breadcrumbs items={props.breadcrumbs}/>

                <div className="panel mb-4">
                    <div className="responsive-base-panel" style={props.style}>
                        <div className="row">
                            {
                                width < 768 ?
                                <>
                                    <div className="col-8">
                                        {
                                            props.title ?
                                                <h1 className="base-panel-one-title">{props.title}</h1>
                                            : null
                                        }
                                    </div>

                                    {
                                         location.pathname.includes('/mi-cuenta/') ?
                                            <div className="col-4">
                                                <Link to="#" onClick={() => logout()} className="font-poppins font-16 lh-12 regular pointer text-danger">
                                                    <div className="text-right mt-2">Cerrar</div>
                                                </Link>
                                            </div>
                                        : null
                                    }
                                </>
                                :

                                <div className="col-md-12">
                                    {
                                        props.title ?
                                            <h1 className="base-panel-one-title">{props.title}</h1>
                                        : null
                                    }
                                </div>
                            }
                            <div className="col-md-12">
                                {
                                    props.children
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default BasePanelOne;
