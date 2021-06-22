import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import {CONFIG} from "../../Config";

const BannerStatic = ({banners}) => {

    return (
        <div className="container">
            <div className="row">
                {
                    banners.length ? 
                        banners.map((banner) => {
                            let bannerStaticKey = uuidv4();
                            return(
                                <div key={bannerStaticKey} className={`pb-4 ${banner.size}`}>
                                    <img src={banner.public_file} alt={CONFIG.APP_NAME} style={{ width : '100%'}}/>
                                </div>
                            )
                        })
                    : null
                }
            </div>
        </div>
    );
};

export default BannerStatic