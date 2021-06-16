import React, {Fragment, useState, useEffect} from 'react';
import BasePanelTwo from "../../../template/BasePanelTwo";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {Card} from "react-bootstrap";
import ClaimItem from "./ClaimItem";
import Pagination from "react-js-pagination";

const Claim = () => {

    let breadcrumbs = [
        {
            url: PUBLIC_ROUTES.HOME.path,
            name: 'Inicio'
        },
        {
            url: PUBLIC_ROUTES.CLAIM.path,
            name: PUBLIC_ROUTES.CLAIM.title,
        }
    ];

    const [claims, setClaims] = useState([
        {
            name: 'Teresa',
            date: '28-03-2021',
            description: 'Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt. Proin eget tortor risus.',
        },
        {
            name: 'Pedro',
            date: '28-03-2021',
            description: 'Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt. Proin eget tortor risus.',
        },
        {
            name: 'Manuel',
            date: '28-03-2021',
            description: 'Vivamus suscipit tortor eget felis porttitor volutpat. Nulla porttitor accumsan tincidunt. Proin eget tortor risus.',
        }
    ])

    const [activePage, setActivePage] = useState(1);
    const [pageRangeDisplayed, setPageRangeDisplayed] = useState(1);
    const [itemsCountPerPage, setItemsCountPerPage] = useState(10);
    const [totalItemsCount, setTotalItemsCount] = useState(3);

    useEffect(() => {
        setActivePage(1);
    },[itemsCountPerPage])

    return (
        <Fragment>
            <BasePanelTwo
                breadcrumbs={breadcrumbs}
            >
                <div className="row">
                    <div className="col">
                        <h3 className="base-panel-one-title" style={{letterSpacing: '2px'}}>LIBRO DE RECLAMOS</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col font-poppins font-20 color-033F5D">
                        Para ingresar un reclamo presiona <a className="font-poppins font-20 bold color-033F5D" style={{cursor:'pointer'}} onClick={() => alert('modal?')}>aquí</a>
                    </div>
                </div>
                <div className="row">
                    {
                        claims.map((claim) => {
                            return(
                                <div className="col-10 offset-1 mt-3">
                                    <Card className="card-claim">
                                        <Card.Body>
                                            <ClaimItem
                                                name={claim.name}
                                                date={claim.date}
                                                description={claim.description}
                                            />
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="row">
                    <div className="col-12 mt-5">
                        <Pagination
                            activePage={activePage}
                            itemsCountPerPage={itemsCountPerPage}
                            totalItemsCount={totalItemsCount}
                            pageRangeDisplayed={pageRangeDisplayed}
                            onChange={e => setActivePage(e)}
                            itemClass={'paginator-buttons'}
                            innerClass={'paginator-ul'}
                            // hideNavigation={true}
                            hideDisabled={true}
                            hideFirstLastPages={true}
                        />
                        <label className="font-poppins font-12 regular paginator-label">Páginas</label>
                    </div>
                </div>
            </BasePanelTwo>
        </Fragment>
    );
};

export default Claim