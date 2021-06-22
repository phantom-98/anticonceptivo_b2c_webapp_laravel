import React from 'react';
import {Form} from "react-bootstrap";
import Icon from "../../../../../components/general/Icon";
import iconRemove from "../../../../../assets/images/icons/remove-mini-cart.svg";

const ListItem = ({subscription, saveDefaultSubscription,deleteSubscription}) => {




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
                    <div className="col-12">
                        <span className="font-poppins mt-4 font-16 regular color-484848">
                            {subscription.card_type} {subscription.card_number} 
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-auto text-center d-flex">
                <div onClick={() => deleteSubscription(subscription.id)} className="my-auto pointer" >
                    <div><Icon path={iconRemove}/></div>

                </div>
            </div>

            <div className="col-md-12">
                <hr/>
            </div>
        </div>
    );
};

export default ListItem
