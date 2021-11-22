import React, {useEffect} from 'react';
import {Form} from "react-bootstrap";
// import {AuthContext} from "../../../../../context/AuthProvider";
// import * as Services from "../../../../../Services";
// import iconTrash from '../../../../../assets/images/icons/trash.svg';
// import Icon from "../../../../../components/general/Icon";
// import toastr from "toastr";
import UseWindowDimensions from "../../../../../helpers/UseWindowDimensions";

const ListItem = ({
                      address,
                      showEdit,
                      saveDefaultAddress,
                      regions,
                      communes,
                      addressChecked,
                      isSusbscription = false
                  }) => {

    const {width} = UseWindowDimensions();
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
            <div className="col-auto d-flex pr-0">
                <div className="my-auto">
                    <Form.Check
                        custom
                        inline
                        label=""
                        type="radio"
                        name="default_address"
                        checked={address.default_address ? true : false}
                        className="mr-1"
                        onClick={() => saveDefaultAddress(address.id, address.customer_id)}
                        id={`custom-inline-radio-address-${address.id}`}
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
                width > 768 ?

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
                    null
            }
            {/* <div className="col-auto d-flex">
                <div className="my-auto">
                    <span onClick={() => removeData(address.id)} className="link pointer">
                    <Icon path={iconTrash} />
                </span>
                </div>
            </div> */}


            {
                width < 768 ?

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
                        <hr/>
                    </div>

                    :

                    null

            }
        </div>


    );
};

export default ListItem
