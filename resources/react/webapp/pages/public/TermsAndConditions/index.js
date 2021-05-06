import React, {Fragment, useEffect, useState} from 'react';
import BasePanelOne from "../../../template/BasePanelOne";
import Terms from "./Terms";
import Decree3 from "./Decree3";
import Decree466 from "./Decree466";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";

const TermsAndConditions = () => {

    const [breadcrumbs, setBreadcrumbs] = useState([]);

    const [sectionSelected, setSectionSelected] = useState({});

    const [loaded, setLoaded] = useState(false);

    const sections = {
        TERMS: {
            url: 'terminos-y-condiciones',
            name: 'Términos y condiciones'
        },
        DECREE_3: {
            url: 'decreto-3',
            name: 'Decreto 3'
        },
        DECREE_466: {
            url: 'decreto-466',
            name: 'Decreto 466'
        },
    }

    useEffect(() => {
        setSectionSelected(sections.TERMS)
    }, [])

    useEffect(() => {
        if (sectionSelected) {
            Object.keys(sections).map((key, index) => {
                if (sectionSelected.url ===  sections[key].url) {
                    setBreadcrumbs([
                        {
                            url: PUBLIC_ROUTES.HOME.path,
                            name: 'Inicio'
                        },
                        sections[key]
                    ])
                }
            })
            setLoaded(true)
        }
    }, [sectionSelected])

    const processRoute = () => {

        switch (sectionSelected.url) {
            case sections.TERMS.url:
                return <Terms/>;
            case sections.DECREE_3.url:
                return <Decree3/>;
            case sections.DECREE_466.url:
                return <Decree466/>;
            default:
                return <Terms/>;
        }
    }


    return (
        <BasePanelOne
            breadcrumbs={breadcrumbs}
        >
            <div className="row">
                {
                    loaded ?
                        <Fragment>
                            <div className="col-md-3">
                                {

                                    Object.keys(sections).map((key, index) => {
                                        return <div key={index} className="col-12 mb-2">
                                            <div onClick={() => setSectionSelected(sections[key])}
                                                 style={{textDecoration: 'none'}}>
                                                <div
                                                    className={`menu-section ${sections[key].url === sectionSelected.url ? 'active' : ''}`}>
                                                        <span className="menu-section-item">
                                                            {sections[key].name}
                                                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    })

                                }
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

export default TermsAndConditions
