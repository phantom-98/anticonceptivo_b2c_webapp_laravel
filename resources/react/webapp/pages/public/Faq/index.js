import React, {useState, useEffect} from 'react';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelOne from "../../../template/BasePanelOne";
import {Accordion, Card} from "react-bootstrap";
import * as Services from "../../../Services";
import { v4 as uuidv4 } from 'uuid';
import FaqAnswers from './FaqAnswers';
import { capitalizeFirstLetterOfEachWord } from "../../../helpers/GlobalUtils";

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
                        <div className="col-md-12">
                            <h1 className="base-panel-one-without-upper">{PUBLIC_ROUTES.FAQ.title}</h1>

                            <Accordion defaultActiveKey={'#'}>
                                {
                                    categoryFaqs.map((categories, categoryIndex) => {
                                        let categoryKey = uuidv4();
                                        return(
                                            <Card key={categoryKey} className="card-faq my-4">
                                                <Accordion.Collapse eventKey={categoryIndex.toString()}>
                                                    <Card.Body className="py-0 px-0">
                                                        <FaqAnswers faqs={categories.faqs}/>
                                                    </Card.Body>
                                                </Accordion.Collapse>
                                                <Accordion.Toggle as={Card.Header} eventKey={categoryIndex.toString()}>
                                                    <h3>{categories.name}</h3>
                                                </Accordion.Toggle>
                                            </Card>
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
