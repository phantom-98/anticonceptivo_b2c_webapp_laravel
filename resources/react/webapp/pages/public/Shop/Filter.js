import React from 'react';
import {Accordion, Card, Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const Filter = ({products, productsFilter, setProductsFilter, categories, laboratories}) => {

    const filters = [
        {
            id: 1, 
            name: 'Categorías',
            mode: 'checkbox',
            bodies: categories
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

    // const filters = [
    //     {
    //         id: 1,
    //         name: 'Categorías',
    //         items: [
    //             {
    //                 id: 10,
    //                 name: 'Pastillas',
    //                 total: 411
    //             },
    //             {
    //                 id: 11,
    //                 name: 'Masculino',
    //                 total: 131
    //             },
    //             {
    //                 id: 12,
    //                 name: 'Test de Embarazo',
    //                 total: 56
    //             },
    //             {
    //                 id: 13,
    //                 name: 'Anticonceptivos Emergencia',
    //                 total: 8
    //             },
    //             {
    //                 id: 14,
    //                 name: 'Duración largo plazo',
    //                 total: 131
    //             },
    //             {
    //                 id: 15,
    //                 name: 'Métodos Alternativos',
    //                 total: 56
    //             },
    //             {
    //                 id: 16,
    //                 name: 'Salud Femenina',
    //                 total: 8
    //             }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: 'Laboratorio',
    //         items: []
    //     },
    //     {
    //         id: 3,
    //         name: 'Precio',
    //         items: []
    //     },
    //     {
    //         id: 4,
    //         name: 'Bioequivalencia',
    //         items: []
    //     },
    //     {
    //         id: 5,
    //         name: 'Suscripción',
    //         items: []
    //     },
    //     {
    //         id: 6,
    //         name: 'Formato',
    //         items: []
    //     },
    // ]

    const handleFilter = (e) => {
        console.log('checkbox id: ',e.target.id);
        console.log('checkbox name: ',e.target.name);
        console.log('checkbox target: ',e.target.checked);

        var prods = productsFilter;

        const filter = cleanString(e.target.id);

        console.log('productos antes: ', prods);

        console.log(filter.first_param);

        switch (filter.first_param) {
            case 1:
                console.log('Filtro de categorias');
                prods = prods.filter((prod) => prod.subcategory.category_id === filter.second_param);
                break;
            case 2:
                console.log('Filtro de laboratorios');
                prods = prods.filter((prod) => prod.laboratory_id === filter.second_param);
                break;
            case 3:
                console.log('Filtro de precio');
                break;
            case 4:
                console.log('Filtro de bioequivalencia');
                break;
            case 5:
                console.log('Filtro de suscripción');
                break;
            case 6:
                console.log('Filtro de formato');
                break;
            default:
                break;
            }

        console.log('productos después: ', prods);

        setProductsFilter(prods);
    }

    function cleanString(string){
        let temp = string.replace('custom-inline-checkbox-', "");
        temp = temp.split('-');
        temp = {
            first_param: parseInt(temp[0]),
            second_param: parseInt(temp[1])
        }
        return temp;
    }

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
                                                    label={<span
                                                        className="font-poppins font-12 text-black my-auto">{body.name}
                                                        {/* <span className="color-D8D8D8">({body.total})</span> */}</span>}
                                                    type="checkbox"
                                                    name={body.name}
                                                    checked={false}
                                                    id={`custom-inline-checkbox-${filter.id}-${body.id}`}
                                                    // onClick={handleFilter}
                                                    onChange={handleFilter}
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
