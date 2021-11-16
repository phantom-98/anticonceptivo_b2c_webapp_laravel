import React from 'react';
import {v4 as uuidv4} from 'uuid';
import {Link} from "react-router-dom";
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import {Accordion, Card} from "react-bootstrap";

const PillsMenuMobile = ({laboratories, subscriptions, formats, categorySlug, hideMenu}) => {

    const categoryUrl = PUBLIC_ROUTES.SHOP_FILTER.path.replace(':category?', categorySlug);

    return (
        <ul style={{listStyleType: 'none'}}>
            <li>
                <Accordion>
                    <Accordion.Toggle as={Card.Header} eventKey={1}>
                        <div className="margin-menu-bottom-deprecated">
                            <span className="item-menu-cat-second">Formato</span>
                        </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={1}>
                        <ul style={{listStyleType: 'none', marginLeft: '-20px'}}>
                            {
                                formats.map((format) => {
                                    let formatKey = uuidv4();
                                    let formatUrl = categoryUrl.replace(':type?', 'formato');
                                    formatUrl = formatUrl.replace(':filter?', format);
                                    return (
                                        <li className="my-2" key={formatKey}>
                                            <Link onClick={hideMenu} to={formatUrl} style={{textDecoration: 'none'}}>
                                                <span
                                                    className="item-menu-cat-third my-1 text-black my-auto d-block">{format} Pastillas</span>
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
                        <div className="margin-menu-bottom-deprecated">
                            <span className="item-menu-cat-second">Suscripción</span>
                        </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={2}>
                        <ul style={{listStyleType: 'none', marginLeft: '-20px'}}>
                            {
                                subscriptions.map((subscription) => {
                                    let subscriptionKey = uuidv4();
                                    let subscriptionUrl = categoryUrl.replace(':type?', 'suscripcion');
                                    subscriptionUrl = subscriptionUrl.replace(':filter?', subscription.months);
                                    return (
                                        <li className="my-2" key={subscriptionKey}>
                                            <Link onClick={hideMenu} to={subscriptionUrl}
                                                  style={{textDecoration: 'none'}}>
                                                <span
                                                    className="item-menu-cat-third my-1 text-black my-auto d-block">{subscription.months == 13 ? 12 : subscription.months} Meses / {subscription.months} Ciclos</span>
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
                        <div className="margin-menu-bottom-deprecated">
                            <span className="item-menu-cat-second">Laboratorio</span>
                        </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey={3}>
                        <ul style={{listStyleType: 'none', marginLeft: '-20px'}}>
                            {
                                laboratories.map((laboratory) => {
                                    let laboratoryKey = uuidv4();
                                    let laboratoryUrl = categoryUrl.replace(':type?', 'laboratorio');
                                    laboratoryUrl = laboratoryUrl.replace(":filter?", laboratory.name.replace(' ', '-').toLowerCase());

                                    return (
                                        <li className="my-2" key={laboratoryKey}>
                                            <Link onClick={hideMenu} to={laboratoryUrl}
                                                  style={{textDecoration: 'none', pointerEvents: 'auto'}}>
                                                <span key={laboratoryKey}
                                                      className="item-menu-cat-third my-1 text-black my-auto d-block">{laboratory.name}</span>
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
