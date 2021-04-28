import React, {Fragment, useContext, useEffect, useState} from 'react';
import {formatMoney} from "../../helpers/GlobalUtils";
import {AuthContext} from "../../context/AuthProvider";
import {AuthType} from "../../Globals";

const CalculateResumen = ({totalPrice, commissions}) => {

    const {authType} = useContext(AuthContext);

    const [percentage, setPercentage] = useState(0);
    const [commission, setCommission] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {

        const _totalPrice = parseInt(totalPrice);

        if (authType === AuthType.COMPANY) {
            let _commission = parseInt(parseFloat(commissions.company) * _totalPrice)
            setPercentage(parseInt(parseFloat(commissions.company) * 100))
            setCommission(_commission)
            setTotal(_totalPrice + _commission)
        }

        if (authType === AuthType.PROFESSIONAL) {
            let _commission = parseInt(parseFloat(commissions.professional) * _totalPrice)
            setPercentage(parseInt(parseFloat(commissions.professional) * 100))
            setCommission(_commission*-1)
            setTotal(_totalPrice - _commission)
        }

    }, [totalPrice, commissions])

    return (
        <Fragment>
            <div className="row">
                <div className="col">
                    <h3 className="font-signika font-16 bold text-primary mb-1">Comisión ({percentage}%)</h3>
                </div>
                <div className="col-auto">
                    <div className="font-14 light color-3C3C3E">
                        {
                            formatMoney(commission)
                        }
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h3 className="font-signika font-16 bold text-primary mb-1">Total a Pagar</h3>
                </div>
                <div className="col-auto">
                    <div className="font-14 bold color-3C3C3E">
                        {
                            formatMoney(total)
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default CalculateResumen;
