import React from 'react';
import ListItem from "./ListItem";
import Icon from "../../../../../components/general/Icon";
import plusIcon from '../../../../../assets/images/icons/plus-green.svg'
import * as Services from "../../../../../Services";

const List = ({subscriptions, showEdit, showCreate, getData, regions, communes}) => {

    const saveDefaultSubscription = (subscriptionId, customerId) => {
        let url = Services.ENDPOINT.CUSTOMER.SUBSCRIPTIONS.SET_DEFAULT_SUBSCRIPTION;
        let data = {
            subscription_id: subscriptionId,
            customer_id: customerId
        }
        
        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    getData();
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    return (
        <div className="row">
            <div className="col-md-12 py-2">
                {
                    subscriptions.map((subscription, index) => (
                    
                        <ListItem 
                            key={index} 
                            subscription={subscription} 
                            showEdit={showEdit} 
                            saveDefaultSubscription={saveDefaultSubscription}
                        />))
                }
            </div>
            <div className="col-md-12">
                <Icon path={plusIcon} />  <span onClick={() => showCreate()} className="link pointer font-12 regular">Agregar nuevo método de pago</span>
            </div>
        </div>
    );
};

export default List
