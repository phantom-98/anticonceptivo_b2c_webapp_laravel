import React, {useState} from 'react';

import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelOne from "../../../template/BasePanelOne";
import {Accordion, Card} from "react-bootstrap";
import {faqItemsDummy} from "./data";


const Faq = () => {

    const [faqItems, setFaqItems] = useState(faqItemsDummy);

    let breadcrumbs = [
        {
            url: PUBLIC_ROUTES.HOME.path,
            name: 'Inicio'
        },
        {
            url: PUBLIC_ROUTES.FAQ.path,
            name: PUBLIC_ROUTES.FAQ.title,
        },
    ];

    return (
        <div>
            <BasePanelOne
                breadcrumbs={breadcrumbs}
            >
                <div className="px-3">
                    <div className="row pb-5 mb-5">
                        <div className="col-3">

                        </div>
                        <div className="col-md-9">
                            <h1 className="base-panel-one-title">{PUBLIC_ROUTES.FAQ.title}</h1>

                            <Accordion defaultActiveKey={faqItems[0].id} className="accordion-faq">
                                {
                                    faqItems.map((item) => {
                                        return <Card key={item.id} className="card-faq" key={item.id}>
                                            <Accordion.Collapse eventKey={item.id}>
                                                <Card.Body>
                                                    <p className="font-14 regular color-3B3B3 mb-0">{item.answer}</p>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                            <Accordion.Toggle as={Card.Header}
                                                              eventKey={item.id}
                                                            >
                                                <h3>{item.question}</h3>
                                            </Accordion.Toggle>

                                        </Card>

                                    })
                                }

                            </Accordion>
                        </div>
                    </div>
                </div>
            </BasePanelOne>
        </div>
    );
};

export default Faq
