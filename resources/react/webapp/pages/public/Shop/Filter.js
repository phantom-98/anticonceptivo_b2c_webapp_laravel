import React, {useState} from 'react';
import {Accordion, Card} from "react-bootstrap";
import {formatMoney} from "../../../helpers/GlobalUtils";
import BioequivalentFilter from "./Filters/BioequivalentFilter";
import CategoryFilter from "./Filters/CategoryFilter";
import FormatFilter from "./Filters/FormatFilter";
import LaboratoryFilter from "./Filters/LaboratoryFilter";
import PriceFilter from "./Filters/PriceFilter";
import SubscriptionFilter from "./Filters/SubscriptionFilter";

const Filter = ({
    isPills,
    laboratories,
    subcategories,
    subscriptions,
    formats,
    filters,
    setFilters,
    filtersUpdate,
    setFiltersUpdate
    // setLaboratories,
    // subscriptions,
    // filtersCat,
    // setProductsFiltered,
    // setLoading,
    // subCategoriesSelected,
    // setSubcategoriesSelected
}) => {

    const _filters = [
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

    const [max, setMax] = useState(200000);
    const [localPrice, setLocalPrice] = useState(200000);

    return (
        <div className="row">
            <div className="col-md-12 mb-3">
                <Accordion defaultActiveKey={!isPills ? _filters[0].id : _filters[1].id} className="accordion-filter">
                    {
                        !isPills ? 
                             <Card key={_filters[0].id} className="card-filter">
                                <Accordion.Collapse eventKey={_filters[0].id}>
                                    <Card.Body bsPrefix="card-body pt-0">
                                        <CategoryFilter
                                            subcategories={subcategories}
                                            setFilters={setFilters}
                                            filters={filters}
                                            filtersUpdate={filtersUpdate}
                                            setFiltersUpdate={setFiltersUpdate}
                                        />
                                    </Card.Body>
                                </Accordion.Collapse>
                                <Accordion.Toggle as={Card.Header} eventKey={_filters[0].id}>
                                    <h3>{_filters[0].name}</h3>
                                </Accordion.Toggle>
                            </Card>   
                        : null
                    }

                    <Card key={_filters[1].id} className="card-filter">
                        <Accordion.Collapse eventKey={_filters[1].id}>
                            <Card.Body bsPrefix="card-body pt-0">
                                <LaboratoryFilter
                                    laboratories={laboratories}
                                    setFilters={setFilters}
                                    filters={filters}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey={_filters[1].id}>
                            <h3>{_filters[1].name}</h3>
                        </Accordion.Toggle>
                    </Card>

                    <Card key={_filters[2].id} className="card-filter">
                        <Accordion.Collapse eventKey={_filters[2].id}>
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
                                        filters={filters}
                                        setFilters={setFilters}
                                        localPrice={localPrice}
                                        setLocalPrice={setLocalPrice}
                                        max={max}
                                    />
                                </div>
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey={_filters[2].id}>
                            <h3>{_filters[2].name}</h3>
                        </Accordion.Toggle>
                    </Card>

                    <Card key={_filters[3].id} className="card-filter">
                        <Accordion.Collapse eventKey={_filters[3].id}>
                            <Card.Body bsPrefix="card-body pt-0">
                                <BioequivalentFilter
                                    filters={filters}
                                    setFilters={setFilters}
                                />
                            </Card.Body>
                        </Accordion.Collapse>
                        <Accordion.Toggle as={Card.Header} eventKey={_filters[3].id}>
                            <h3>{_filters[3].name}</h3>
                        </Accordion.Toggle>
                    </Card>

                    {
                        subscriptions.length ?
                            <Card key={_filters[4].id} className="card-filter">
                                <Accordion.Collapse eventKey={_filters[4].id}>
                                    <Card.Body bsPrefix="card-body pt-0">
                                        <SubscriptionFilter
                                            subscriptions={subscriptions}
                                            filters={filters}
                                            setFilters={setFilters}
                                        />
                                    </Card.Body>
                                </Accordion.Collapse>
                                <Accordion.Toggle as={Card.Header} eventKey={_filters[4].id}>
                                    <h3>{_filters[4].name}</h3>
                                </Accordion.Toggle>
                            </Card>
                        : null
                    }

                    {
                        formats.length ?
                            <Card key={_filters[5].id} className="card-filter">
                                <Accordion.Collapse eventKey={_filters[5].id}>
                                    <Card.Body bsPrefix="card-body pt-0">
                                        <FormatFilter 
                                            formats={formats}
                                            filters={filters}
                                            setFilters={setFilters}
                                        />
                                    </Card.Body>
                                </Accordion.Collapse>
                                <Accordion.Toggle as={Card.Header} eventKey={_filters[5].id}>
                                    <h3>{_filters[5].name}</h3>
                                </Accordion.Toggle>
                            </Card>
                        : null
                    }

                </Accordion>
            </div>
        </div>
    );
};

export default Filter
