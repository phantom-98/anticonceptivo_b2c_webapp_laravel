import React from 'react';
import {Form} from "react-bootstrap";
// import {AuthContext} from "../../../../../context/AuthProvider";
// import * as Services from "../../../../../Services";
// import iconTrash from '../../../../../assets/images/icons/trash.svg';
// import Icon from "../../../../../components/general/Icon";
// import toastr from "toastr";

const ListItem = ({address, showEdit, saveDefaultAddress, regions, communes, addressChecked, isSusbscription = false
    // setAddresses
}) => {

    // const {auth} = useContext(AuthContext);

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
            <div className="col-auto d-flex pr-0 pb-3">
                <div className="my-auto">
                    <Form.Check
                        custom
                        inline
                        label=""
                        type="radio"
                        name="default_address"
                        checked={(addressChecked ?? address.default_address) == 1 ? true : false}
                        className="mr-1"
                        onClick={() => saveDefaultAddress(address.id, address.customer_id)}
                        id={`custom-inline-radio-address-${address.id}`}
                    />
                </div>
            </div>
            <div className="col pl-0 pb-3">
                <div className="row">
                    <div className="col-12">
                        <span className="font-poppins font-10 regular color-8E8E8E">
                            {address.first_name} {address.last_name}
                        </span>
                    </div>
                    <div className="col-12">
                        <div className="font-poppins font-14 lh-18 regular color-484848">
                            {address.address}, {address.extra_info ? address.extra_info+ ', ' : ''} {commune ? commune.name : null}, {region ? region.name : null}
                        </div>
                    </div>
                </div>
            </div>
            {
                !isSusbscription ?
                    <div className="col-auto d-flex">
                        <div className="mt-auto">
                            <span onClick={() => showEdit(address)} className="link pointer font-12 regular">editar</span>
                        </div>
                    </div>
                    :
                    null
            }
            {/* <div className="col-auto d-flex">
                <div className="my-auto">
                    <span onClick={() => removeData(address.id)} className="link pointer">
                    <Icon path={iconTrash} />
                </span>
                </div>
            </div> */}


            <div className="col-md-12">
                <hr/>
            </div>
        </div>
    );
};

export default ListItem
