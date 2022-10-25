import React, {useContext, useEffect} from 'react';
import {Form} from "react-bootstrap";
import { AppContext } from "../../../../../context/AppProvider";
import { BREAKPOINTS } from "../../../../../helpers/vars";
import iconRemove from "../../../../../assets/images/icons/remove-mini-cart.svg";
import Icon from "../../../../../components/general/Icon";
import * as Services from "../../../../../Services";
import Swal from "sweetalert2";
import {AuthContext} from "../../../../../context/AuthProvider";
const ListItem = ({
    address,
    showEdit,
    saveDefaultAddress,
    regions,
    communes, setAddresses,
    addressChecked,
    isSusbscription = false,
    name = 'default_address'
}) => {
    const {auth} = useContext(AuthContext)
    const { breakpoint } = useContext(AppContext);

    let region = regions.find(x => x.id === address.region_id)
    let commune = communes.find(x => x.id === address.commune_id)

    const removeData = (addresId) => {
        let url = Services.ENDPOINT.CUSTOMER.ADDRESSES.REMOVE;

        let data = {
            customer_id: auth.id,
            address_id: addresId
        }

        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'col-6 btn btn-bicolor btn-block',
                title: 'mt-4'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: '<span style="color: #0869A6;">¿Está seguro de eliminar esta dirección?</span>',
            confirmButtonText: 'Confirmar',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Services.DoPost(url,data).then(response => {
                    Services.Response({
                        response: response,
                        success: () => {
                            setAddresses(response.data.addresses);
                            toastr.success(response.message);
                        },
                        error: () => {
                            toastr.error(response.message);
                        }
                    });
                }).catch(error => {
                    Services.ErrorCatch(error)
                });
            }
        })


    }

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
                        <>

                            <div className="col-auto d-flex">
                                <div className="mt-4">
                                    <span onClick={() => showEdit(address)}
                                          className="link pointer font-12 regular">Editar
                                    </span>
                                </div>
                            </div>
                            <div className="col-auto d-flex">
                                <div className="mt-4">
                                    <span onClick={() => removeData(address.id)} className="my-auto pointer" >
                                        <div><Icon path={iconRemove} /></div>
                                    </span>

                                </div>
                            </div>
                        </>

                    :
                        null
                :
                    <div className="col-md-12 text-right">
                        {
                            !isSusbscription ?
                                <>
                                    <div className="mb-auto ">
                                        <span onClick={() => showEdit(address)}
                                              className="link pointer font-12 regular">editar</span>

                                            <span onClick={() => removeData(address.id)} className="my-auto pointer" >
                                            <div><Icon path={iconRemove} /></div>
                                        </span>
                                    </div>
                                </>

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
