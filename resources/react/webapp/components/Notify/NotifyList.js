import React, {Fragment, useContext, useEffect, useState} from 'react';

import moment from "moment";
import {AuthContext} from "../../context/AuthProvider";
import * as Services from "../../Services";
import {useHistory} from "react-router-dom";
import NoRegisterExits from "../NoRegisterExists";
import {AuthType} from "../../Globals";


const NotifyList = () => {

    let history = useHistory();

    const {auth, authType} = useContext(AuthContext);

    const [notifiesList, setNotifiesList] = useState([]);

    useEffect(() => {
        if (auth) {
            getList();
        }
    }, [auth])

    const getList = () =>{
        let url = Services.ENDPOINT.PANEL.COMMON.NOTIFIES.GET_LIST;
        let data = {
            auth_type: authType,
            auth_id : authType == AuthType.PROFESSIONAL ? auth.professional_id : auth.company_id
        }
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        setNotifiesList(response.data.notifies)
                    },
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    }

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
        <div className="row">
            {
                notifiesList.length > 0 ?
                    <Fragment>
                        {
                            notifiesList.map(notify => (
                                <div className="col-12">
                                    <div onClick={() => goLink(notify.id, notify.link)} className={`pointer menu-notify-box py-3 px-4 ${!notify.is_viewed ? 'not-viewed' : ''}`}>
                                        <div className="row">
                                            <div className="col">
                                                <div style={{textDecoration: 'none'}}>
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
                                    </div>
                                </div>

                            ))
                        }
                    </Fragment>
                    :
                    <div className="col">
                        <NoRegisterExits message="No tiene notificaciones"/>
                    </div>
            }
        </div>
    );
};

export default NotifyList;
