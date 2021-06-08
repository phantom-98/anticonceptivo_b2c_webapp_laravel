import React, {useState, useEffect} from 'react';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelOne from "../../../template/BasePanelOne";
import {Accordion, Card} from "react-bootstrap";
// import {categoryFaqsDummy} from "./data";
import * as Services from "../../../Services";


const Faq = () => {

    const [categoryFaqs, setCategoryFaqs] = useState([]);

    useEffect(() => {
        getData();
    },[])

    const getData = () => {
        let url = Services.ENDPOINT.NO_AUTH.FAQS.GET_DATA;
        let data = {}
        Services.DoGet(url,data).then(response => {
            Services.Response({
              response: response,
              success: () => {
                  setCategoryFaqs(response.data.category_faqs);
              },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

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
                            <div class="row">
                                {/* {
                                    categoryFaqs.map((category) => {
                                        return (
                                            <div className="col-md-12">
                                                {category.name}
                                            </div>
                                        )
                                    })
                                } */}
                            </div>
                        </div>
                        <div className="col-md-9">
                            <h1 className="base-panel-one-title">{PUBLIC_ROUTES.FAQ.title}</h1>

                            <Accordion defaultActiveKey={categoryFaqs.length ? categoryFaqs[0].faqs[0].id : null} className="accordion-faq">
                                {
                                    categoryFaqs.map((categories) => {
                                        return (
                                            categories.faqs.map((item) => {
                                                return(
                                                    <Card key={item.id} className="card-faq" key={item.id}>
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
                                                )
                                            })
                                        )
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
