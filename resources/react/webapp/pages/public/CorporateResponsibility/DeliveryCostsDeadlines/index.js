import React from 'react';
import {Accordion, Card} from "react-bootstrap";
import H3Panel from "../../../../components/general/H3Panel";
import { v4 as uuidv4 } from 'uuid';
import AccordionBody from '../../../../components/sections/AccordionBody';

const DeliveryCostsDeadlines = ({deliveryCosts}) => {
    return (
        <div className="row">

            <div className="col-12">
                <h3 className="font-poppins font-35 bold color-0A68A6 d-md-none">Plazos y costos de entrega </h3>
                <h3 className="font-poppins font-20 bold color-033F5D d-none d-md-block">Plazos y costos de entrega </h3>
            </div>
            <div className="col-12">
                <Accordion defaultActiveKey={'0'}>
                    {
                        deliveryCosts.map((data, index) => {

                            return(
                                <Card key={uuidv4()} className="card-faq card-delivery-cost" >
                                    <Accordion.Collapse eventKey={index.toString()}>
                                        <Card.Body>
                                            <AccordionBody
                                                data={data}
                                            />
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey={index.toString()} >
                                        <span className="font-16 font-poppins bold">{data.name}</span>
                                    </Accordion.Toggle>
                                </Card>
                            )
                        })
                    }

                </Accordion>
            </div>
        </div>
    );
};

export default DeliveryCostsDeadlines
