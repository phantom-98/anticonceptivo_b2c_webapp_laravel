import React, {Fragment, useEffect, useState, useContext} from 'react';
import List from "../../private/Account/sections/Subscriptions/List";
import {AuthContext} from "../../../context/AuthProvider";
import * as Services from "../../../Services";

const Subscriptions = ({setView, subscription, setSubscription}) => {

    const {auth} = useContext(AuthContext);

    const [subscriptions, setSubscriptions] = useState([]);

    const [view, setViewAd] = useState('list');
    const [formMode, setFormMode] = useState('create');
    const [subscriptionSelected, setSubscriptionSelected] = useState(null);

    useEffect(() => {
        if (auth) {
            getData();
        }
    }, [auth])

    const getData = () => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.GET;
        let data = {
            customer_id: auth.id
        }

        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    setSubscriptions(response.data.subscriptions);
                }
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    const goBack = () => {
        setViewAd('list')
        setSubscriptionSelected(null)
    }

    const showEdit = (subscription) => {
        setViewAd('form')
        setFormMode('edit')
        setSubscriptionSelected(subscription)
    }

    const showCreate = () => {
        setViewAd('form')
        setFormMode('create')
        setSubscriptionSelected(null)
    }
    return (
        <Fragment>
            <div className="panel panel-cart mb-3">
                <div className="panel-body">

                    <h3 className="font-poppins font-16 bold color-033F5D">
                        Confirma tu dirección de despacho o agrega una nueva
                    </h3>

                    {
                        view === 'list' ? 
                            <List 
                                subscriptions={auth ? subscriptions : subscription} 
                                showEdit={showEdit} 
                                showCreate={showCreate}
                                getData={getData}
                                setSubscription={setSubscription}
                            /> 
                        : null
                    }


                </div>
            </div>


            <div className="row">
                <div className="col-md-6">
                    <button onClick={() => setView('user-form')} className="link" style={{textDecoration: 'none'}}>
                        <span className="font-12">{"< Volver a paso anterior"}</span>
                    </button>
                </div>
                {/*<div className="col-md-6">*/}
                {/*    <button className="btn btn-bicolor btn-block" onClick={() => setViewAd('user-form')}>*/}
                {/*        <span className="font-14 px-5">CONTINUAR</span>*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </Fragment>
    );
};

export default Subscriptions
