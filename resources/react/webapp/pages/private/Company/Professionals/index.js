import React, {useEffect, useState} from 'react';

import BasePanel from "../../../../template/BasePanel";
import PANEL_COMPANY_ROUTES from "../../../../routes/companyRoutes";
import * as Services from "../../../../Services";
import LazyLoading from "../../../../components/LazyLoading";
import Filter from "./components/Filter";
import SearchBar from "./components/SearchBar";
import ProfessionalList from "./ProfessionaList";

const Professionals = () => {

    const [loaded, setLoaded] = useState(false);
    const [professionals, setProfessionals] = useState([]);
    const [professionalsWithFilter, setProfessionalsWithFilter] = useState(null);
    const [search, setSearch] = useState('');

    const breadcrumbs = [
        {
            url: PANEL_COMPANY_ROUTES.DASHBOARD.path,
            name: PANEL_COMPANY_ROUTES.DASHBOARD.title
        },
        {
            url: PANEL_COMPANY_ROUTES.PROFESSIONAL_LIST.path,
            name: PANEL_COMPANY_ROUTES.PROFESSIONAL_LIST.title
        }
    ]

    useEffect(() => {
        index();
    }, []);

    const index = () => {

        let url = Services.ENDPOINT.PANEL.COMPANY.PROFESSIONALS.GET_LIST;

        Services.DoPost(url).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setProfessionals(response.data.professionals)
                    setLoaded(true);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <BasePanel
            title="Buscador de profesionales"
            breadcrumbs={breadcrumbs}>
            <div className="row">
                <div className="col-12">
                    {loaded ? (
                        <div className="row">
                            <div className="col-4">
                                <Filter
                                    professionals={professionals}
                                    setProfessionalsWithFilter={setProfessionalsWithFilter}
                                    search={search}
                                />
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-12">
                                        <SearchBar
                                            setSearch={setSearch}
                                        />
                                    </div>
                                    <div className="col-12">
                                        <ProfessionalList
                                            professionals={
                                                professionalsWithFilter
                                                    ? professionalsWithFilter
                                                    : professionals
                                            }
                                            loaded={loaded}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <LazyLoading/>
                    )}
                </div>
            </div>
        </BasePanel>
    );
};

export default Professionals;
