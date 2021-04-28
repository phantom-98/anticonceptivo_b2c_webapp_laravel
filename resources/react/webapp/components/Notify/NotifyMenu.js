import React, {Fragment, useContext} from 'react';

import {Link, useHistory} from "react-router-dom";
import {Dropdown} from 'react-bootstrap'
import {AuthContext} from "../../context/AuthProvider";
import moment from 'moment';
import {NotifyContext} from "../../context/NotifyProvider";
import {AuthType} from "../../Globals";
import PANEL_COMPANY_ROUTES from "../../routes/companyRoutes";
import PANEL_PROFESSIONAL_ROUTES from "../../routes/professionalRoutes";
import NoRegisterExits from "../NoRegisterExists";
import * as Services from "../../Services";

const NotifyMenu = () => {

    let history = useHistory();

    const {authType} = useContext(AuthContext);
    const {notifies, notifiesCount} = useContext(NotifyContext);

    const CustomToggle = React.forwardRef(({children, onClick}, ref) => (
        <div className="pointer"
             ref={ref}
             onClick={(e) => {
                 e.preventDefault();
                 onClick(e);
             }}>
            {children}
            {/*&#x25bc;*/}
        </div>
    ));


    const goLink = (id, link) => {
        let url = Services.ENDPOINT.PANEL.COMMON.NOTIFIES.SET_VIEWED;
        let data = {
            notify_id: id
        }
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        history.push(link)
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    }

    return (
        <Dropdown>
            <Dropdown.Toggle as={CustomToggle}
                             id="dropdown-custom-components">
                <img src="/themes/web/assets/images/header/menu-megaphone.svg"
                     rel="nofollow"/>
                {notifiesCount > 0 ? <span className="badge badge-danger counter-badge">{notifiesCount}</span> : null}
            </Dropdown.Toggle>
            <Dropdown.Menu align="right" bsPrefix="dropdown-menu-custom dp-notify">

                <div className="row menu-notify-viewport">

                    {
                        notifies.length > 0 ?
                            <Fragment>
                                {
                                    notifies.map((notify, index) => (

                                        <div className="col-12" key={index}>
                                            <div onClick={() => goLink(notify.id, notify.link)} className={`pointer menu-notify-box ${!notify.is_viewed ? 'not-viewed' : ''}`}>
                                                <div>
                                                    <h5 className="font-12 text-primary bold mb-1">{notify.title}</h5>
                                                    {
                                                        notify.description ?
                                                            <p className="font-10 color-3C3C3E mb-0">
                                                                {notify.description}</p>
                                                            : null
                                                    }
                                                    <p className="font-9 color-3C3C3E mb-0 light text-right">
                                                        <i className="fa fa-clock"/> {moment(notify.created_at).lang("es").fromNow()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                    ))
                                }
                            </Fragment>
                            :
                            <div className="col-12">
                                <div className="px-3 py-1">
                                    <NoRegisterExits message="No tiene nuevas notificaciones"/>
                                </div>
                            </div>
                    }
                </div>

                <div className="row">
                    <div className="col-12">
                        <hr className="my-1"/>
                    </div>
                    <div className="col-12 text-center">
                        <Link to={authType === AuthType.PROFESSIONAL ?
                            PANEL_PROFESSIONAL_ROUTES.NOTIFIES.path :
                            PANEL_COMPANY_ROUTES.NOTIFIES.path}
                              className="font-12 nav-link">Ver todos</Link>
                    </div>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotifyMenu;
