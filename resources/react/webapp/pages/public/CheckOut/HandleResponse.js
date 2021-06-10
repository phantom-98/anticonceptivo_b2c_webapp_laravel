import React from 'react';
import Success from "./Payment/Success";
import Error from "./Payment/Error";

const HandleResponse = ({webpayProccessSuccess, order}) => {

    // const Dummy = {
    //     id:1,
    //     customer:{
    //         id_number:1,
    //         full_name:'Felipe Fernández',
    //         email:'ffernandez@innovaweb.cl',
    //         full_phone:'920099718',
    //         delivery_address:'Una dirección ficticia',
    //     },
    //     order_items:[
    //         {
    //             name: 'item 1',
    //             quantity: 5
    //         }
    //     ],
    //     delivery_date:'2017',
    //     document_type:'BOLETA',
    //     payment_type:'WEBPAY',
    //     shipping_type:'ENCOMIENDA?',
    // }

    return (
        webpayProccessSuccess ?
            <Success
                order={order}
            />
        : 
            <Error
                
            />
    );
};

export default HandleResponse
