import React from 'react';
import {Accordion, Card, Form} from "react-bootstrap";

const Filter = () => {

    const filters = [
        {
            id: 1,
            name: 'Categorías',
            items: [
                {
                    id: 1,
                    name: 'Pastillas',
                    total: 411
                },
                {
                    id: 2,
                    name: 'Masculino',
                    total: 131
                },
                {
                    id: 3,
                    name: 'Test de Embarazo',
                    total: 56
                },
                {
                    id: 4,
                    name: 'Anticonceptivos Emergencia',
                    total: 8
                },
                {
                    id: 5,
                    name: 'Duración largo plazo',
                    total: 131
                },
                {
                    id: 6,
                    name: 'Métodos Alternativos',
                    total: 56
                },
                {
                    id: 7,
                    name: 'Salud Femenina',
                    total: 8
                }
            ]
        },
        {
            id: 2,
            name: 'Laboratorio',
            items: []
        },
        {
            id: 3,
            name: 'Precio',
            items: []
        },
        {
            id: 4,
            name: 'Bioequivalencia',
            items: []
        },
        {
            id: 5,
            name: 'Suscripción',
            items: []
        },
        {
            id: 5,
            name: 'Formato',
            items: []
        },
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
                                            filter.items.map((item) => {

                                                return <Form.Check
                                                    custom
                                                    label={<span
                                                        className="font-poppins font-12 text-black my-auto">{item.name}
                                                        <span
                                                            className="color-D8D8D8">({item.total})</span></span>}
                                                    type="checkbox"
                                                    id={`custom-inline-checkbox-${item.id}`}
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
