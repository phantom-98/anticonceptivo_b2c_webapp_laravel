import React from 'react';
import Success from "./Payment/Success";
import Error from "./Payment/Error";

const HandleResponse = ({webpayProccessSuccess, orderId, productCount, files}) => {

    return (
        webpayProccessSuccess ?
            <Success
                orderId={orderId}
                productCount={productCount}
                files={files}
            />
        : 
            <Error/>
    );
};

export default HandleResponse
