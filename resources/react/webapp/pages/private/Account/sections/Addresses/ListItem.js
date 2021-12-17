import React, {useContext} from 'react';
import {Form} from "react-bootstrap";
import { AppContext } from "../../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../../helpers/vars";

const ListItem = ({
    address,
    showEdit,
    saveDefaultAddress,
    regions,
    communes,
    addressChecked,
    isSusbscription = false,
    name = 'default_address'
}) => {

    const { breakpoint } = useContext(AppContext);

    let region = regions.find(x => x.id === address.region_id)
    let commune = communes.find(x => x.id === address.commune_id)

    // const removeData = (addresId) => {
    //     let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.REMOVE;

    //     let data = {
    //         customer_id: auth.id,
    //         address_id: addresId
    //     }
    //     Services.DoPost(url,data).then(response => {
    //         Services.Response({
    //             response: response,
    //             success: () => {
    //                 setAddresses(response.data.addresses);
    //                 toastr.success(response.message);
    //             },
    //         });
    //     }).catch(error => {
    //         Services.ErrorCatch(error)
    //     });
    // }

    return (
        <div className="row">
            <div className="col-auto d-flex pr-0">
                <div className="my-auto">
                    <Form.Check
                        custom
                        inline
                        label=""
                        type="radio"
                        name={name}
                        checked={
                            isSusbscription ? addressChecked :
                            address.default_address ? true : false
                        }
                        className="mr-1"
                        onClick={() => saveDefaultAddress(address.id, address.customer_id)}
                        id={`custom-inline-radio-address-${address.id}-${name}`}
                    />
                </div>
            </div>
            <div className="col pl-0">
                <div className="row">
                    <div className="col-12">
                        <span className="font-poppins font-10 regular color-8E8E8E">
                            {address.name}
                        </span>
                    </div>
                    <div className="col-12">
                        <div className="font-poppins font-14 lh-18 regular color-484848">
                            {address.address}, {address.extra_info ? address.extra_info + ', ' : ''} {commune ? commune.name : null}, {region ? region.name : null}
                        </div>
                    </div>
                </div>
            </div>
            {
                breakpoint === BREAKPOINTS.MEDIUM || breakpoint === BREAKPOINTS.LARGE || breakpoint === BREAKPOINTS.EXTRA_LARGE || breakpoint === BREAKPOINTS.EXTRA_EXTRA_LARGE ?
                    !isSusbscription ?
                        <div className="col-auto d-flex">
                            <div className="mt-4">
                                <span onClick={() => showEdit(address)}
                                      className="link pointer font-12 regular">editar</span>
                            </div>
                        </div>
                    :
                        null
                :
                    <div className="col-md-12 text-right">
                        {
                            !isSusbscription ?
                                <div className="mb-auto">
                                    <span onClick={() => showEdit(address)}
                                        className="link pointer font-12 regular">editar</span>
                                </div>
                            :
                                null
                        }
                        <hr />
                    </div>
            }
        </div>


    );
};

export default ListItem
