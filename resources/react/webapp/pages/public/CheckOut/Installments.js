import React, {Fragment, useEffect, useState, useContext} from 'react';
import List from "../../private/Account/sections/Subscriptions/List";
import {AuthContext} from "../../../context/AuthProvider";
import * as Services from "../../../Services";
import WaitingPaymentMethod from "./Payment/WaitingPaymentMethod";
import toastr from "toastr";


const Installments = ({setInstallment}) => {

    const handleAddrTypeChange = (e) => {
        setInstallment(e.target.value)
    }

    return (
        <Fragment>
            <div className="panel panel-cart mb-3">
                <div className="panel-body">

                    <h3 className="font-poppins font-16 bold color-033F5D">
                        Selecciona la cantidad de cuotas
                    </h3>
                    <select onChange={e => handleAddrTypeChange(e)} className='form-control'>
                            <option>
                                1
                            </option>
                            <option>
                                3
                            </option>
                         </select>


                </div>
            </div>

        </Fragment>
    );
};

export default Installments
