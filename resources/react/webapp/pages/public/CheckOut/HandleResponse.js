import React from 'react';
import Success from "./Payment/Success";
import Error from "./Payment/Error";

const HandleResponse = ({
    webpayProccessSuccess, 
    orderId, 
    productCount, 
    files, 
    prescriptionRadio, 
    withoutPrescriptionAnswer}) => {

    return (
        webpayProccessSuccess ?
            <Success
                orderId={orderId}
                productCount={productCount}
                files={files}
                prescriptionRadio={prescriptionRadio}
                withoutPrescriptionAnswer={withoutPrescriptionAnswer}
            />
        : 
            <Error/>
    );
};

export default HandleResponse
