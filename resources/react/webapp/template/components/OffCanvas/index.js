import React, {Fragment} from 'react';
import CloseSvg from "../../../assets/images/icons/header/close-modal-blue.svg";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import Icon from "../../../components/general/Icon";
import logoFull from "../../../assets/images/logo-full.svg";
import {Link} from "react-router-dom";

const OffCanvas = ({children, showCanvas, closeCanvas}) => {

        return (
            <Fragment>
                {
                    showCanvas ? <div id="bg-offcanvas" onClick={closeCanvas} /> : null
                }
                <div className={`offcanvas-block-left ${showCanvas ? 'show' : ''}`} style={{
                    maxWidth: '339px',
                    width: '100%',
                    padding: 0,
                }}>
                    <div style={{
                        padding: 15,
                        paddingTop: 0
                    }}>
                        <div className="row mb-2" style={{
                            background: '#FAFAFA',
                            padding: '15px 0'
                        }}>
                            <div className="col-8">
                                <Link to={PUBLIC_ROUTES.HOME.path}>
                                    <Icon path={logoFull} style={{height: 28}}/>
                                </Link>
                                {/*<span className="font-18 bold font-poppins color-0869A6"*/}
                                {/*      style={{letterSpacing: '5px'}}>Categorías</span>*/}
                            </div>
                            <div className="col-4 pointer mb-2 text-right" onClick={closeCanvas}>
                                <img src={CloseSvg} rel="nofollow" alt="anticonceptivo"/>
                            </div>
                        </div>
                        <div className="canvas-content">
                            {
                                children
                            }
                        </div>
                    </div>
                </div>
            </Fragment>

        );
    }
;

export default OffCanvas;
