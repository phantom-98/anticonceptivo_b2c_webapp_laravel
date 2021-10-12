import React, {useContext} from 'react';
import ListItemNoAuth from "./ListItem";
import ListItem from "../../../private/Account/sections/Addresses/ListItem";
import Icon from "../../../../components/general/Icon";
import plusIcon from '../../../../assets/images/icons/plus-green.svg';
import * as Services from "../../../../Services";
import {AuthContext} from "../../../../context/AuthProvider";
import { v4 as uuidv4 } from 'uuid';

const List = ({addresses, showEdit, showCreate, getData, regions, communes, setAddress, 
    // setAddresses
}) => {

    const {auth} = useContext(AuthContext);

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
                    setAddress(addresses.find(x => x.id === addressId))
                    getData();
                },
            });
        }).catch(error => {
            Services.ErrorCatch(error)
        });
    }

    let uuid = uuidv4();

    return (
        <div className="row">
            <div className="col-md-12 py-2">
                {
                    auth ? 
                    addresses.map((address, index) => (
                        <ListItem
                            key={index} 
                            address={address} 
                            showEdit={showEdit} 
                            saveDefaultAddress={saveDefaultAddress}
                            regions={regions}
                            communes={communes}
                            // setAddresses={setAddresses}
                        />
                        ))
                    :

                    <ListItemNoAuth 
                        key={uuid} 
                        address={addresses} 
                        showEdit={showEdit} 
                        saveDefaultAddress={saveDefaultAddress}
                        regions={regions}
                        communes={communes}
                    />
                }
            </div>
            {
                auth ? 
                    <div className="col-md-12">
                        <Icon path={plusIcon} />  <span onClick={() => showCreate()} className="link pointer font-12 regular">Agregar nueva dirección</span>
                    </div>
                : null
            }
        </div>
    );
};

export default List
