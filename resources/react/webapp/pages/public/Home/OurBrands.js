import React from 'react';
import H2Title from "../../../components/general/H2Title";
// import {brands} from "../../../helpers/Images";
import {CONFIG} from "../../../Config";
import { v4 as uuidv4 } from 'uuid';

const OurBrands = ({brands}) => {
    return (
        <div className="py-5" style={{backgroundColor:'white'}}>
            <div className="container">
                <div className="row py-3">
                    <div className="col-12">
                        <H2Title text="nuestras marcas" className="text-black"/>
                    </div>
                </div>

                <div className="row py-3">
                    {
                        brands.map((brand, index) => {
                            let brandKey = uuidv4();
                            return <div key={brandKey} className="col d-flex">
                                <a href={brand.url} target="_blank">
                                <img src={brand.public_image}
                                     alt={CONFIG.APP_NAME}
                                     className="my-auto"
                                     style={{width: '100%', maxHeight: '50px', objectFit: 'contain'}}/>
                                </a>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default OurBrands
