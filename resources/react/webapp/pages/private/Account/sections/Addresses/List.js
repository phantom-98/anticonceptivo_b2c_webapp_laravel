import React from 'react';
import ListItem from "./ListItem";
import Icon from "../../../../../components/general/Icon";
import plusIcon from '../../../../../assets/images/icons/plus-green.svg'
import * as Services from "../../../../../Services";

const List = ({addresses, showEdit, showCreate}) => {

    const saveDefaultAddress = (addressId, customerId) => {
        let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.SET_DEFAULT_ADDRESS;
        let data = {
            address_id: addressId,
            customer_id: customerId
        }
        
        Services.DoPost(url,data).then(response => {
            Services.Response({
            response: response,
                success: () => {
                    
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
                    addresses.map((address, index) => (<ListItem key={index} address={address} showEdit={showEdit} saveDefaultAddress={saveDefaultAddress}/>))
                }
            </div>
            <div className="col-md-12">
                <Icon path={plusIcon} />  <span onClick={() => showCreate()} className="link pointer font-12 regular">Agregar nueva dirección</span>
            </div>
        </div>
    );
};

export default List
