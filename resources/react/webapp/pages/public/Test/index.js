import React from 'react'
import { GOOGLE_MAPS } from '../../../Globals';
import AutoComplete from "react-google-autocomplete";

const Test = () => {

    return (
        <div className="container" style={{marginTop: '50px', marginBottom: '50px'}}>
            <div className="row my-4 py-4">
                <div className="col-12">
                    <AutoComplete
                        apiKey={GOOGLE_MAPS.API_KEY}
                        onPlaceSelected={(place) => console.log(place)}
                        options={{
                            types: ["address"],
                            componentRestrictions: { country: "cl" },
                        }}
                    />
                </div>
            </div>
        </div>
  )
}

export default Test;