import React, {useState, useEffect} from 'react';
import {Tabs, Tab, Accordion, Card} from 'react-bootstrap';
import UseWindowDimensions from "../../../helpers/UseWindowDimensions";

const ProductTabs = ({product, legalWarning, valid}) => {

    const {width} = UseWindowDimensions();

    const [key, setKey] = useState(valid ? 'benefits' : 'technical');

    return (
        <div className="row pb-0 pb-md-5 mt-3 mt-md-5">
            {
                width > 768 ?
                    <div className="col-12">
                        <Tabs
                            id="tabs"
                            variant="pills"
                            className="tabs-about-us pr-2 col-12"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}>
                            {
                                valid ?
                                    <Tab eventKey="benefits" title="Beneficios y usos">
                                        <div className="panel-bordered bg-white padding-responsive-detail">
                                            <p className="font-poppins font-14 regular">
                                                <div dangerouslySetInnerHTML={{__html: product.benefits}}/>
                                            </p>
                                        </div>
                                    </Tab>
                                    : null
                            }

                            <Tab eventKey="technical" title="Descriptor">
                                <div className="panel-bordered bg-white padding-responsive-detail">
                                    <p className="font-poppins font-14 regular">
                                        <div dangerouslySetInnerHTML={{__html: product.data_sheet}}/>
                                    </p>
                                </div>
                            </Tab>

                            <Tab eventKey="legal" title="Aviso Legal">
                                <div className="panel-bordered bg-white padding-responsive-detail">
                                    <p className="font-poppins font-14 regular">
                                        <div dangerouslySetInnerHTML={{__html: legalWarning.description}}/>
                                    </p>
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                    :
                    <div className="col-12">
                        <Accordion>
                            {valid ? 
                                <Card className="card-faq">
                                    <Accordion.Collapse eventKey={'0'}>
                                        <Card.Body className="mt-1" style={{ border : 0}}>
                                            <div className="font-14 medium color-484848"
                                                    dangerouslySetInnerHTML={{__html: product.benefits}}/>
                                        </Card.Body>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey={'0'}>
                                        <span className="font-21 font-poppins bold">Beneficios y usos</span>
                                    </Accordion.Toggle>
                                </Card>
                            : null}
        
                            <Card className="card-faq">
                                <Accordion.Collapse eventKey={'1'}>
                                    <Card.Body className="mt-1" style={{ border : 0}}>
                                        <div className="font-14 medium color-484848"
                                             dangerouslySetInnerHTML={{__html: product.data_sheet}}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                                <Accordion.Toggle as={Card.Header} eventKey={'1'}>
                                    <span className="font-21 font-poppins bold">Descriptor</span>
                                </Accordion.Toggle>
                            </Card>

                            <Card className="card-faq">
                                <Accordion.Collapse eventKey={'2'}>
                                    <Card.Body className="mt-1" style={{ border : 0}}>
                                        <div className="font-14 medium color-484848"
                                             dangerouslySetInnerHTML={{__html: legalWarning.description}}/>
                                    </Card.Body>
                                </Accordion.Collapse>
                                <Accordion.Toggle as={Card.Header} eventKey={'2'}>
                                    <span className="font-21 font-poppins bold">Aviso Legal</span>
                                </Accordion.Toggle>
                            </Card>

                        </Accordion>
                    </div>
            }

        </div>
    );
};

export default ProductTabs
