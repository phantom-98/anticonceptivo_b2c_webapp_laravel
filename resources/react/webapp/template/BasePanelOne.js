import React, {useContext} from 'react';
import Breadcrumbs from "../components/Breadcrumbs";
import {Link, useLocation} from "react-router-dom";
import {AuthContext} from "../context/AuthProvider";
import {AppContext} from "../context/AppProvider";
import { BREAKPOINTS } from "../helpers/vars";

const BasePanelOne = (props) => {
    const {breakpoint} = useContext(AppContext)
    const {logout} = useContext(AuthContext)

    let location = useLocation();
    return (
        <div style={{background: '#FAFAFA'}}>
            <div className="container py-4">

                <Breadcrumbs items={props.breadcrumbs}/>

                <div className="panel mb-4">
                    <div className="responsive-base-panel" style={props.style}>
                        <div className="row">
                            {
                                breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                                    <div className="col-md-12">
                                        {
                                            props.title ?
                                                <h1 className="base-panel-one-title">{props.title}</h1>
                                                : null
                                        }
                                    </div>
                                :
                                    <>
                                        <div className="col">
                                            {
                                                props.title ?
                                                    <h1 className="base-panel-one-title"
                                                        style={{marginBottom: 0}}>{props.title}</h1>
                                                    : null
                                            }
                                        </div>

                                        {
                                            location.pathname.includes('/mi-cuenta/') ?
                                                <div className="col-auto d-flex  px-0">
                                                    <Link to="#" onClick={() => logout()}
                                                          className="my-auto font-poppins font-14 lh-12 bold pointer text-danger">
                                                        <div className="text-right">
                                                            Cerrar
                                                        </div>
                                                    </Link>
                                                </div>
                                                : null
                                        }
                                    </>
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
