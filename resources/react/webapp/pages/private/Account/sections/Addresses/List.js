import React from 'react';
import ListItem from "./ListItem";
import Icon from "../../../../../components/general/Icon";
import plusIcon from '../../../../../assets/images/icons/plus-green.svg'
import * as Services from "../../../../../Services";
import UseWindowDimensions from "../../../../../helpers/UseWindowDimensions";

const List = ({addresses, showEdit, showCreate, getData, regions, communes}) => {

    const {width} = UseWindowDimensions();

    const saveDefaultAddress = (addressId, customerId) => {
        // console.log(2)
        // return
        let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.SET_DEFAULT_ADDRESS;

        let data = {
            address_id: addressId,
            customer_id: customerId
        }

        Services.DoPost(url, data).then(response => {
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
            <div className="col-md-12">
                {
                    addresses.map((address, index) => (
                        <ListItem
                            key={index}
                            address={address}
                            showEdit={showEdit}
                            saveDefaultAddress={saveDefaultAddress}
                            regions={regions}
                            communes={communes}
                            // setAddresses={setAddresses}
                        />))
                }
            </div>
            {
                width > 768 ?
                    <div className="col-md-12 py-2">
                        <hr/>
                    </div>
                    :
                    null
            }

            <div className="col-md-12">
                <Icon path={plusIcon}/> <span onClick={() => showCreate()}
                                              className="link pointer font-14 bold link-address-profile">Agregar nueva dirección</span>
            </div>
        </div>
    );
};

export default List
