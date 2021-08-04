import React from 'react';
import {Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const SubscriptionFilter = ({subscriptions, filters, setFilters, filtersUpdate, setFiltersUpdate}) => {

    const handleSubscriptions = (e) => {
        let list = [...filters.subscriptions];
        let targetId = parseInt(e.target.id.replace('subscription-',''));

        if (list.includes(targetId)) {
            list = list.filter(x => x !== targetId);   
        }else{
            list = [...list, targetId];
        }

        if (!list.length) {
            setFilters({
                ...filters,
                ['subscriptions']: []
            });
        }else{
            setFilters({
                ...filters,
                ['subscriptions']: list
            });
        }
        
        let count = filtersUpdate+1;

        setFiltersUpdate(count);
    }

    return(
        subscriptions.map((subscription) => {
            let uuid = uuidv4();

            return <Form.Check
                custom
                label={<span className="font-poppins font-12 text-black my-auto">{subscription.months === 1 ? subscription.months+' mes' : subscription.months+ ' meses'}{/* <span className="color-D8D8D8">({subscription.total})</span> */}</span>}
                type="checkbox"
                name={"subscription-custom-checkbox"}
                checked={filters.subscriptions.includes(subscription.id)}
                id={`subscription-${subscription.id}`}
                onChange={(e) => handleSubscriptions(e)}
                key={uuid}
            />
        })
    )
}

export default SubscriptionFilter