import React, {useContext, useState} from 'react';
import ListItemNoAuth from "./ListItem";
import ListItem from "./AddressList";
import Icon from "../../../../components/general/Icon";
import plusIcon from '../../../../assets/images/icons/plus-green.svg';
import * as Services from "../../../../Services";
import {AuthContext} from "../../../../context/AuthProvider";
import {v4 as uuidv4} from 'uuid';
import {AppContext} from "../../../../context/AppProvider";
import {BREAKPOINTS} from "../../../../helpers/vars";
import StoreRetire from './StoreRetire';

const List = ({addresses, showEdit, showCreate, getData, regions, communes, setAddress, setAddresses}) => {
    const {breakpoint} = useContext(AppContext)
    const [checked, setChecked] = useState(false)
    const {auth} = useContext(AuthContext);
   

    const saveDefaultAddress = (addressId, customerId) => {
        
        if(!customerId){
            setChecked(false)
        }
        let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.SET_DEFAULT_ADDRESS;
        let data = {
            address_id: addressId,
            customer_id: customerId ? customerId : auth?.id 
        }

        

        Services.DoPost(url, data).then(response => {
            Services.Response({
                response: response,
                success: () => {
                    if(addressId !== "5606"){
                        setChecked(false)
                    }
                    setAddress(addresses.find(x => x.id == addressId))
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
                            
                            address.name !== 'Retiro_tienda' 
                                ?   <ListItem
                                        key={index}
                                        address={address}
                                        showEdit={showEdit}
                                        saveDefaultAddress={saveDefaultAddress}
                                        regions={regions}
                                        communes={communes}
                                        setAddresses={setAddresses}
                                    />
                                : <></>
                            
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
                {
                    auth ? <StoreRetire setChecked={setChecked} checked={checked} saveDefaultAddress={saveDefaultAddress}/>
                    : addresses?.name !== 'Retiro_tienda' ? <></> :<StoreRetire setChecked={setChecked} checked={checked} saveDefaultAddress={saveDefaultAddress}/>
                   
                }
                
                
            </div>
            {
                breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                    auth ?
                        <div className="col-md-12 py-2">
                            <hr/>
                        </div>
                        :
                        null
                    :
                    null
            }
            {
                auth ?
                    <div className="col-md-12">
                        <Icon path={plusIcon}/> <span onClick={() => showCreate()}
                                                      className="link pointer font-14 bold link-address-checkout">Agregar nueva dirección</span>
                    </div>
                    : null
            }
        </div>
    );
};

export default List
