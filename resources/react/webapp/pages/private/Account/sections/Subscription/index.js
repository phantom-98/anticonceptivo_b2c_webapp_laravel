import React, {Fragment, useContext, useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import H3Panel from "../../../../../components/general/H3Panel";
import RowCol from "../../../../../components/general/RowCol";
import Subscriptions from "../../../../public/CheckOut/Subscriptions";

import Table from "./Table";
// import Detail from "./Detail";

const Subscription = () => {

    const [view, setView] = useState('table');
    const [subscriptionOrderItemSelected, setSubscriptionOrderItemSelected] = useState(null);

    return (
        <>
        <div className="row">
            <H3Panel title="HISTORIAL DE SUSCRIPCIONES"/>
            <div className="col-md-12">
                {
                    view === 'table' ? <Table setSubscriptionOrderItemSelected={setSubscriptionOrderItemSelected} subscriptionOrderItemSelected={subscriptionOrderItemSelected}/> : null
                }
            </div>
        </div>
    </>

    );
};

export default Subscription
