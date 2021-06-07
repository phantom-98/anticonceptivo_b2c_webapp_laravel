import React from 'react';
import {Form} from "react-bootstrap";

const ListItem = ({address, showEdit, saveDefaultAddress, regions, communes}) => {

    let region = regions.find(x => x.id === address.region_id)
    let commune = communes.find(x => x.id == address.commune_id)

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
                        checked={true}
                        disabled={true}
                        className="mr-1"
                        id={`custom-inline-radio-address-${address.id}`}
                    />
                </div>
            </div>
            <div className="col pl-0">
                <div className="row">
                    <div className="col-12">
                        <span className="font-poppins font-10 regular color-8E8E8E">
                            {address.first_name} {address.last_name}
                        </span>
                    </div>
                    <div className="col-12">
                        <span className="font-poppins font-16 regular color-484848">
                            {address.address}, {address.extra_info} , {commune ? commune.name : null} , {region ? region.name : null}
                        </span>
                    </div>
                </div>
            </div>
            <div className="col-auto d-flex">
                <div className="my-auto">
                    <span onClick={() => showEdit(address)} className="link pointer font-12 regular">editar</span>
                </div>
            </div>
            <div className="col-md-12">
                <hr/>
            </div>
        </div>
    );
};

export default ListItem