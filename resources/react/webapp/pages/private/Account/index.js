import React, {Fragment, useContext, useEffect, useState} from 'react';

import {AuthContext} from "../../../context/AuthProvider";
import PRIVATE_ROUTES from "../../../routes/privateRoutes";
import BasePanelOne from "../../../template/BasePanelOne";
import PersonalInfo from "./sections/PersonalInfo";
import Addresses from "./sections/Addresses";
import ShoppingHistory from "./sections/ShoppingHistory";
import Subscription from "./sections/Subscription";
import Receipts from "./sections/Receipts";
import CustomerService from "./sections/CustomerService";
import {Redirect} from "react-router-dom";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import LateralMenu from "../../../components/general/LateralMenu";
import UseWindowDimensions from "../../../components/customHooks/UseWindowDimensions";
import MobileDisplay from "./MobileDisplay";

const Account = ({match}) => {

    const {auth} = useContext(AuthContext);

    const { height, width } = UseWindowDimensions();

    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [sectionSelected, setSectionSelected] = useState('');

    const [loaded, setLoaded] = useState(false);


    const sections = {

        PERSONAL_INFO: {
            url: 'informacion-personal',
            name: 'Información Personal'
        },
        ADDRESSES: {
            url: 'direcciones',
            name: 'Direcciones'
        },
        SHOPPING_HISTORY: {
            url: 'historial-compras',
            name: 'Historial de Compra'
        },
        SUBSCRIPTION: {
            url: 'suscripcion',
            name: 'Historial de Suscripciones'
        },
        RECEIPTS: {
            url: 'mis-recetas',
            name: 'Mis Recetas'
        },
        CUSTOMER_SERVICE: {
            url: 'servicio-cliente',
            name: 'Servicio al Cliente'
        }
    }

    useEffect(() => {
        if (match && match.params && 'section' in match.params) {
            const section = match.params.section;
            Object.keys(sections).map((key, index) => {
                if (section == sections[key].url) {
                    setBreadcrumbs([
                        {
                            url: PUBLIC_ROUTES.HOME.path,
                            name: 'Inicio'
                        },
                        {
                            url: PRIVATE_ROUTES.ACCOUNT.path,
                            name: 'Mi Cuenta'
                        },
                        sections[key]
                    ])
                }
            })
            setSectionSelected(section);
            setLoaded(true)
        }
    }, [match])


    const processRoute = () => {
        switch (sectionSelected) {
            case sections.PERSONAL_INFO.url:
                return <PersonalInfo/>

            case sections.ADDRESSES.url:
                return <Addresses/>;

            case sections.SHOPPING_HISTORY.url:
                return <ShoppingHistory/>;

            case sections.SUBSCRIPTION.url:
                return <Subscription/>;

            case sections.RECEIPTS.url:
                return <Receipts/>;

            case sections.CUSTOMER_SERVICE.url:
                return <CustomerService/>;

            default:
                let url = PRIVATE_ROUTES.ACCOUNT.path;
                url = url.replace(':section', sections.PERSONAL_INFO.url)
                return <Redirect to={url} />
        }
    }

    const handleSection = (section) => {
        let url = PRIVATE_ROUTES.ACCOUNT.path;
        return url.replace(':section', section);
    }

    const processRouteMobile = () => {
        switch (sectionSelected) {
            case 0:
                return <PersonalInfo />

            case 1:
                return <Addresses />;

            case 2:
                return <ShoppingHistory />;

            case 3:
                return <Subscription />;

            case 4:
                return <Receipts />;

            case 5:
                return <CustomerService />;
        }
    }

    return (
        <BasePanelOne
            breadcrumbs={breadcrumbs}
            title="Mi cuenta"
        >
            <div className="row">
                {
                    loaded ?
                        width >= 768 ?
                            <Fragment>
                                <div className="col-md-3">
                                    <LateralMenu sections={sections} sectionSelected={sectionSelected} handleSection={handleSection} />
                                </div>
                                <div className="col-md-9">
                                    {
                                        processRoute()
                                    }
                                </div>
                            </Fragment>
                            : <MobileDisplay 
                                sections={sections} 
                                sectionSelected={sectionSelected} 
                                handleSection={handleSection}
                                processRouteMobile={processRouteMobile}
                              />
                    : null
                }
            </div>
        </BasePanelOne>
    );
};

export default Account;
