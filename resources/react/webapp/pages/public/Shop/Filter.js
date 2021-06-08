import React, {useState, useEffect} from 'react';
import {Accordion, Card} from "react-bootstrap";
import * as Services from "../../../Services";
import {formatMoney} from "../../../helpers/GlobalUtils";

import BioequivalentFilter from "./Filters/BioequivalentFilter";
import CategoryFilter from "./Filters/CategoryFilter";
import FormatFilter from "./Filters/FormatFilter";
import LaboratoryFilter from "./Filters/LaboratoryFilter";
import PriceFilter from "./Filters/PriceFilter";
import SubscriptionFilter from "./Filters/SubscriptionFilter";

const Filter = ({laboratories, setLaboratories, subscriptions, filtersCat, setProductsFiltered, 
setLoading, subCategoriesSelected, setSubcategoriesSelected}) => {

    const filters = [
        {
            id: 1, 
            name: 'Subcategorías',
        },
        {
            id: 2, 
            name: 'Laboratorio',
        },
        {
            id: 3, 
            name: 'Precio',
        },
        {
            id: 4, 
            name: 'Bioequivalencia',
        },
        {
            id: 5, 
            name: 'Suscripción',
        },
        {
            id: 6,
            name: 'Formato',
        }
    ]

    const [laboratoriesSelected, setLaboratoriesSelected] = useState([]);
    const [bioequivalentSelected, setBioequivalentSelected] = useState(null);
    const [formatSelected, setFormatSelected] = useState([]);
    const [subscriptionSelected, setSubscriptionSelected] = useState([]);

    const [max, setMax] = useState(200000);
    const [priceSelected, setPriceSelected] = useState(200000);
    const [localPrice, setLocalPrice] = useState(200000);
    

    // useEffect(() => {
    //     if (subCatSelectedId) {
    //         setSubcategories([])
    //         setSubcategories([...subcategories, subCatSelectedId])
    //     }
    // },[subCatSelectedId])

    // const handleSubCategory = (e) => {
    //     let list = [...subcategories];

    //     if (list.includes(parseInt(e.target.id))) {
    //         list = list.filter(x => x !== parseInt(e.target.id));   
    //     }else{
    //         list = [...list, parseInt(e.target.id)];
    //     }

    //     setSubcategories(list);
    // }

    useEffect(() => {
        if (subCategoriesSelected.length > 0) {
            getProductsFiltered();
        }
    },[subCategoriesSelected, laboratoriesSelected, bioequivalentSelected, 
    formatSelected, subscriptionSelected, priceSelected])

    const getProductsFiltered = () => {
        let url = Services.ENDPOINT.NO_AUTH.SHOP.PRODUCTS_FILTERED;
        let data = {
            subcats: subCategoriesSelected,
            labs: laboratoriesSelected,
            bioequivalent :bioequivalentSelected,
            format :formatSelected,
            subscription :subscriptionSelected,
            price :priceSelected,
        }
        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    setProductsFiltered(response.data.products);
                    setLaboratories(response.data.laboratories)
                    setLoading(true);
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <div className="row">
            <div className="col-md-12 mb-3">
                <Accordion defaultActiveKey={filters[0].id} className="accordion-filter">
                    <Card key={filters[0].id} className="card-filter">
                        <Accordion.Collapse eventKey={filters[0].id}>
                            <Card.Body bsPrefix="card-body pt-0">
                                <CategoryFilter
                                    categories={filtersCat}
                                    subCategoriesSelected={subCategoriesSelected}
                                    setSubcategoriesSelected={setSubcategoriesSelected}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey={filters[0].id}>
                            <h3>{filters[0].name}</h3>
                        </Accordion.Toggle>
                    </Card>

                    <Card key={filters[1].id} className="card-filter">
                        <Accordion.Collapse eventKey={filters[1].id}>
                            <Card.Body bsPrefix="card-body pt-0">
                                <LaboratoryFilter
                                    laboratories={laboratories}
                                    laboratoriesSelected={laboratoriesSelected}
                                    setLaboratoriesSelected={setLaboratoriesSelected}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey={filters[1].id}>
                            <h3>{filters[1].name}</h3>
                        </Accordion.Toggle>
                    </Card>

                    <Card key={filters[2].id} className="card-filter">
                        <Accordion.Collapse eventKey={filters[2].id}>
                            <Card.Body bsPrefix="card-body pt-0">
                                <div className="row">
                                    <div className="col-6">
                                        <span className="font-12 regular color-3B3B3B">
                                            $100
                                        </span>
                                    </div>
                                    <div className="col-6 text-right">
                                        <span className="font-12 regular color-3B3B3B">
                                            {formatMoney(localPrice)}
                                        </span>
                                    </div>
                                    <PriceFilter
                                        priceSelected={priceSelected}
                                        setPriceSelected={setPriceSelected}
                                        localPrice={localPrice}
                                        setLocalPrice={setLocalPrice}
                                        max={max}
                                    />
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey={filters[2].id}>
                            <h3>{filters[2].name}</h3>
                        </Accordion.Toggle>
                    </Card>

                    <Card key={filters[3].id} className="card-filter">
                        <Accordion.Collapse eventKey={filters[3].id}>
                            <Card.Body bsPrefix="card-body pt-0">
                                <BioequivalentFilter
                                    bioequivalentSelected={bioequivalentSelected}
                                    setBioequivalentSelected={setBioequivalentSelected}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey={filters[3].id}>
                            <h3>{filters[3].name}</h3>
                        </Accordion.Toggle>
                    </Card>

                    <Card key={filters[4].id} className="card-filter">
                        <Accordion.Collapse eventKey={filters[4].id}>
                            <Card.Body bsPrefix="card-body pt-0">
                                <SubscriptionFilter
                                    subscriptions={subscriptions}
                                    subscriptionSelected={subscriptionSelected}
                                    setSubscriptionSelected={setSubscriptionSelected}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey={filters[4].id}>
                            <h3>{filters[4].name}</h3>
                        </Accordion.Toggle>
                    </Card>

                    <Card key={filters[5].id} className="card-filter">
                        <Accordion.Collapse eventKey={filters[5].id}>
                            <Card.Body bsPrefix="card-body pt-0">
                                <FormatFilter 
                                    formatSelected={formatSelected}
                                    setFormatSelected={setFormatSelected}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey={filters[5].id}>
                            <h3>{filters[5].name}</h3>
                        </Accordion.Toggle>
                    </Card>

                </Accordion>
            </div>
        </div>
    );
};

export default Filter
