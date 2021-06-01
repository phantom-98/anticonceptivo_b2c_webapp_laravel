import React from 'react';
import {Form} from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

const SubscriptionFilter = ({subscriptions, subscriptionSelected, setSubscriptionSelected}) => {

    const handleLaboratorySelected = (e) => {
        let list = [...subscriptionSelected];
        let targetId = parseInt(e.target.id.replace('subscription-',''));

        if (list.includes(targetId)) {
            list = list.filter(x => x !== targetId);   
        }else{
            list = [...list, targetId];
        }

        setSubscriptionSelected(list);
    }

    return(
        subscriptions.map((subscription) => {
            let uuid = uuidv4();
            let subscriptionId = subscription.id;
            return <Form.Check
                custom
                label={<span className="font-poppins font-12 text-black my-auto">{subscription.months === 1 ? subscription.months+' mes' : subscription.months+ ' meses'}{/* <span className="color-D8D8D8">({subscription.total})</span> */}</span>}
                type="checkbox"
                name={"subscription-custom-checkbox"}
                checked={subscriptionSelected.includes(subscriptionId)}
                id={`subscription-${subscription.id}`}
                onChange={(e) => handleLaboratorySelected(e)}
                key={uuid}
            />
        })
    )
}

export default SubscriptionFilter