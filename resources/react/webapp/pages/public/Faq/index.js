import React, {useState, useEffect, Fragment, useContext} from 'react';
import PUBLIC_ROUTES from "../../../routes/publicRoutes";
import BasePanelOne from "../../../template/BasePanelOne";
import {Accordion, Card} from "react-bootstrap";
import * as Services from "../../../Services";
import {v4 as uuidv4} from 'uuid';
import FaqAnswers from './FaqAnswers';
import { AppContext } from "../../../context/AppProvider";
import {BREAKPOINTS} from "../../../helpers/vars";

const Faq = () => {
    const {breakpoint} = useContext(AppContext)

    const [categoryFaqs, setCategoryFaqs] = useState([]);
    const [categorySelected, setCategorySelected] = useState(0);

    useEffect(() => {
        getData();
    }, [])

    const getData = () => {
        let url = Services.ENDPOINT.NO_AUTH.FAQS.GET_DATA;
        let data = {}
        Services.DoGet(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    setCategoryFaqs(response.data.category_faqs);
                    setCategorySelected(response.data.category_faqs[0].id);
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
                {
                    breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                        <div className="px-3">
                            <div className="row pb-5 mb-5">
                                <div className="col-md-3">
                                    <div className="row">
                                        {
                                            categoryFaqs.map((category, index) => {
                                                return (
                                                    <div className="col-12 mb-2">
                                                        {/* <a href={'#'} style={{textDecoration: 'none'}}> */}
                                                        <div
                                                            className={`menu-section ${categorySelected === category.id ? 'active' : ''}`}
                                                            onClick={() => setCategorySelected(category.id)}
                                                        >
                                                            <span className="menu-section-item">
                                                                {category.name}
                                                            </span>
                                                        </div>
                                                        {/* </a> */}
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="col-md-9">
                                    <h1 className="base-panel-one-title">{PUBLIC_ROUTES.FAQ.title}</h1>

                                    <Accordion defaultActiveKey={'#'}>
                                        {
                                            categoryFaqs.map((categories, categoryIndex) => {
                                                let categoryKey = uuidv4();
                                                return categorySelected === categories.id ?
                                                    <Fragment key={categoryKey}>
                                                        {
                                                            categories.faqs.map((item, index) => {
                                                                let questionKey = uuidv4();
                                                                return (
                                                                    <Card key={questionKey} className="card-faq my-4">
                                                                        <Accordion.Collapse
                                                                            eventKey={categoryIndex.toString() + index.toString()}>
                                                                            <Card.Body>
                                                                                <div
                                                                                    dangerouslySetInnerHTML={{__html: item.answer}}/>
                                                                            </Card.Body>
                                                                        </Accordion.Collapse>
                                                                        <Accordion.Toggle as={Card.Header}
                                                                                          eventKey={categoryIndex.toString() + index.toString()}>
                                                                            <h3>{item.question}</h3>
                                                                        </Accordion.Toggle>
                                                                    </Card>
                                                                )
                                                            })
                                                        }
                                                    </Fragment>
                                                    : null
                                            })
                                        }
                                    </Accordion>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="">
                            <div className="row pb-5 mb-5">
                                <div className="col-md-12">
                                    <h1 className="base-panel-one-without-upper" style={{
                                        fontSize: '35px',
                                        lineHeight: '37px',
                                        letterSpacing: '0'
                                    }}>{PUBLIC_ROUTES.FAQ.title}</h1>

                                    <Accordion defaultActiveKey={'#'}>
                                        {
                                            categoryFaqs.map((categories, categoryIndex) => {
                                                let categoryKey = uuidv4();
                                                return (
                                                    <Card key={categoryKey} className="card-faq my-4">
                                                        <Accordion.Collapse eventKey={categoryIndex.toString()}>
                                                            <Card.Body className="py-0 px-0">
                                                                <FaqAnswers faqs={categories.faqs}/>
                                                            </Card.Body>
                                                        </Accordion.Collapse>
                                                        <Accordion.Toggle as={Card.Header}
                                                                          eventKey={categoryIndex.toString()}>
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
                }
            </BasePanelOne>
        </div>
    );
};

export default Faq
