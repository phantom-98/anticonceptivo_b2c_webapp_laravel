import React,{useEffect, useState} from 'react';
import {Accordion, Card, Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const Filter = ({subCategories, laboratories, filtersCat}) => {


    const filters = [
        {
            id: 1, 
            name: 'Subcategorías',
            mode: 'checkbox',
            bodies: filtersCat
        },
        {
            id: 2, 
            name: 'Laboratorio',
            mode: 'checkbox',
            bodies: laboratories
        },
        {
            id: 3, 
            name: 'Precio',
            mode: 'range',
            bodies: []
        },
        {
            id: 4, 
            name: 'Bioequivalencia',
            mode: 'checkbox',
            bodies: []
        },
        {
            id: 5, 
            name: 'Suscripción',
            mode: 'checkbox',
            bodies: []
        },
        {
            id: 6,
            name: 'Formato',
            mode: 'checkbox',
            bodies: []
        }
    ]

    return (
        <div className="row">
            <div className="col-md-12 mb-3">
                <Accordion defaultActiveKey={filters[0].id} className="accordion-filter">
                    {
                        filters.map((filter) => {

                            return <Card key={filter.id} className="card-filter">
                                <Accordion.Collapse eventKey={filter.id}>
                                    <Card.Body bsPrefix="card-body pt-0">
                                        {
                                            filter.bodies.map((body) => {
                                                let uuid = uuidv4();
                                                
                                                return <Form.Check
                                                    custom
                                                    label={<span className="font-poppins font-12 text-black my-auto">{body.name}{/* <span className="color-D8D8D8">({body.total})</span> */}</span>}
                                                    type="checkbox"
                                                    name={body.name}
                                                    // checked={}
                                                    id={`custom-inline-checkbox-${filter.id}-${body.id}`}
                                                    // onChange={}
                                                    key={uuid}
                                                />
                                            })
                                        }

                                    </Card.Body>
                                </Accordion.Collapse>
                                <Accordion.Toggle as={Card.Header}
                                                  eventKey={filter.id}>
                                    <h3>{filter.name}</h3>
                                </Accordion.Toggle>

                            </Card>

                        })
                    }

                </Accordion>
            </div>
        </div>
    );
};

export default Filter
