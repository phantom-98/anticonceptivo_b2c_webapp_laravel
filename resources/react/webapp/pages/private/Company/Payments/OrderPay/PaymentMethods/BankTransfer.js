import React from 'react';
import toastr from 'toastr';

const BankTransfer = ({order}) => {

    const initPayment = () => {
        toastr.info('Método de pago no disponible.', 'Lo sentimos')
    }

    return (
        <div className="col-md-3">
            <div className="payment-methods" onClick={initPayment}>
                <h2 className="font-signika font-20 bold text-primary mb-4">
                    Transferencia Bancaria
                </h2>
                <img src="/themes/web/assets/images/payment/trasfer.png" rel="nofollow"/>
            </div>
        </div>
    );
};

export default BankTransfer
