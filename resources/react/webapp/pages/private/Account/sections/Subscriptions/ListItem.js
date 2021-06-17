import React from 'react';
import {Form} from "react-bootstrap";

const ListItem = ({subscription, saveDefaultSubscription}) => {
    return (
        <div className="row">
            <div className="col-auto d-flex pr-0">
                <div className="my-auto">
                    <Form.Check
                        custom
                        inline
                        label=""
                        type="radio"
                        name="default_subscription"
                        checked={subscription.default_subscription == 1 ? true : false}
                        className="mr-1"
                        onClick={() => saveDefaultSubscription(subscription.id, subscription.customer_id)}
                        id={`custom-inline-radio-subscription-${subscription.id}`}
                    />
                </div>
            </div>
            <div className="col pl-0">
                <div className="row">
                    {/* <div className="col-12">
                        <span className="font-poppins font-10 regular color-8E8E8E">
                            {subscription.first_name} {subscription.last_name}
                        </span>
                    </div> */}
                    <div className="col-12">
                        <span className="font-poppins font-16 regular color-484848">
                            {subscription.card_type} {subscription.card_number} 
                        </span>
                    </div>
                </div>
            </div>

            <div className="col-md-12">
                <hr/>
            </div>
        </div>
    );
};

export default ListItem
