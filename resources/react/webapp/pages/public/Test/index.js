import React, {useEffect} from 'react'
// import { GOOGLE_MAPS } from '../../../Globals';
// import AutoComplete from "react-google-autocomplete";
import useGoogleAnalyticsEcommerce from '../../../components/customHooks/useGoogleAnalyticsEcommerce';

const Test = () => {

    const { addTransaction, addItems, transaction, items, send } = useGoogleAnalyticsEcommerce();

    useEffect(() => {
        addTransaction({
            id: 100,
            affiliation: 'Anticonceptivo',
            revenue: 14000,
            shipping: 3990,
            tax: 2490,
            currency: 'CLP',
        })

        let testItems = [
            {
                id: 101,
                name: 'temporal 1',
            },
            {
                id: 201,
                name: 'temporal 2',
            },
            {
                id: 301,
                name: 'temporal 3',
            },
        ];

        addItems(testItems);
    },[]);

    useEffect(() => {
        if (transaction.id && items.length) {
            send();
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