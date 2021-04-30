import React from 'react';
import H2Title from "../../../components/H2Title";
import {brands} from "../../../helpers/Images";
import {CONFIG} from "../../../Config";

const OurBrands = () => {
    return (
        <div className="py-5">
            <div className="container">
                <div className="row py-3">
                    <div className="col-12">
                        <H2Title text="nuestras marcas" className="text-black"/>
                    </div>
                </div>

                <div className="row py-3">
                    {
                        Object.keys(brands).map((key, index) => {

                            console.log(key, brands[key]);
                            return <div className="col d-flex">
                                <img src={brands[key].default}
                                     alt={CONFIG.APP_NAME}
                                     className="my-auto"
                                     style={{width: '100%', maxHeight: '50px', objectFit: 'contain'}}/>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default OurBrands
