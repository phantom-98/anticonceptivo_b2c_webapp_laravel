import React from 'react';
import {Accordion, Card} from "react-bootstrap";
import H3Panel from "../../../../components/general/H3Panel";
import {CONFIG} from "../../../../Config";
import mapDelivery from '../../../../assets/images/pages/delivery/maps-devilery.svg'
import Icon from "../../../../components/general/Icon";
import boxBlue from '../../../../assets/images/icons/box-blue.svg'
import circleLight from '../../../../assets/images/icons/circle-light.svg'
import circleDark from '../../../../assets/images/icons/circle-dark.svg'
import { v4 as uuidv4 } from 'uuid';
import AccordionBody from '../../../../components/sections/AccordionBody';

const DeliveryCostsDeadlines = ({deliveryCosts}) => {
    return (
        <div className="row">

            <H3Panel title="PLAZOS Y COSTOS DE ENTREGA"/>

            <Accordion defaultActiveKey={deliveryCosts.length ? deliveryCosts[0].id : null} className="col-md-12">
            {
                deliveryCosts.map((data, index) => {
                    let deliveryCostyKey = uuidv4();
                    return(
                        <Card key={deliveryCostyKey} className="card-faq my-4">
                            <Accordion.Collapse eventKey={data.id}>
                                <Card.Body>
                                    <AccordionBody 
                                        data={data}
                                    />
                                </Card.Body>
                            </Accordion.Collapse>
                            <Accordion.Toggle as={Card.Header} eventKey={data.id}>
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
