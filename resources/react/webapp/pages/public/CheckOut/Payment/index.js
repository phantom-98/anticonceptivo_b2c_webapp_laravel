import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Card} from "react-bootstrap";
import BankTransfer from "./BankTransfer";
import Webpay from "./Webpay";
import Paying from "./Paying";
import Result from "../Result";

const PaymentMethods = ({order, setOrder}) => {

    const [selectedMethod, setSelectedMethod] = useState('');
    const [paying, setPaying] = useState(false);
    const [processed, setProcessed] = useState(false);
    const [status, setStatus] = useState({
        title : '',
        message : '',
        resume : '',
        action : null
    })

    const runPayment = (method) => {
        setSelectedMethod(method)
        setPaying(true)
    }

    const finishPayment = (order, status) => {
        setOrder(order)
        setPaying(false)
        setSelectedMethod('')
        setProcessed(true)
        setStatus(status)
    }

    return (
        <Card>
            <Card.Body>

                {
                    paying ?
                        <Paying selectedMethod={selectedMethod}/>
                        :
                        !processed ?
                            <div className="row">
                                {/*<BankTransfer order={order} />*/}
                                <Webpay
                                    order={order}
                                    runPayment={runPayment}
                                    finishPayment={finishPayment}
                                />
                            </div>
                            :
                            <Result status={status} />
                }


            </Card.Body>
        </Card>
    );
};

export default PaymentMethods;
