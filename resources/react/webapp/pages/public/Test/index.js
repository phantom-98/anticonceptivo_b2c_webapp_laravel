import React, { useEffect } from "react";
// import { GOOGLE_MAPS } from '../../../Globals';
// import AutoComplete from "react-google-autocomplete";
import useGoogleAnalyticsEcommerce from "../../../components/customHooks/useGoogleAnalyticsEcommerce";

const Test = () => {
    // const { addTransaction, addItems, transaction, items, send } = useGoogleAnalyticsEcommerce();

    // const testingButton = () => {
    //     addTransaction({
    //         'id': 400,
    //         'affiliation': 'Anticonceptivo',
    //         'revenue': 0,
    //         'shipping': 0,
    //         'tax': 0,
    //     })

    //     let order_items = [
    //         {
    //             'id': 400,
    //         }
    //     ];

    //     addItems(order_items);
    //     console.log('testing button finish operation!');
    // }

    // useEffect(() => {
    //     if (transaction.id && items.length) {
    //         console.log('useEffect after send!')
    //         send();
    //     }
    // },[items])

    return (
        <div
            className="container"
            style={{ marginTop: "50px", marginBottom: "50px" }}
        >
            <div className="row my-4 py-4">
                {/* <div className="col-4 offset-4">
                    <div className="btn btn-bicolor btn-block" style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }} onClick={() => testingButton()}>
                        Touch Me!
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default Test;
