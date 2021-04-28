import React, {Fragment, useEffect, useState} from 'react';
import Form from "./Form";
import PUBLIC_ROUTES from "../../../../routes/publicRoutes";
import * as Services from "../../../../Services";
import {Card} from "react-bootstrap";
import LazyLoading from "../../../../components/LazyLoading";
import Error from "./Error";
import Success from "./Success";


const OfflineEvaluation = ({match}) => {

    const [token, setToken] = useState('');
    const [view, setView] = useState('loading');

    useEffect(() => {
        console.log(match);
        if (match.params.token) {
            setToken(match.params.token)
            getEvaluation(match.params.token)
        }
    }, [match])


    const getEvaluation = (token) => {
        let url = Services.ENDPOINT.PANEL.COMPANY.OFFLINE_EVALUATIONS.GET_EVALUATION;
        let data = {
            token
        }
        Services.DoPost(url, data)
            .then(response => {
                Services.Response({
                    response: response,
                    success: () => {
                        setView('form')
                    },
                    error: () => {
                        setView('error')
                    }
                });
            })
            .catch(error => {
                Services.ErrorCatch(error);
            });
    };

    return (
        <Fragment>
            <div className="row justify-content-center">
                <div className="col-auto">
                    <Card style={{width: '454px', minHeight: '432px', height: '100%'}}>
                        <Card.Body>

                            {
                                view === 'loading' ? <LazyLoading height="432px"/> : null
                            }
                            {
                                view === 'form' ? <Form setView={setView} token={token}/> : null
                            }
                            {
                                view === 'error' ? <Error/> : null
                            }
                            {
                                view === 'success' ? <Success/> : null
                            }

                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Fragment>
    );
};

export default OfflineEvaluation;
