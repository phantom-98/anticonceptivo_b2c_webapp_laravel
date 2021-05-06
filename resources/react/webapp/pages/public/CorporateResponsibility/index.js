import React, {Fragment, useEffect, useState} from 'react';

import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {Redirect} from "react-router-dom";
import PrivacyPolicies from "./PrivacyPolicies";
import LegalBases from "./LegalBases";
import DeliveryCostsDeadlines from "./DeliveryCostsDeadlines";
import BasePanelOne from "../../../template/BasePanelOne";
import LateralMenu from "../../../components/general/LateralMenu";

const CorporateResponsibility = ({match}) => {

    const [breadcrumbs, setBreadcrumbs] = useState([]);
    const [sectionSelected, setSectionSelected] = useState('');

    const [loaded, setLoaded] = useState(false);

    const sections = {
        PRIVACY_POLICIES: {
            url: 'politicas-de-privacidad',
            name: 'Políticas de Privacidad'
        },
        LEGAL_BASE: {
            url: 'bases-legales',
            name: 'Bases Legales'
        },
        DELIVERY_COSTS_DEADLINES: {
            url: 'plazos-y-costos-entrega',
            name: 'Plazos y Costos Entrega'
        },
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
                            url: PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path,
                            name: PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.title
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
            case sections.PRIVACY_POLICIES.url:
                return <PrivacyPolicies/>;
            case sections.LEGAL_BASE.url:
                return <LegalBases/>;
            case sections.DELIVERY_COSTS_DEADLINES.url:
                return <DeliveryCostsDeadlines/>;
            default:
                let url = PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path;
                url = url.replace(':section', sections.PRIVACY_POLICIES.url)
                return <Redirect to={url}/>

        }
    }

    const handleSection = (section) => {
        let url = PUBLIC_ROUTES.CORPORATE_RESPONSIBILITY.path;
        return url.replace(':section', section);
    }

    return (
        <BasePanelOne
            breadcrumbs={breadcrumbs}
            title="RESPONSABILIDAD EMPRESARIAL"
        >
            <div className="row">
                {
                    loaded ?
                        <Fragment>
                            <div className="col-md-3">
                                <LateralMenu sections={sections} sectionSelected={sectionSelected} handleSection={handleSection}/>
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

export default CorporateResponsibility
