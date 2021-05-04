import React, {Fragment, useContext, useEffect, useState} from 'react';

import {AuthContext} from "../../../context/AuthProvider";
import PRIVATE_ROUTES from "../../../routes/privateRoutes";
import BasePanelOne from "../../../template/BasePanelOne";
import AccountMenu from "./AccountMenu";
import PersonalInfo from "./sections/PersonalInfo";
import Addresses from "./sections/Addresses";
import ShoppingHistory from "./sections/ShoppingHistory";
import Subscription from "./sections/Subscription";
import Receipts from "./sections/Receipts";
import CustomerService from "./sections/CustomerService";
import {Redirect} from "react-router-dom";

const Account = ({match}) => {

    const {auth} = useContext(AuthContext);

    const [sectionSelected, setSectionSelected] = useState('');

    const [loaded, setLoaded] = useState(false);

    let breadcrumbs = [
        {
            url: PRIVATE_ROUTES.ACCOUNT.path,
            name: 'Mi Cuenta'
        }
    ];

    const sections = {

        PERSONAL_INFO: {
            url: 'informacion-personal',
            title: 'Información Personal'
        },
        ADDRESSES: {
            url: 'direcciones',
            title: 'Direcciones'
        },
        SHOPPING_HISTORY: {
            url: 'historial-compras',
            title: 'Historial de Compra'
        },
        SUBSCRIPTION: {
            url: 'suscripcion',
            title: 'Suscripción'
        },
        RECEIPTS: {
            url: 'mis-recetas',
            title: 'Mis Recetas'
        },
        CUSTOMER_SERVICE: {
            url: 'servicio-cliente',
            title: 'Servicio al Cliente'
        }
    }


    useEffect(() => {
        if (match && match.params && 'section' in match.params) {
            const section = match.params.section;
            Object.keys(sections).map((key, index) => {
                if (section == sections[key].url) {
                    breadcrumbs.push(sections[key]);
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

    return (
        <BasePanelOne
            breadcrumbs={breadcrumbs}
            title="Mi cuenta"
        >
            <div className="row">
                {
                    loaded ?
                        <Fragment>
                            <div className="col-md-3">
                                <AccountMenu sections={sections} sectionSelected={sectionSelected}/>
                            </div>
                            <div className="col-md-9">

                                {
                                    processRoute()
                                }

                            </div>
                        </Fragment> : null
                }
            </div>
        </BasePanelOne>
    );
};

export default Account;
