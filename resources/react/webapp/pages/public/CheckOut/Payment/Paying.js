import React, {useEffect, useState} from 'react';
import LazyLoading from "../../../../components/LazyLoading";

const Paying = ({selectedMethod}) => {

    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        if (selectedMethod) {
            switch (selectedMethod) {
                case 'webpayPlus':
                    setName('Método Webpay Plus')
                    setMessage('Se ha inicia el proceso de pago mediante transbank Webpay Plus, por favor espere mientras se realiza la transacción.')
                    break;
                default :
                    setName('Método de pago iniciado')
                    setMessage('Por favor espere mientras se realiza la transacción')
            }
        }
    }, [selectedMethod])

    return (
        <div className="row py-4">
            <div className="col-md-12 text-center">
                <h3 className="font-signika font-25 text-primary bold">
                    {name}
                </h3>
                <p className="font-epilogue font-14 light color-3C3C3E">
                    {message}
                </p>
            </div>
            <div className="col-12">
                <LazyLoading height="200px" />
            </div>
        </div>
    );
};

export default Paying;
