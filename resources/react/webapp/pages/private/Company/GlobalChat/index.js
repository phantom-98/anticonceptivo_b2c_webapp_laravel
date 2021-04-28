import React, {useContext, useEffect, useState} from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../routes/companyRoutes";
import {Card} from "react-bootstrap";
import LazyLoading from "../../../../components/LazyLoading";
import {AuthContext} from "../../../../context/AuthProvider";
import InitGlobalChat from "../../../../components/GlobalChat/InitGlobalChat";
import {AuthType} from "../../../../Globals";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";

const GlobalChat = () => {

    const {auth, authType} = useContext(AuthContext);
    const [loaded, setLoaded] = useState(false);
    const [breadcrumbs, setBreadcrumbs] = useState([]);


    useEffect(() => {
        if (auth) {
            if(authType === AuthType.PROFESSIONAL){
                setBreadcrumbs([
                    {
                        url: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path,
                        name: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.title
                    },
                    {
                        url: PANEL_PROFESSIONAL_ROUTES.GLOBAL_CHAT.path,
                        name: PANEL_PROFESSIONAL_ROUTES.GLOBAL_CHAT.title
                    }
                ])
            }

            if(authType === AuthType.COMPANY){

                setBreadcrumbs([
                    {
                        url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
                        name: PANEL_COMPANY_ROUTES.DASHBOARD.title
                    },
                    {
                        url: PANEL_COMPANY_ROUTES.GLOBAL_CHAT.path,
                        name: PANEL_COMPANY_ROUTES.GLOBAL_CHAT.title
                    }
                ])
            }

            setLoaded(true)
        }
    }, [auth])


    return (
        <BasePanel
            title="Mensajes"
            breadcrumbs={breadcrumbs}>
            <div className="row">
                <div className="col-12">
                    {
                        loaded ? <div className="row">
                                <div className="col-12">
                                    <div className="mb-3">
                                        <Card style={{overflow: 'hidden'}}>
                                            <Card.Body className="p-0">
                                                <InitGlobalChat type="company" company_id={auth.company_id}/>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </div>
                            </div> :
                            <LazyLoading/>
                    }
                </div>
            </div>
        </BasePanel>
    );
};

export default GlobalChat;
