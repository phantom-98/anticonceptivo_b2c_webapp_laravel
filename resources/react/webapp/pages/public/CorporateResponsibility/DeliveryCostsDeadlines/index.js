import React from 'react';
import {Accordion, Card} from "react-bootstrap";
import H3Panel from "../../../../components/general/H3Panel";
import { v4 as uuidv4 } from 'uuid';
import AccordionBody from '../../../../components/sections/AccordionBody';

const DeliveryCostsDeadlines = ({deliveryCosts}) => {
    return (
        <div className="row">

            <H3Panel title="PLAZOS Y COSTOS DE ENTREGA"/>

            <Accordion defaultActiveKey={'0'} className="col-md-12">
            {
                deliveryCosts.map((data, index) => {
                    let deliveryCostyKey = uuidv4();
                    return(
                        <Card key={deliveryCostyKey} className="card-faq my-4">
                            <Accordion.Collapse eventKey={index.toString()}>
                                <Card.Body>
                                    <AccordionBody 
                                        data={data}
                                    />
                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
                                <span className="font-16 font-poppins bold">{data.name}</span>
                            </Accordion.Toggle>
                        </Card>
                    )
                })
            }

            </Accordion>
        </div>
    );
};

export default DeliveryCostsDeadlines
