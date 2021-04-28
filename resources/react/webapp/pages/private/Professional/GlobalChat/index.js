import React, {useContext, useState, useEffect} from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_PROFESSIONAL_ROUTES from "../../../../routes/professionalRoutes";
import {AuthContext} from "../../../../context/AuthProvider";
import {Card} from "react-bootstrap";
import LazyLoading from "../../../../components/LazyLoading";
import InitGlobalChat from "../../../../components/GlobalChat/InitGlobalChat";

const GlobalChat = () => {

    const {auth} = useContext(AuthContext);
    const [loaded, setLoaded] = useState(false);

    const breadcrumbs = [
        {
            url: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.path,
            name: PANEL_PROFESSIONAL_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_PROFESSIONAL_ROUTES.GLOBAL_CHAT.path,
            name: PANEL_PROFESSIONAL_ROUTES.GLOBAL_CHAT.title
        }
    ];

    useEffect(() => {
        if (auth) {
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
                                                <InitGlobalChat type="professional" professional_id={auth.professional_id}/>
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
