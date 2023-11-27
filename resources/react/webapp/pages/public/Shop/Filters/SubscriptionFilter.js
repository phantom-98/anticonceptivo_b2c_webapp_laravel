import React from 'react';
import {Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const SubscriptionFilter = ({subscriptions, filters, setFilters, filtersUpdate, setFiltersUpdate}) => {

    const handleSubscriptions = (e) => {
        // let list = [...filters.subscriptions];
        let targetId = parseInt(e.target.id.replace('subscription-',''));
        // list = [targetId];
        
        if (filters.subscriptions.includes(targetId)) {
             setFilters({
                ...filters,
                ['subscriptions']: []
            });
        }else{
             setFilters({
                ...filters,
                ['subscriptions']: [targetId]
            });
        }

        // if (list.includes(targetId)) {
        //     list = list.filter(x => x !== targetId);
        // }else{
        //     list = [...list, targetId];
        // }

        // if (!list.length) {
        //     setFilters({
        //         ...filters,
        //         ['subscriptions']: []
        //     });
        // }else{
        //     setFilters({
        //         ...filters,
        //         ['subscriptions']: list
        //     });
        // }

        let count = filtersUpdate+1;

        setFiltersUpdate(count);
    }

    return(
        subscriptions.map((subscription) => {
            let uuid = uuidv4();

            return <Form.Check
                custom
                label={<span className="font-poppins font-12 text-black my-auto">{subscription.cicles} Meses / {subscription.months} Ciclos</span>}
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
