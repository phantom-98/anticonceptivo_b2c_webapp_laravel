import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {Accordion, Card} from "react-bootstrap";

const PillsMenuMobile = ({laboratories, subscriptions, formats, categorySlug, hideMenu}) => {

    const categoryUrl =  PUBLIC_ROUTES.SHOP_FILTER.path.replace(':category?',categorySlug);

    return (
        <ul style={{listStyleType:'none'}}>
            <li>
                <Accordion>
                    <Accordion.Toggle as={Card.Header} eventKey={1}>
                        <span className="font-poppins font-14" style={{color: '#0869A6'}}>Formato</span>     
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={1}>
                        <ul style={{listStyleType:'none'}}>
                            {
                                formats.map((format) => {
                                    let formatKey = uuidv4();
                                    let formatUrl = categoryUrl.replace(':type?','formato');
                                    formatUrl = formatUrl.replace(':filter?',format);
                                    return (
                                        <li className="my-2" key={formatKey}>
                                            <Link onClick={hideMenu} to={formatUrl} style={{textDecoration: 'none'}}>
                                                <span className="font-poppins py-1 font-12 text-black my-auto d-block">{format}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>   
                    </Accordion.Collapse>
                </Accordion>
            </li>
            <li>
                <Accordion>
                    <Accordion.Toggle as={Card.Header} eventKey={2}>
                        <span className="font-poppins font-14" style={{color: '#0869A6'}}>Suscripción</span>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={2}>
                        <ul style={{listStyleType:'none'}}>
                            {
                                subscriptions.map((subscription) => {
                                    let subscriptionKey = uuidv4();
                                    let subscriptionUrl = categoryUrl.replace(':type?','suscripcion');
                                    subscriptionUrl = subscriptionUrl.replace(':filter?', subscription.months);
                                    return (
                                        <li className="my-2" key={subscriptionKey}>
                                            <Link onClick={hideMenu} to={subscriptionUrl} style={{textDecoration: 'none'}}>
                                                <span className="font-poppins py-1 font-12 text-black my-auto d-block">{subscription.months} Meses</span>
                                            </Link>
                                        </li>
                                        
                                    )
                                })
                            }
                        </ul>
                    </Accordion.Collapse>
                </Accordion>
            </li>
            <li>
                <Accordion>
                    <Accordion.Toggle as={Card.Header} eventKey={3}>
                        <span className="font-poppins font-14" style={{color: '#0869A6'}}>Laboratorio</span>
                        </Accordion.Toggle>
                    <Accordion.Collapse eventKey={3}>
                        <ul style={{listStyleType:'none'}}>
                            {
                                laboratories.map((laboratory) => {
                                    let laboratoryKey = uuidv4();
                                    let laboratoryUrl = categoryUrl.replace(':type?', 'laboratorio');
                                    laboratoryUrl = laboratoryUrl.replace(":filter?", laboratory.name.replace(' ','-').toLowerCase());

                                    return (
                                        <li className="my-2" key={laboratoryKey}>
                                            <Link hideMenu={hideMenu} to={laboratoryUrl} style={{textDecoration: 'none', pointerEvents: 'auto'}}>
                                                <span key={laboratoryKey} className="font-poppins py-1 font-12 text-black my-auto d-block">{laboratory.name}</span>
                                            </Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </Accordion.Collapse>
            </Accordion>
            </li>
        </ul>
    );
};

export default PillsMenuMobile
