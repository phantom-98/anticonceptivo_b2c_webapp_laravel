import React, {Fragment, useEffect, useState} from 'react';
import BasePanelTwo from "../../../template/BasePanelTwo";
import Subscribe from "../../../components/sections/Subscribe";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import ProductsCarousel from "../../../components/sections/ProductsCarousel";
import H2Title from "../../../components/general/H2Title";
import TimeLine from "./TimeLine";
import * as Services from "../../../Services";

const History = () => {

    const [timelines, setTimelines] = useState([]);

    let breadcrumbs = [
        {
            url: PUBLIC_ROUTES.HOME.path,
            name: 'Inicio'
        },
        {
            url: PUBLIC_ROUTES.HISTORY.path,
            name: PUBLIC_ROUTES.HISTORY.title,
        },
    ];

    useEffect(() => {
        getData();
    },[])

    const getData = () => {
        let url = Services.ENDPOINT.PUBLIC_AREA.HISTORY;
        let data = {}
        Services.DoGet(url,data).then(response => {
            Services.Response({
                response: response,
                success: () => {

                    setTimelines(response.data.time_lines);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <Fragment>
            <BasePanelTwo
                breadcrumbs={breadcrumbs}
            >

                <div className="row">
                    <div className="col-md-12">
                        <div className="panel">
                            <div className="panel-body">
                                <div className="row">
                                    <div className="col-12 pt-4">
                                        <H2Title text="HISTORIA DE LOS ANTICONCEPTIVOS"/>
                                    </div>
                                    <div className="col-12">
                                        <TimeLine
                                            timelines={timelines}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </BasePanelTwo>
            {/* <ProductsCarousel title="Te podría interesar"/> */}
            <Subscribe/>
        </Fragment>
    );
};

export default History
