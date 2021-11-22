import React, {Fragment, useContext, useEffect, useState} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import Table from "./Table";
import SubscriptionCardResponsive from "./SubscriptionCardResponsive";
import {AuthContext} from "../../../../../context/AuthProvider";
import UseWindowDimensions from "../../../../../helpers/UseWindowDimensions";

const Subscription = () => {

    const [view, setView] = useState('table');
    const [subscriptionOrderItemSelected, setSubscriptionOrderItemSelected] = useState(null);
    const {auth} = useContext(AuthContext);
    const {height, width} = UseWindowDimensions();

    return (
        <>
            <div className="row" style={{marginTop: width <= 980 ? '0px' : '-50px'}}>

                {
                    width >= 980 ? <H3Panel title="HISTORIAL DE SUSCRIPCIONES"/> : null
                }

                <div className="col-md-12">

                    {
                        view === 'table' ? width >= 980 ?
                            <Table setSubscriptionOrderItemSelected={setSubscriptionOrderItemSelected}
                                   subscriptionOrderItemSelected={subscriptionOrderItemSelected}/> :
                            <SubscriptionCardResponsive
                                setSubscriptionOrderItemSelected={setSubscriptionOrderItemSelected}
                                subscriptionOrderItemSelected={subscriptionOrderItemSelected}/> : null
                    }
                </div>
            </div>
        </>
    );
};

export default Subscription
