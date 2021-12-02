import React, {useEffect} from 'react'
// import { GOOGLE_MAPS } from '../../../Globals';
// import AutoComplete from "react-google-autocomplete";
import UseGoogleAnalyticsEcommerce from '../../../components/customHooks/UseGoogleAnalyticsEcommerce';

const Test = () => {

    const { addTransaction, addItems, transaction, items } = UseGoogleAnalyticsEcommerce();

    useEffect(() => {
        addTransaction({
            id: 1,
            affiliation: 'Anticonceptivo',
            revenue: 14000,
            shipping: 3990,
            tax: 2490,
            currency: 'CLP',
        })

        let testItems = [
            {
                id: 1,
                name: 'temporal 1',
            },
            {
                id: 2,
                name: 'temporal 2',
            },
            {
                id: 3,
                name: 'temporal 3',
            },
        ];

        addItems(testItems);
    },[]);


    useEffect(() => {
        if (transaction.id && items.length) {
            console.log(transaction);
            console.log(items);
        }
    },[items])

    return (
        <div className="container" style={{marginTop: '50px', marginBottom: '50px'}}>
            <div className="row my-4 py-4">
                <div className="col-12">
                    {/* <AutoComplete
                        apiKey={GOOGLE_MAPS.API_KEY}
                        onPlaceSelected={(place) => console.log(place)}
                        options={{
                            types: ["address"],
                            componentRestrictions: { country: "cl" },
                        }}
                    /> */}
                </div>
            </div>
        </div>
  )
}

export default Test;