import React, {useContext} from 'react';
import ListItem from "./ListItem";
import Icon from "../../../../../components/general/Icon";
import plusIcon from '../../../../../assets/images/icons/plus-green.svg'
import * as Services from "../../../../../Services";
import {v4 as uuidv4} from "uuid";
import { AppContext } from "../../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../../helpers/vars";
const List = ({addresses, showEdit, showCreate, getData, regions, communes, setAddresses}) => {

    const { breakpoint } = useContext(AppContext);

    const saveDefaultAddress = (addressId, customerId) => {
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
                            key={uuidv4()}
                            address={address}
                            showEdit={showEdit}
                            saveDefaultAddress={saveDefaultAddress}
                            regions={regions}
                            communes={communes}
                            setAddresses={setAddresses}
                        />))
                }
            </div>

            {
                breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                    <div className="col-md-12 py-2">
                        <hr/>
                    </div>
                :
                    null
            }

            <div className="col-md-12">
                <Icon path={plusIcon}/> <span onClick={() => showCreate()} className="link pointer font-14 bold link-address-profile">Agregar nueva dirección</span>
            </div>
        </div>
    );
};

export default List
