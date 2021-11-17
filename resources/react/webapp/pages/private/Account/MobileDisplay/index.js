import React from 'react';
import { Accordion, Card } from "react-bootstrap";

const MobileDisplay = ({ sections, sectionSelected, handleSection, processRouteMobile}) => {

    return (
        <div className="col-12">
            <Accordion defaultActiveKey={'#'}>
                {
                    Object.keys(sections).map((key, index) => {
                        return (
                            <Card key={index} className="card-faq my-4">
                                <Accordion.Collapse eventKey={index.toString()}>
                                    <Card.Body className="py-0 px-0">
                                        {
                                            processRouteMobile()
                                        }
                                    </Card.Body>
                                </Accordion.Collapse>
                                <Accordion.Toggle as={Card.Header} eventKey={index.toString()}>
                                    <h2 className="font-poppins font-21 bold">{sections[key].name}</h2>
                                </Accordion.Toggle>
                            </Card>
                        )
                    })
                }
            </Accordion>
        </div>
    )    
}

export default MobileDisplay;