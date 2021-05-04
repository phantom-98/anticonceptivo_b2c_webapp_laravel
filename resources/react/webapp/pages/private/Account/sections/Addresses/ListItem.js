import React from 'react';
import ReactDOM from 'react-dom';
import {Form} from "react-bootstrap";

const ListItem = ({address, showEdit}) => {
    return (
        <div className="row">
            <div className="col-auto d-flex pr-0">
                <div className="my-auto">
                    <Form.Check
                        custom
                        inline
                        label=""
                        type="radio"
                        name="id_number_type"
                        className="mr-1"
                        id={`custom-inline-radio-rut`}
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
                                 {address.address}, {address.address_number} , Viña del mar, REGIÓN DE VALPARAÍSO
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
