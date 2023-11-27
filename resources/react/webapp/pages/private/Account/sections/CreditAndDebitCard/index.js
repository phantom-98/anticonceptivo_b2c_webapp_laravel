import React, {useContext, useEffect, useState} from 'react';

import H3Panel from "../../../../../components/general/H3Panel";
import Table from "./Table";
import { AppContext } from "../../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../../helpers/vars";
import * as Services from "../../../../../Services";
import {AuthContext} from "../../../../../context/AuthProvider";

const Receipts = () =>{

    const {breakpoint} = useContext(AppContext)
    const [subscriptions, setSubscriptions] = useState([]);
    const {auth} = useContext(AuthContext);

    useEffect(() => {
        getSubscriptionsCards();
    }, []);

    const getSubscriptionsCards = () => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.GET;
        let data = {
            customer_id: auth.id
        }

        Services.DoPost(url, data).then(response => {
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
    return (
        <div className="row" style={{ marginTop: breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? '-50px' :'0px'}}>
            {
                breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? <H3Panel title="Mis Tarjetas"/> : null
            }
            <div className="col-md-12">
                <Table subscriptions={subscriptions} getSubscriptionsCards={getSubscriptionsCards} customerId={auth.id} customerEmail={auth.email}/>
            </div>
        </div>
    );
};

export default Receipts
