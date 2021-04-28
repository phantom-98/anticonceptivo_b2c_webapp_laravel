import React, {useContext} from 'react';
import {formatMoney} from "../../../../helpers/GlobalUtils";
import {AuthType} from "../../../../Globals";
import {AuthContext} from "../../../../context/AuthProvider";
import moment from 'moment';

const Cost = ({totalHours, priceHour, total, deadline = null, setEditable = null, quotationStatus = '', flag}) => {

    const {authType} = useContext(AuthContext);

    return (

        <div className="row">
            <div className="col mb-3">
                <h3 className="font-signika font-16 bold text-primary mb-1">
                    Horas
                </h3>
                <div className="font-14 light color-3C3C3E">
                    {totalHours}
                </div>
            </div>
            <div className="col mb-3">
                <h3 className="font-signika font-16 bold text-primary mb-1">
                    Valor Hora
                </h3>
                <div className="font-14 light color-3C3C3E">
                    {formatMoney(priceHour)}
                </div>
            </div>

            <div className="col mb-3">
                <h3 className="font-signika font-16 bold text-primary mb-1">
                    Total
                </h3>
                <div className="font-14 light color-3C3C3E">
                    {formatMoney(total)}
                </div>
            </div>

            {
                deadline ? 

                <div className="col mb-3">
                    <h3 className="font-signika font-16 bold text-primary mb-1">
                        Fecha limite
                    </h3>
                    <div className="font-14 light color-3C3C3E">
                        {moment(deadline).format('DD-MM-YYYY')}
                    </div>
                </div>
                : null
            }

            {
                (authType == AuthType.PROFESSIONAL && quotationStatus == 'CREATED') && flag ?
                    <div className="col-auto mb-3">
                        <button
                            onClick={() => setEditable(true)}
                            type="button"
                            className="btn btn-form btn-primary btn-rounded px-4">
                            <span><i className="fa fa-edit"/> Editar</span>
                        </button>
                    </div>
                : null
            }
        </div>

    );
};

export default Cost;
