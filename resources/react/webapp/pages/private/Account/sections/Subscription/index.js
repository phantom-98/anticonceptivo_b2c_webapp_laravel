import React, {useContext, useState} from 'react';
import H3Panel from "../../../../../components/general/H3Panel";
import Table from "./Table";
import SubscriptionCardResponsive from "./SubscriptionCardResponsive";
import {AppContext} from "../../../../../context/AppProvider";
import {BREAKPOINTS} from "../../../../../helpers/vars";
const Subscription = () => {
    const {breakpoint} = useContext(AppContext);
    const [view, setView] = useState('table');
    const [subscriptionOrderItemSelected, setSubscriptionOrderItemSelected] = useState(null);
    const formMode = 'create';

    return (
        <>
            <div className="row" style={{ marginTop: breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ? '-50px' : '0px'}}>

                {
                    breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                        <H3Panel title="HISTORIAL DE SUSCRIPCIONES"/> 
                    : null
                }

                <div className="col-md-12">
                    {
                        view === 'table' ? 
                            <SubscriptionCardResponsive 
                                setSubscriptionOrderItemSelected={setSubscriptionOrderItemSelected} 
                                subscriptionOrderItemSelected={subscriptionOrderItemSelected}
                            /> 
                        : null
                    }
                </div>
            </div>
        </>
    );
};

export default Subscription
